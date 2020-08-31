import { Component, OnInit, TemplateRef } from '@angular/core';
import { EscolaService } from '../../services/escola.service';
import { Escola } from '../../models/escola';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './escola.component.html',
  styleUrls: ['./escola.component.css']
})
export class EscolaComponent implements OnInit {

  escola = {} as Escola;
  escolas: Escola[];

  constructor(private escolaService: EscolaService) {}
  
  ngOnInit() {
    this.getEscolas();
  }

  // define se uma escola será criada ou atualizada
  saveEscola(form: NgForm) {

    console.log("entrou");

    if (this.escola.idEscola !== undefined) {
      this.escolaService.updateEscola(this.escola).subscribe(() => {
        this.getEscolas();
    form.resetForm();
    this.escola = {} as Escola;
      });
    } else {
      this.escolaService.saveEscola(this.escola).subscribe(() => {
        this.getEscolas();
    form.resetForm();
    this.escola = {} as Escola;
      });
    }


  }

  // Chama o serviço para obter todas escolas
  getEscolas() {
    this.escolaService.getEscolas().subscribe((escolas: Escola[]) => {
      this.escolas = escolas;
    });
  }

  // deleta uma escola
  deleteEscola(escola: Escola) {
    this.escolaService.deleteEscola(escola).subscribe(() => {
      this.getEscolas();
    });
  }

  // copia a escola para ser editada
  editEscola(escola: Escola) {
    this.escola = { ...escola };
  }

  // limpa o formulario
  cleanForm(form: NgForm) {
    this.getEscolas();
    form.resetForm();
    this.escola = {} as Escola;
  }
 

}