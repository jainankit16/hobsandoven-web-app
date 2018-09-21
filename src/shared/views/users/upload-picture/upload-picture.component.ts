import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { UsersApi } from '../../../sdk/services/custom/Users';
import { AlertService } from '../../../services/alert.service';
import { ModalService } from '../../../services/modal.service';
import { environment } from '../../../../environments/environment';
import { PreloaderService } from '../../../services/preloader.service';

@Component({
  selector: 'app-profile-picture',
  templateUrl: './upload-picture.component.html'
})
export class UploadPictureComponent implements OnInit {
  // event emmitted to user-left-panel component
  @Output('pictureUploaded') pictureUploaded = new EventEmitter<any>();
  error: string;
  imagePreview: any;
  files: UploadFile[];
  // input events, we use this to emit data to ngx-uploader
  uploadInput: EventEmitter<UploadInput>;
  dragOver: boolean;
  options: UploaderOptions;

  constructor(
    private _alertService: AlertService,
    private _modalService: ModalService,
    private _usersApi: UsersApi,
    private _preloaderService: PreloaderService
  ) {
    this.files = [];
    this.uploadInput = new EventEmitter<UploadInput>();
    this.options = {
      concurrency: 1,
      maxUploads: 1
    }
  }

  ngOnInit() {
    this.error = '';
    const imgpath = environment.baseUrl + '/' + environment.apiVersion;
    this._usersApi.getCurrent().subscribe(data => {
      this.imagePreview = data.profileImage
        ? imgpath + '/Containers/' + data.id + '/download/' + data.profileImage
        : '';
    });
  }

  onUploadOutput(output: UploadOutput): void {
    // add file to array
    if (output.type === 'addedToQueue' && typeof output.file !== 'undefined') {
      this.error = '';
      this.files = [];
      if (output.file.type.split('/')[0] === 'image') {
        this.previewImage(output.file.nativeFile).then(response => {
          this.imagePreview = response; // The image preview
          this.files[0] = output.file;
        });
      } else {
        this.error = 'Selected file format not allowed';
      }
    } else if (output.type === 'rejected' && typeof output.file !== 'undefined') {
      console.log(output.file.name + ' rejected');
    }
    // upload file
    if (output.type === 'done' && output.file.response) {
      const msg = output.file.response;
      const progress = this.files[0].progress.data.percentage;
      if (!msg.error && msg.status.success && progress === 100) {
        // close modal after successfully upload
        setTimeout(() => {
          // need to emit data to auto-update user-left page
          this.pictureUploaded.emit(msg.status.success.usr);
          this._modalService.closed();
          this._alertService.success(msg.status.success.message);
        }, 1000);
      } else {
        this.error = msg.error.message;
      }
      this._preloaderService.hidePreloader();
    }
  }

  // to prview uploaded image
  previewImage(file: any) {
    const fileReader = new FileReader();
    return new Promise(resolve => {
      fileReader.readAsDataURL(file);
      fileReader.onload = function (e: any) {
        resolve(e.target.result);
      };
    });
  }

  // on file upload
  startUpload(): void {
    this._preloaderService.showPreloader();
    const event: UploadInput = {
      type: 'uploadFile',
      file: this.files[0],
      url:
        environment.baseUrl +
        '/' +
        environment.apiVersion +
        '/Users/upload?access_token=' +
        this._usersApi.getCurrentToken().id,
      method: 'POST'
    };

    this.uploadInput.emit(event);
  }

  // close modal on click because let-c and let-d cant be use inot child component of modal
  closeModal() {
    this._modalService.closed();
  }
}
