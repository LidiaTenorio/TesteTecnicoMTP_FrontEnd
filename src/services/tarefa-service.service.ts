import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tarefa } from 'src/model/tarefa';

@Injectable({
  providedIn: 'root'
})
export class TarefaServiceService {
  
  constructor(private _httpClient: HttpClient) 
  { 
    
 
  }
  buscarTarefas(): Observable<any> {
    return this._httpClient
      .get<any>(`${environment.LocalHostApiBaseUrl}/Tarefa`)
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError((err: any) => {
          return throwError(() => new Error(err || 'erro na requisicao'));
        })
      );
  }

  buscarTarefasPorId(id: string): Observable<any> {
    return this._httpClient
      .get<any>(`${environment.LocalHostApiBaseUrl}/Tarefa/${id}`)
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError((err: any) => {
          return throwError(() => new Error(err || 'erro na requisicao'));
        })
      );
  }

  cadastrarTarefa(tarefa: Tarefa): Observable<any> {
    return this._httpClient
      .post<any>(`${environment.LocalHostApiBaseUrl}/Tarefa`, tarefa) 
        .pipe(
          map((response: any) => {
            return response;
          }),
          catchError((err: any) => {
            return throwError(() => new Error(err || 'erro na requisicao'));
          })
        );
  }

  deletarTarefa(id: string): Observable<any> {
    return this._httpClient
      .delete<number>(`${environment.LocalHostApiBaseUrl}/Tarefa/?id=${id}`, {})
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError((err: any) => {
          return throwError(() => new Error(err || 'erro na requisicao'));
        })
      );
  }

  concluirTarefa(id: string): Observable<any> {
    return this._httpClient
      .put<any>(`${environment.LocalHostApiBaseUrl}/Tarefa/ConcluirTarefa?id=${id}`, {})
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError((err: any) => {
          return throwError(() => new Error(err || 'erro na requisicao'));
        })
      );
  }

  AtualizarTarefa(tarefa: Tarefa): Observable<any> {
    return this._httpClient
      .put<any>(`${environment.LocalHostApiBaseUrl}/Tarefa`, tarefa)
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError((err: any) => {
          return throwError(() => new Error(err || 'erro na requisicao'));
        })
      );
  }
}
