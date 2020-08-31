import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EscolaComponent } from './components/escola/escola.component';
import { TurmaComponent } from './components/turma/turma.component';


const routes: Routes = [
  {path: 'escola', component:EscolaComponent},
  {path: 'turma', component:TurmaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
