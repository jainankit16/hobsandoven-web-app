import { Component, OnInit, Input } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { environment } from '../../../environments/environment';
import { UniquePipe } from './../../pipe/unique/unique.pipe';
import { PreloaderService } from '../../services/preloader.service';
import { DocumentApi, UsersApi } from '../../sdk';

@Component({
    selector: 'app-document-list',
    templateUrl: './document-list.component.html',
    providers: [UniquePipe]
})

export class DocumentListComponent implements OnInit {

    @Input() modelName: string;
    @Input() modelId: string;

    error: string;
    containerPath: string;
    documents: Array<any>;
    user: any;
    icon: string;
    categories = [];
    displayCategories = {};
    categoriesList: Array<any> = [];
    categoriesActiveIds = [];
    newDocumentList: any = [];
    errorMessage: any;

    constructor(
        private _documentApi: DocumentApi,
        private _alertService: AlertService,
        private _preloaderService: PreloaderService
    ) { }

    updateData(docs: any) {
        docs.forEach(d => {
            this.documents.unshift(d);
        });
        this.GroupCategory();
    }

    ngOnInit() {
        this.containerPath = environment.baseUrl + '/' + environment.apiVersion + '/Containers/';
        this.error = '';
        if (this.modelId && this.modelName) {
            this.getDocuments();
        }
    }

    getDocuments() {
        this._preloaderService.showPreloader();
        this._documentApi.find({
            where: {
                modelName: this.modelName,
                modelId: this.modelId,
                isDeleted : 0
            },
            order: 'createdAt desc',
            include: [
                { relation: 'category', scope: { fields: ['title', 'id'] } },
                { relation: 'subCategory', scope: { fields: ['title', 'id'] } }
            ]
        }).subscribe(
            results => {
                this.documents = results;
                this.errorMessage = results.length ? '' : 'No document(s) found.';
                this.GroupCategory();
                this._preloaderService.hidePreloader();
            },
            err => {
                this.errorMessage = err.message;
                this._preloaderService.hidePreloader();
            }
        );
    }

    GroupCategory() {
        this.categoriesList = [];
        this.categoriesActiveIds = [];
        this.documents.map(item => {
            if (item.category) {
                this.categoriesList.push({
                    id: item.categoryId,
                    Name: item.category.title
                });
            }

            this.categoriesActiveIds.push(item.categoryId);
        });
        this.categoriesList = new UniquePipe().transform(this.categoriesList, 'id');
    }

    docFilter(categoryId) {
        return this.documents.filter(
            data => data.categoryId && data.categoryId === categoryId
        );
    }

    deleteDocument(doc) {
        if (confirm('Are you sure to delete ' + doc.fileMeta.name)) {
            this._preloaderService.showPreloader();
            this._documentApi.deleteById(doc.id).subscribe(
                res => {
                    if (res) {
                        this._alertService.clear();
                        this._alertService.success(
                            'Document ' + doc.fileMeta.name + ' delete successfully.'
                        );
                        this.getDocuments();
                    }
                    this._preloaderService.hidePreloader();
                },
                err => {
                    this._alertService.error(err.message);
                    this._preloaderService.hidePreloader();
                }
            );
        }
    }
}
