import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignersListService {
  // URL para requisicao no banco
  private dbUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  // Funcao para buscar signatarios no banco
  getSigners(): Observable<any[]> {
    return this.http.get<any[]>(this.dbUrl + '/signers/');
  }
}
