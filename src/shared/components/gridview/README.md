### Grid Component

Basic grid component is available to use anywhere in this application to view all nested page into one page with layered.

The main approche of this component to see page like griv view (to remove modal).

For more reference please check Accounts and PriceBook module.
 
## How to Use

**On Template:-**

* Put  (click)="showPanel({level : 1 ,module:'account',sfdcId :row.sfdcId,title: 'Account: '+value})" class="scrollToRight"
* and <app-gridview *ngIf="gridOptions" [params]="gridOptions" (onClicked)="handleClass($event)"></app-gridview>
* as below
* level :  1, 2, 3, etc 
* module: name of module where it is used.
* sfdcId: sfdcId to get detail of grid page
* title : complete title of page with module name , on detail page only {{title}} is being used. 

```

<div [className]="(gridOptions.mainClass) ? 'grid-container' : ''">
            <div [className]="gridOptions.mainClass ? gridOptions.mainClass : 'col-md-12'">
                <ngx-datatable>
                <a (click)="showPanel({level : 1 ,module:'account',sfdcId :row.sfdcId,title: 'Account: '+value})"
                                        class="scrollToRight">
                                        your content
                                    </a>
                </ngx-datatable>   
            </div>
            <app-gridview *ngIf="gridOptions" [params]="gridOptions" (onClicked)="handleClass($event)"></app-gridview>
</div>

    

```
**On Component:-**

* Declare variables

```
    /*gridview effects using css*/
    gridOptions = {mainClass:''};
    /**
     * 
     * @param options 
     */
    showPanel(options) {
        this.gridOptions = options;
    }

    /**
     * 
     * @param options 
     */
    handleClass(event) {
        this.gridOptions = event;
        this.refreshView();
    }



```

* Loading new component on gridview.component


**On GridView Template:-**
* Place component as :
* Compnent with conditions like below

```

<app-account-detail *ngIf="grid.module =='account' && grid.level== 1" [modelId]="grid.sfdcId"></app-account-detail>


```
**On GridView module:-**
* Import new component into gridView Module




#### Licensing
MIT License