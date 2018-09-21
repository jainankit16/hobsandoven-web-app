import {
    Component, Input, OnInit, ViewChild, ElementRef, Output, EventEmitter
} from '@angular/core';
import { CommonService } from '../../services/common.service';
import { OrderBy } from '../../../shared/pipe/order/orderby.pipe';
import { BehaviorSubject ,  Observable } from 'rxjs';
import { AlertService } from '../../services/alert.service';
@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html'
})
export class ToolbarComponent implements OnInit {
    @Input() order = 'asc';
    @Input() position: string;
    @Input() align: string;
    @ViewChild('toolBarContainer') toolBarContainer: ElementRef;
    @Output('onActivate') activateEvent = new EventEmitter<any>();
    htmlContent: any;
    toolbarConfig: any = [];
    private toolBarOptions: BehaviorSubject<any> = new BehaviorSubject<any>([]);
    sortKeyUniqueMsg = 'Sort key attribute should be unique in the Toolbar.';
    newsortKeyUniqueMsg = 'Toolbar element already exist for given sort key attribute.';

    constructor(
        private _elRef: ElementRef,
        private _commonService: CommonService,
        private _alertService: AlertService,
    ) {
    }

    getToolbar(): Observable<any> {
        return this.toolBarOptions.asObservable();
    }

    setToolbar(config: any) {
        this.toolBarOptions.next(config);
    }

    ngOnInit() {
        this.getToolbar().subscribe(toolbarOptions => {
            this.htmlContent = '';
            const isDuplicateKeys = this.findDuplicates(toolbarOptions);
            if (!isDuplicateKeys) {
                const sorting = (this.order.toLowerCase() === 'desc') ? '-sortKey' : 'sortKey';
                this.toolbarConfig = new OrderBy().transform(toolbarOptions, [sorting]);
                if (this.toolbarConfig && this.toolbarConfig.length > 0) {
                    this.htmlContent += '<div class="' + ((this.position === 'vertical') ?
                        'btn-group-vertical ' : '') + ((this.align) ? this.align : '') + '">';
                    this.toolbarConfig.forEach((toolbarOption) => {
                        if (toolbarOption.type === 'button') {
                            const t = (toolbarOption.refTmpl) ? toolbarOption.refTmpl : '';
                            this.htmlContent += '<button class="btn ' + toolbarOption.class + '"';
                            // this.htmlContent += ((toolbarOption.dtoggle) ? ' data-toggle="' + toolbarOption.dtoggle + '"' : '');
                            this.htmlContent += ((t) ? ' data-showdrop="' + t + '"' : '');
                            this.htmlContent += ((toolbarOption.isDisabled) ? ' disabled' : '');
                            this.htmlContent += ((toolbarOption.callback) ? ' (click)=' + toolbarOption.callback : '') + '>';
                            this.htmlContent += ((toolbarOption.icon) ? '<i class="fa ' + toolbarOption.icon + '"></i> ' : '');
                            this.htmlContent += toolbarOption.title + '</button>&nbsp;';
                        }
                        if (toolbarOption.type === 'text') {
                            // this.htmlContent += '</div>';
                            this.htmlContent += '<div class="float-right form-material"><input class="btn ' + toolbarOption.class + '"';
                            this.htmlContent += ((toolbarOption.placeholder) ? ' placeholder="' + toolbarOption.placeholder + '"' : '');
                            this.htmlContent += ((toolbarOption.title) ? ' [formControl]=' + toolbarOption.title : '') + '>';
                            this.htmlContent += '</div>';
                        }
                    });
                    this.htmlContent += '</div>';
                }

                this.toolBarContainer.nativeElement.innerHTML = this.htmlContent;
                this.bindListner();
            } else {
                console.error(this.sortKeyUniqueMsg);
                this._alertService.error(this.sortKeyUniqueMsg);
            }

        });

    }

    bindListner() {
        const that = this;
        this.toolBarContainer.nativeElement.querySelectorAll('button').forEach(function (item) {
            item.addEventListener('click', a => {
                // console.log(a.target.dataset.showdrop);
                // console.log(a.target);
                if (a.target.dataset.showdrop) {
                    const showDrop = this._elRef.nativeElement.nextElementSibling.querySelectorAll('div.' + a.target.dataset.showdrop)[0];
                    if (showDrop.classList && showDrop.classList.value.match(/show/g)) {
                        showDrop.classList.remove('show');
                    } else {
                        showDrop.classList.add('show');
                    }
                }
                that.activateEvent.emit(a.target.innerText)
            });
        }.bind(this))
    }

    /**
     *
     * @param addOptions
     * this option will add option on run time
     */
    add(addOptions) {
        if (addOptions.length > 0) {
            addOptions.forEach(element => {
                this.toolbarConfig.push(element);
            });
        } else {
            this.toolbarConfig.push(addOptions);
        }

        const isDuplicateKeys = this.findDuplicates(addOptions);
        if (!isDuplicateKeys) {
            this.setToolbar(this.toolbarConfig);
        } else {
            console.error(this.newsortKeyUniqueMsg);
            this._alertService.error(this.newsortKeyUniqueMsg);
        }

    }

    /**
     *
     * @param removeKeys
     * this option will remove option on run time
     */
    remove(removeKeys) {
        if (removeKeys.length > 0) {
            const isDuplicateKeys = this.findDuplicates(removeKeys);
            if (!isDuplicateKeys) {
                removeKeys.filter(index => {
                    this.deleteToolbar(index.sortKey);
                });
            } else {
                console.error(this.sortKeyUniqueMsg);
                this._alertService.error(this.sortKeyUniqueMsg);
            }
        } else {
            this.deleteToolbar(removeKeys.sortKey);
        }
    }
    /**
     *
     * @param toolbarOptions
     * @param arg
     */
    bindEvent(toolbarOptions, arg) {
        const bindArg = [];
        if (toolbarOptions.length > 0) {
            toolbarOptions.forEach(item => {
                if (item.title === arg.trim() && item.callback) {
                    bindArg.push(item.callback, item.customArgs);
                }
            });
            return bindArg;
        }

    }

    /**
     *
     * @param data
     * to handle duplicate sortkeys
     */
    findDuplicates(_data) {
        let data = _data;
        if (Object.keys(_data)) {
            data = Object.keys(_data).map(function (key) { return _data[key]; });
        }

        let seen = new Set();
        return data.some(function (currentObject) {
            return seen.size === seen.add(currentObject.sortKey).size;
        });
    }
    /**
     * 
     * @param indexKyes
     */
    deleteToolbar(indexKyes = '') {
        if (this.toolbarConfig[indexKyes] !== undefined) {
            delete this.toolbarConfig[indexKyes];
            this.setToolbar(this.toolbarConfig);
        } else {
            this._alertService.clear();
            const message = 'Given Sort key does not match with any Toolbar item.';
            console.error(message);
            this._alertService.error(message);
        }
    }

    /**
     *
     * @param removeKeys
     * this option will update option key on run time
     */
    updateAttribute(key, attribute, value) {
        if (key) {
            this.toolbarConfig.filter(toolbar => {
                if (key == toolbar.sortKey) {
                    toolbar[attribute] = value;
                }
            });
        }
        this.setToolbar(this.toolbarConfig);
    }

    /**
     *
     * @param objArray
     * this option will update option key on run time
     */
    updateAttributes(objArray) {
        if (objArray && objArray.length) {
            objArray.forEach((element) => {
                this.toolbarConfig.filter(toolbar => {
                    if (element.sortKey == toolbar.sortKey) {
                        toolbar[element.name] = element.value;
                    }
                });
                this.setToolbar(this.toolbarConfig);
            });
        }
    }
}

