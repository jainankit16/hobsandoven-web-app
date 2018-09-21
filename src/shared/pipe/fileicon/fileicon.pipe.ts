import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'fileicon'
})
export class FileiconPipe implements PipeTransform {
    transform(fileMeta: any, fixedIcon: any): any {
        if (this.isImage(fileMeta)) {
            return 'mdi mdi-camera';
        } else if (fixedIcon) {
            return 'fa fa-download';
        } else {
            return this.getFileIcon(fileMeta.name);
        }
    }

    /**
    * return true if file is of image type
    */
    isImage(file: File): boolean {
        return /^image\//.test(file.type);
    }

    /**
     * return file icon based on file name
     */
    getFileIcon(filename): string {
        let icon = 'mdi mdi-file'; // default Icon;
        const ext = /^.+\.([^.]+)$/.exec(filename);
        const fileExt = ext == null ? ' ' : ext[1];
        if (fileExt === 'pdf') {
            icon = 'mdi mdi-file-pdf';
        } else if (fileExt === 'xlsx' || fileExt === 'xls' || fileExt === 'csv') {
            icon = 'mdi mdi-file-excel';
        } else if (fileExt === 'sql' || fileExt === 'txt' || fileExt === 'doc' || fileExt === 'docx' || fileExt === 'text') {
            icon = 'mdi mdi-file-document';
        } else if (fileExt === 'download') {
            icon = 'mdi mdi-download ';
        }
        return icon;
    }

}
