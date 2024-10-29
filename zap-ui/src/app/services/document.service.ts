import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  // URL para requisicao na API ZapSign (fazendo uso do proxy.conf.json)
  private apiURL = '/api/v1/docs/';

  constructor(private http: HttpClient) {}

  // Funcao para fazer a requisicao na API (recebendo body pelo parametro docData)
  // Utilizando o Token da API como validacao para requisicao

  createDocument(docData: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization:
        'Bearer 17bee078-64d0-45eb-89fb-65f06420f316e63a248c-983b-4ac6-8572-66961b4e0ee4',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });

    return this.http.post<any>(this.apiURL, docData, {
      headers: headers,
    });
  }
}
