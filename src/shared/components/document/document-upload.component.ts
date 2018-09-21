import {
    Component,
    OnInit,
    EventEmitter,
    Input,
    Output,
    ViewChild
} from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { AlertService } from '../../services/alert.service';
import { ModalService } from '../../services/modal.service';
import { CommonService } from '../../services/common.service';
import {
    Document,
    DocumentApi,
    DocumentCategoryApi,
    UsersApi,
    DocumentTitleApi
} from '../../sdk';
import { environment } from '../../../environments/environment';

interface FormData {
    concurrency: number;
    autoUpload: boolean;
    verbose: boolean;
}

@Component({
    selector: 'app-document-upload',
    templateUrl: './document-upload.component.html'
})
export class DocumentUploadComponent implements OnInit {
    @Input() modelName: string;
    @Input() modelId: string;
    @ViewChild('myInputFile') myInputFile: any;
    ngForm: FormGroup;

    @Output() uploaded = new EventEmitter<any>();
    @Output() onModalClose = new EventEmitter<any>();

    MAX_FILE_SIZE = 10485760;  // MAX size to be allowed for upload

    error: string;
    imgpath: string;
    sub: any;
    sfdcId: any;
    documentCategories: any;
    departments: any;
    token: any;
    isSubCategoryDisabled = true;
    isCategoryDisabled = true;
    /// file setting
    formData: FormData;
    files: UploadFile[];
    uploadInput: EventEmitter<UploadInput>;
    humanizeBytes: Function;
    dragOver: boolean;
    options: UploaderOptions;
    /// end of file setting
    /// for validation bindings
    document = {
        description: '',
        categoryId: '',
        files: '',
        parentId: '',
        department: ''
    };
    /// to disable close buttons
    isClose = true;
    titles: any;
    isValid = false;
    isUploadStarted = false;
    returnObj: Array<any>;
    noteMsg: any;
    errorMsgs = []

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private alertService: AlertService,
        private _modalService: ModalService,
        private documentCategoryApi: DocumentCategoryApi,
        private _documentApi: DocumentApi,
        private _documentTitleApi: DocumentTitleApi,
        private usersApi: UsersApi,
        private _commonService: CommonService
    ) {
        // file setting
        this.formData = {
            concurrency: 1,
            autoUpload: false,
            verbose: true
        };

        this.files = []; // local uploading files array
        this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
        this.humanizeBytes = humanizeBytes;
        this.returnObj = [];
        this.options = {
            concurrency: 1,
            maxUploads: 5,
            allowedContentTypes: ['*']
        }
        // end of file setting
        this.sub = this.route.params.subscribe(params => {
            this.sfdcId = params['id'];
        });
        this.imgpath = environment.baseUrl + '/' + environment.apiVersion;
        this.token = this.usersApi.getCurrentToken();
    }

    ngOnInit() {
        this.error = '';
        this.getDocumentCategories();
    }

    /**
     * to check allowed file types based on admin settings
     */
    setAllowedFileTypes(categoryId) {
        this.noteMsg = '';
        this.files = [];
        if (categoryId) {
            const allowedFileTypes = this.documentCategories.filter(category => {
                return category.id == categoryId;
            });
            const allowedExtensions = allowedFileTypes[0]['allowedFileTypes'] ? allowedFileTypes[0]['allowedFileTypes'].replace(/;/g, ",").split(',') : [];
            this.options.allowedContentTypes = (allowedExtensions.length) ? allowedExtensions : ['*'];
            this.noteMsg = 'Allowed File Extensions are: (' + ((allowedExtensions.length) ? allowedExtensions.join(', ') : 'All') + ')';
        }
    }

    getDocumentCategories() {
        this.isCategoryDisabled = true;
        this.documentCategories = [];
        this.documentCategoryApi
            .find({
                where: {
                    isActive: 1,
                    modelName: { inq: [this.modelName, null, '*'] }
                }
            })
            .subscribe(results => {
                this.documentCategories = results;
                this.isCategoryDisabled = false;
            });
    }

    /**
     * get Sub Categories on category selection.
     */
    getSubCategories(categoryId) {
        this.isSubCategoryDisabled = true;
        this.titles = [];
        if (categoryId !== '') {
            this._documentTitleApi
                .find({
                    where: {
                        isActive: 1,
                        documentCategoryId: categoryId
                    }
                })
                .subscribe(data => {
                    this.titles = data;
                    this.isSubCategoryDisabled = false;
                });
            this.setAllowedFileTypes(categoryId)
        }
    }

    validateFileSize(file) {
        this.error = '';
        if (file && file.size <= this.MAX_FILE_SIZE) {
            // if (this._commonService.validateExtention(file.name, this.allowedExtensions)) {
            //     this.files.push(file);
            // } else {
            //     this.error = this.noteMsg;
            // }
            file['isInvalid'] = false
        } else {
            // this.isValid = false;
            file['isInvalid'] = true
            let err = 'Error. <b>' + file.name + '</b> exceeds limit of 10 MB. FIle will not be uploaded.<br/>';
            this.errorMsgs.push(err)
        }
        this.files.push(file);
        this.error = this.errorMsgs.join('')
        this.isValid = (this.files.length >= 1 && this.files.length <= 5) ? true : false;

    }

    onUploadOutput(output: UploadOutput, model: Document): void {
       // this.isClose = false;
        if (output.type === 'allAddedToQueue') {
            // when all files added in queue
        } else if (output.type === 'addedToQueue') {
            // Validate File For Size before adding
            this.validateFileSize(output.file);
        } else if (output.type === 'uploading') {
            // update current data in files array for uploading file
            const index = this.files.findIndex(file => file.id === output.file.id);
            if (index !== -1) {
                this.files[index] = output.file;
            }
        } else if (output.type === 'removed') {
            // remove file from array when removed
            this.files = this.files.filter(
                (file: UploadFile) => file !== output.file
            );
        } else if (output.type === 'dragOver') {
            // drag over event
            this.dragOver = true;
        } else if (output.type === 'dragOut') {
            // drag out event
            this.dragOver = false;
        } else if (output.type === 'drop') {
            // on drop event
            this.dragOver = false;
            this.isValid = true;
        } else if (output.type === 'rejected' && typeof output.file !== 'undefined') {
            console.log(output.file.name + ' rejected');
            this.error = 'Error. Some of the files are not added to the list. ' +
                'Either you have uploaded more than 5 Files or some of the file types are not allowed.';
        }


        if (output.type === 'done' && output.file.response) {
            const msg = output.file.response;
            const progress = (this.files[0]) ? this.files[0].progress.data.percentage : '';
            if (!msg.error && msg.status.data.success && progress === 100) {
                // close modal after successfully upload
                this._documentApi
                    .findOne({
                        where: {
                            id: msg.status.data.docmnt
                        },
                        include: [
                            { relation: 'category', scope: { fields: ['title', 'id'] } },
                            { relation: 'subCategory', scope: { fields: ['title', 'id'] } }
                        ]
                    })
                    .subscribe(result => {
                        this.returnObj.push(result);
                    });
                setTimeout(() => {
                    // need to emit data to auto-update listing page
                    this.uploaded.emit(this.returnObj);
                    this._modalService.closed();
                    this.alertService.clear();
                    this.alertService.success(msg.status.data.success.message);
                }, 2000);
            } else {
                this.isClose = false;
                this.error = (msg.status && msg.status.data.error) ? msg.status.data.error.message : '';
            }
        }
    }

    startUpload(model): void {
        // manually start uploading concurrency: 1 // set sequential uploading of files with concurrency 1
        this.isClose = false;
        this.error = ''
        const event: UploadInput = {
            type: 'uploadAll',
            url:
                environment.baseUrl +
                '/' +
                environment.apiVersion +
                '/Documents/uploadDocument?access_token=' +
                this.token.id +
                '&modelName=' +
                this.modelName +
                '&cId=' + model.parentId,
            method: 'POST',
            data: {
                modelName: this.modelName,
                modelId: this.modelId,
                description: model.description,
                categoryId: '' + model.parentId + '',
                subCategoryId: '' + model.categoryId + ''
            }
        };
        this.uploadInput.emit(event);
    }

    /**
     * @param event file input
     * for validating file
     */
    forValidationOnly(event) {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            this.isValid = file ? true : false;
        }
    }

    cancelUpload(id: string): void {
        this.uploadInput.emit({ type: 'cancel', id: id });
    }

    removeFile(id: string): void {
        this.uploadInput.emit({ type: 'remove', id: id });
        /* re-validating when all files removed */
        if (this.files.length === 0) {
            this.resetFileInput();
        }
    }

    removeAllFiles(): void {
        this.uploadInput.emit({ type: 'removeAll' });
        this.resetFileInput();
    }

    resetFileInput() {
        this.isClose = true;
        this.isValid = false;
        this.error = ''
        this.myInputFile.nativeElement.value = '';
    }

    // close modal on click because let-c and let-d cant be use inot child component of modal
    closeModal() {
        this.onModalClose.emit('close');
        this._modalService.closed();
    }
}
