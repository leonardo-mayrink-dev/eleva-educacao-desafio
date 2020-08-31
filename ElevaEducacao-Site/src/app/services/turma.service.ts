import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Turma } from '../models/turma';

@Injectable({
  providedIn: 'root'
})
export class TurmaService {

  url = 'http://localhost:5000/api/turma';

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  // Obtem todas as turmas
  getTurmas(): Observable<Turma[]> {
    return this.httpClient.get<Turma[]>(this.url + '/turmas')
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // Obtem uma turma pelo Id
  getTurmaById(id: number): Observable<Turma> {
    return this.httpClient.get<Turma>(this.url + '/' + id)
      .pipe(
        catchError(this.handleError)
      )
  }

  // salva uma turma
  saveTurma(turma: Turma): Observable<Turma> {
    return this.httpClient.post<Turma>(this.url, JSON.stringify(turma), this.httpOptions)
      .pipe(        
        catchError(this.handleError)
      )
  }

  // utualiza uma turma
  updateTurma(turma: Turma): Observable<Turma> {
    return this.httpClient.put<Turma>(this.url, JSON.stringify(turma), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  // deleta uma turma
  deleteTurma(turma: Turma) {
    return this.httpClient.delete<Turma>(this.url + '/' + turma.idTurma, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}

