import {
    Component, Input, OnInit, ElementRef, Output, EventEmitter
} from '@angular/core';
@Component({
    selector: 'app-gridview',
    templateUrl: './gridview.component.html',
    styleUrls: ['./gridview.component.css']
})
export class GridviewComponent implements OnInit {
    errorMessage = '';
    options: any;
    @Output() onClicked = new EventEmitter();
    @Input()
    get params() {
        return this.options;
    }
    set params(value) {
        this.options = value;
        // this.errorMessage += (value.gLevel === undefined) ? 'Serviceo gLevel is required' : '';
        // this.errorMessage += (value.gModule === undefined) ? '\n Serviceo gModule is required' : '';
        // console.error(this.errorMessage);
        this.setAttributes(this.options)
    }
    /*gridview effects using css*/
    grdOptions = [];

    constructor(
        private _elRef: ElementRef
    ) {
    }


    ngOnInit() {
        // this.setAttributes(this.options)
    }

    /**
     * 
     * @param options 
     */
    callParentPanel(options) {
        this.setAttributes(options)
    }
    /**
     * 
     * @param options 
     * ,gClass:{min:'col-md-6',max:'col-md-8',default:'col-md-10'}
     */
    setAttributes(options) {
        if (options) {
            if (options.gLevel) {
                let grdItem = 'grid-item ';
                let defaultClass = ' col-md-12';
                if (options.gClass === undefined) {
                    options.gClass = { class: grdItem + defaultClass };
                } else {
                    options.gClass['class'] = grdItem + (options.gClass['default'] ? options.gClass['default'] : defaultClass);
                }
                let scrollClass = (options.gScroll !== undefined && !options.gScroll) ? '' : ' grid-scroll-v';
                options.gClass['class'] += scrollClass;
                Object.assign(options, {
                    gMinimize: false,
                    gMTitle: 'Minimize',
                    gIconClass: 'fa fa-window-minimize'
                });
                /*to replace same level with new options */
                if (this.grdOptions.length) {
                    for (let i = 0; i < this.grdOptions.length; i++) {
                        if (this.grdOptions[i].gLevel >= options.gLevel) {
                            this.grdOptions.splice(i);
                        }
                    }
                }
                this.grdOptions.push(options);
                /*to minimize previous tab */
                const grdLength = this.grdOptions.length - 1;
                if (grdLength > 0) {
                    for (let i = 0; i < grdLength; i++) {
                        if (this.grdOptions[i].gClass['min']) {
                            this.grdOptions[i].gClass['class'] = 'grid-item ' + this.grdOptions[i].gClass['min'];
                        } else {
                            this.grdOptions[i].gClass['class'] = 'grid-item col-md-6';
                        }
                        this.grdOptions[i].gClass['class'] += (this.grdOptions[i].gScroll !== undefined && !this.grdOptions[i].gScroll) ? '' : ' grid-scroll-v';

                        this.grdOptions[i]['gMinimize'] = true;
                        this.grdOptions[i]['gMTitle'] = 'Maximize';
                        this.grdOptions[i]['gIconClass'] = 'fa fa-window-maximize';
                    }
                }
                this.onClicked.emit({ mainClass: 'grid-item ' + ((options.gClass['min']) ? options.gClass['min'] : 'col-md-6') + scrollClass });
            }
        }

    }

    /**
    * 
    * @param rowElement | used to min/maximize panel
    */
    controlGridPanel(rowElement) {
        this.grdOptions.forEach((grdOption) => {
            if (grdOption.gLevel == rowElement.gLevel) {
                grdOption.gClass.class = 'grid-item ';
                if (rowElement.gMinimize) {
                    grdOption.gClass.class += (rowElement.gClass && rowElement.gClass['max']) ? rowElement.gClass['max'] : 'col-md-12';
                } else {
                    if (!rowElement.gMinimize) {
                        grdOption.gClass.class += (rowElement.gClass && rowElement.gClass['min']) ? rowElement.gClass['min'] : 'col-md-6';
                    }
                }
                grdOption.gClass.class += (rowElement.gScroll !== undefined && !rowElement.gScroll) ? '' : ' grid-scroll-v';

                Object.assign(grdOption, {
                    gMinimize: rowElement.gMinimize ? false : true,
                    gMTitle: rowElement.gMinimize ? 'Minimize' : 'Maximize',
                    gIconClass: rowElement.gMinimize ? 'fa fa-window-minimize' : 'fa fa-window-maximize'
                });
            }
            return grdOption;

        });

    }

    /**
     * @param rowElement | close Panel
     */
    closeGridPanel(rowElement) {
        if (rowElement.gLevel) {
            this.grdOptions.filter((grdOption) => {
                if (grdOption.gLevel >= rowElement.gLevel) {
                    grdOption['gLevel'] = false;
                    grdOption['gModule'] = false;
                }
                if (grdOption.gLevel == (rowElement.gLevel - 1)) {
                    grdOption = this._modifyRest(grdOption);
                    console.log('to make previous grid full screen');
                }
                return grdOption;
            });

            const filtered = this.grdOptions.filter(obj => {
                if (obj.gLevel) {
                    return obj;
                }
            });

            //emit parent Class to make panel full length
            if (filtered.length === 0) {
                this.onClicked.emit({ mainClass: false });
            }

        }
    }

    /**
    * @param rowElement | reset to default Panel
    */
    restoreGridPanel(rowElement) {
        this.grdOptions.filter((grdOption) => {
            if (grdOption.gLevel === rowElement.gLevel) {
                grdOption = this._modifyRest(grdOption);
            }
            return grdOption;
        });
    }

    /**
     * 
     * @param grdOption 
     */
    _modifyRest(grdOption) {
        let gMaxClass = ((grdOption.gClass && grdOption.gClass.default) ? grdOption.gClass.default : 'col-md-12');
        grdOption.gClass.class = 'grid-item ' + gMaxClass;
        grdOption.gClass.class += (grdOption.gScroll !== undefined && !grdOption.gScroll) ? '' : ' grid-scroll-v';
        grdOption.gMinimize = false;
        grdOption.gMTitle = 'Minimize';
        grdOption.gIconClass = 'fa fa-window-minimize';
        return grdOption;
    }


}

