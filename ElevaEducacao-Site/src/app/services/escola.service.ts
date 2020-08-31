import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Escola } from '../models/escola';

@Injectable({
  providedIn: 'root'
})
export class EscolaService {

  url = 'http://localhost:5000/api/escola'; 

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  // Obtem todos as escolas
  getEscolas(): Observable<Escola[]> {
    return this.httpClient.get<Escola[]>(this.url + '/escolas')
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // Obtem um escola pelo id
  getEscolaById(id: number): Observable<Escola> {
    return this.httpClient.get<Escola>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // salva uma escola
  saveEscola(escola: Escola): Observable<Escola> {
    return this.httpClient.post<Escola>(this.url, JSON.stringify(escola), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  // utualiza uma escola
  updateEscola(escola: Escola): Observable<Escola> {
    // return this.httpClient.put<Escola>(this.url + '/' + escola.idEscola, JSON.stringify(escola), this.httpOptions)
    return this.httpClient.put<Escola>(this.url, JSON.stringify(escola), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  // deleta uma escola
  deleteEscola(escola: Escola) {
    return this.httpClient.delete<Escola>(this.url + '/' + escola.idEscola, this.httpOptions)
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
