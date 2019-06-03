import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { LayoutComponent } from '../../layout/layout.component';
import { LocalStorageService } from '../../services/local-storage.service';


@Component({
    selector: 'app-grupo-uno',
    templateUrl: './grupo-uno.component.html',
    styleUrls: ['./grupo-uno.component.scss']
})
export class GrupoUnoComponent implements OnInit {

    closeResult: string;
    constructor(private modalService: NgbModal, private father: LayoutComponent, private local: LocalStorageService) { }
    StatusLanding = false;
    flag = 0;
    open(content) {
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
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
    ngOnInit() {
        this.local.removeItem('id');
        this.local.removeItem('Email');
        this.local.removeItem('rol');

        if (this.father.StatusHeader && this.father.StatusSideBar) {
            this.father.StatusHeader = false;
            this.father.StatusSideBar = false;
        } else if (!this.father.StatusSideBar && this.father.StatusHeader) {
            this.father.StatusHeader = false;
        } else if (this.father.StatusSideBar && !this.father.StatusHeader) {
            this.father.StatusHeader = false;
        }

    }
    deleteFile() {

    }

}
