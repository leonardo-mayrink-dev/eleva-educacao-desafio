import { Component, OnInit } from '@angular/core';
import { TurmaService } from '../../services/turma.service';
import { Turma } from '../../models/turma';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './turma.component.html',
  styleUrls: ['./turma.component.css']
})
export class TurmaComponent implements OnInit {

  turma = {} as Turma;
  turmas: Turma[];

  constructor(private turmaService: TurmaService) {}
  
  ngOnInit() {
    this.getTurmas();
  }

  // defini se uma escola será criada ou atualizada
  saveTurma(form: NgForm) {
    if (this.turma.idTurma !== undefined) {
      this.turmaService.updateTurma(this.turma).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.turmaService.saveTurma(this.turma).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  // Chama o serviço para obtém todas as turmas
  getTurmas() {
    this.turmaService.getTurmas().subscribe((turmas: Turma[]) => {
      this.turmas = turmas;
    });
  }

  // deleta uma turma
  deleteTurma(turma: Turma) {
    this.turmaService.deleteTurma(turma).subscribe(() => {
      this.getTurmas();
    });
  }

  // copia a turma para ser editada
  editTurma(turma: Turma) {
    this.turma = { ...turma };
  }

  // limpa o formulario
  cleanForm(form: NgForm) {
    this.getTurmas();
    form.resetForm();
    this.turma = {} as Turma;
  }

}