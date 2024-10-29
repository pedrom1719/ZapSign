import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DocListService {
  // URL para requisicao no banco
  private dbUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  // Funcao para buscar documentos no banco
  getDocuments(): Observable<any[]> {
    return this.http.get<any[]>(this.dbUrl + '/documents/');
  }

  // Funcao para deletar registro no banco de acordo com ID do registro clicado
  deleteDocuments(val: any): Observable<any[]> {
    return this.http.delete<any[]>(this.dbUrl + '/documents/' + val + '/');
  }
}
