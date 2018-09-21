### Toolbar component

Basic toolbar component is available to use anywhere in this application .

It is available for button and dropdown features:

* position
* align
* order
* event handling
 
## How to Use

**On Module:-**

* Since this is common feature for all three apps in  serviceo, the module is being imported in shared module.

```   

 
```

**On Template:-**

* New Toolbar Tag to be used:

```
    <app-toolbar 
    position="vertical" // optional , default horizontal
    align="text-left"  // optional
    order="desc" // optional , default asc
    (onActivate)="activateEvent($event)">
    </app-toolbar>   

    

```
**On Component:-**

`import { ToolbarComponent } from '../../../components/toolbar/toolbar.component';`

* Declare variables

```


    toolbarOptions: any = []; //required
    @ViewChild(ToolbarComponent) toolbarConfig: ToolbarComponent; //required
    @ViewChild('tabset') tabset: ElementRef; // in case of modal

    When dynamic buttons | dropdown buttons is a case then :- 
    wfStatusToobar: ReplaySubject<any> = new ReplaySubject(1); //when any ngInit data needed.



```

* Setting of toolbar options in component
```

    ngAfterViewInit() {
        this.toolbarOptions.push(
        {
        title: 'Upload', // title of toolbar
        type: 'button', // type of toolbar
        class: 'btn-sm btn-primary', // classes of toolbar , optional
        icon: 'fa-plus', // if any icon
        callback: 'open', // incase of modal or any other method for that component
        customArgs: [this.uploadContent, 'lg'], // callback method arguments
        isDisabled: this.isUploadDisabled, // if needed  , optional
        sortKey: 0, // ordering of toolbar buttons should be unique
        },
        {
        title: 'Edit Columns',
        type: 'button',
        class: 'btn-sm btn-primary',
        icon: 'fa-th',
        dtoggle: 'dropdown', // in case of dropdown 
        refTmpl: 'dropdown-menu', // class of dropdown
        sortKey: 1 //should be unique
        },
        {
        title: 'Refresh',
        type: 'button',
        class: 'btn-sm btn-primary',
        icon: 'fa-refresh',
        callback: 'refreshView',
        sortKey: 2 //should be unique
        }
    );
    this.toolbarConfig.setToolbar(this.toolbarOptions);



```

* activate  toolbar event in component  (should be used in every component to load their method)
```

    activateEvent(arg) {
        const callbackArgs = this.toolbarConfig.bindEvent(this.toolbarOptions, arg);
        if (callbackArgs && callbackArgs.length > 0) {
        this[callbackArgs[0]].apply(this, (callbackArgs[1]) ? callbackArgs[1] : null);
        }
    }

```

* Add Multiple toolbar option 

```

    this.toolbarConfig.add([{
    title: 'New Toolbar',
    type: 'button',
    class: 'btn-sm btn-warning',
    icon: 'fa-refresh',
    callback: 'refreshView',
    sortKey: 1 //should be unique
    },
    {
    title: 'Toolbar',
    type: 'button',
    class: 'btn-sm btn-warning',
    icon: 'fa-refresh',
    callback: 'refreshView',
    sortKey: 2 //should be unique
    }]);

```

* Add Single toolbar option

```
    this.toolbarConfig.add({
    title: 'Toolbar',
    type: 'button',
    class: 'btn-sm btn-warning',
    icon: 'fa-refresh',
    callback: 'refreshView',
    sortKey: 0
    });

```

* Remove toolbar option by passing sortKey value
* sortKey should be unique

```
    this.toolbarConfig.remove([{ sortKey: 1}, { sortKey: 2 }]);
    this.toolbarConfig.remove({ sortKey: 1}); //single 

```

* update toolbar Attribute  option by passing sortKey value
* sortKey should be unique

```
    this.toolbarConfig.updateAttribute(0,'isDisabled',true);
    this.toolbarConfig.updateAttribute(0,'title','New Title');


```

* update toolbar Attributes  option by passing sortKey value
* sortKey should be unique

```
    this.toolbarConfig.updateAttributes(
        [
            { 'sortKey': 2, 'name': 'isDisabled', 'value': true },
            { 'sortKey': 0, 'name': 'isDisabled', 'value': true }
        ]
    );



#### Licensing
MIT License