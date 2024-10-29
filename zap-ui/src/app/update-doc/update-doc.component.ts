import { Component, OnInit, inject } from '@angular/core';
import { DocListService } from '../services/company.service';
import { SignersListService } from '../services/signers.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-update-doc',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './update-doc.component.html',
  styleUrl: './update-doc.component.scss',
})
export class UpdateDocComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);

  // Criando arrays vazios para receberem dados do banco
  documentos: any[] = [];
  signers: any[] = [];

  // Criando variavel para receber ID do registro passado pela URL
  documentoID: any | null;

  // Criando variavel para guardar alteracao/valor do status
  statusDoc: string | undefined | null = null;

  // Criando variavel do novo objeto com informacoes do body para requisicao
  dbUpdateDoc: any | null = null;

  constructor(
    private DocListServiceIndex: DocListService,
    private SignersListServiceIndex: SignersListService,
    private RouteIndex: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // Buscando ID do registro e armazenando na variavel 'documentoID'
    this.RouteIndex.paramMap.subscribe((params) => {
      this.documentoID = params.get('id');

      // Chamando funcao para buscar detalhes do registro baseado no ID
      this.getDetalhes(this.documentoID);
    });
  }

  // Funcao para buscar informacoes do registros de documentos e signaarios no banco +
  // Filtrar registros pelo ID e armazenando novo array na variavel respectiva
  getDetalhes(id: any | null) {
    if (id) {
      const index = parseInt(id, 10);

      this.DocListServiceIndex.getDocuments().subscribe((data) => {
        this.documentos = data.filter((documento) => documento.id === index);
        this.statusDoc = data[0].status;
      });

      this.SignersListServiceIndex.getSigners().subscribe((data) => {
        this.signers = data.filter((signer) => signer.documentID === index);
      });
    }
  }

  // Funcao que recebe status como parametro e alterna entre dois valores
  changeStatus(status: string) {
    this.statusDoc === 'pending'
      ? (this.statusDoc = 'signed')
      : (this.statusDoc = 'pending');
  }

  // Funcao da atualizar registro no banco de dados, recebendo parametros do Input e do Get
  updateDoc(id: number, name: string, status: any) {
    // Atualizando objeto com informacoes para o body
    this.dbUpdateDoc = {
      openID: this.documentos[0].openID,
      token: this.documentos[0].token,
      name: name,
      status: status,
      externalID: this.documentos[0].externalID,
      companyID: this.documentos[0].companyID,
    };

    // Requisicao HTTP com metodo PUT no 'update-doc' passando ID do registro a ser alterado
    this.http
      .put(`http://127.0.0.1:8000/update-doc/${id}/`, this.dbUpdateDoc, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .subscribe({
        next: (response) => {
          console.log('Documento alterado com sucesso:', response);

          // Mensagem de Sucesso + Redirecionamento para index
          alert('Documento alterado com sucesso!');
          this.router.navigate(['']);
        },
        error: (err) => {
          console.error('Erro ao cadastrar documento:', err);
        },
      });
  }
}
