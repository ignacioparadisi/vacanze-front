import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-grupo-nueve',
  templateUrl: './grupo-nueve.component.html',
  styleUrls: ['./grupo-nueve.component.scss']
})
export class GrupoNueveComponent implements OnInit {

  public form: FormGroup;
  closeResult: string;
  constructor(private modalService: NgbModal) { }

  open(content) {
      this.modalService.open(content).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }

  listadoEquipaje(){
    var pagina;

    pagina = document.getElementById('equipajeLista');

    if(pagina.style.display == 'none'){
    pagina.style.display = 'block';
    }
    else{
    pagina.style.display = 'none';
    }
  }

  private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
          return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          return 'by clicking on a backdrop';
      } else {
          return  `with: ${reason}`;
      }
  }

  ngOnInit() {

    this.form = new FormGroup({
        nacionalidad: new FormControl(-1, [Validators.required]),
        pasaporte: new FormControl(null, [Validators.required]),
        cedula: new FormControl(null, [Validators.required])
      })
  }



  deleteFile(){
      console.log("Registro eliminado")
  }

}
