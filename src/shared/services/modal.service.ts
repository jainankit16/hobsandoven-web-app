import { Injectable } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class ModalService {
    private modalRef: NgbModalRef;
    closeModal: string;

    constructor(private modalService: NgbModal) { }

    // Modal
    open(content, size = null) {
        this.modalRef = this.modalService.open(content, { size: size, backdrop: 'static', keyboard: false });
        this.modalRef.result.then((result) => {
            this.closeModal = `Closed with: ${result}`;
        }, (reason) => {
            this.closeModal = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }
    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

    closed() {
        this.modalRef.close();
    }

    onTabClicked(event) {
        // alert(event);
        // this.event.nativeElement.click()
    }

}
