import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterOutlet, Router } from '@angular/router';
import { DocumentService } from '../services/document.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-novo-documento',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './novo-documento.component.html',
  styleUrl: './novo-documento.component.scss',
})
export class NovoDocumentoComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);

  // Criando variaveis para armazenar objetos com informacoes do body das requisicoes
  docData: any | null = null;
  dbDocData: any | null = null;
  dbSignerData: any | null = null;

  constructor(
    private documentServiceIndex: DocumentService,
    private http: HttpClient
  ) {}

  // Funcao para pegar dados do formulario e criar objeto para requisicao na API ZapSign
  formSubmit(title: string, url: string, name: string, email: string): void {
    this.docData = {
      name: title,
      url_pdf: url,
      external_id: null,
      signers: [
        {
          name: name,
          email: email,
          auth_mode: 'assinaturaTela',
          send_automatic_email: true,
          send_automatic_whatsapp: false,
        },
      ],
      lang: 'pt-br',
      disable_signer_emails: true,
      observers: ['pedro.santos1719@gmail.com'],
    };

    // Chamando funcao da requisicao passando objeto como parametro
    this.createDoc(this.docData);
  }

  // Funcao da requisicao na API ZapSign
  createDoc(docData: any) {
    this.documentServiceIndex.createDocument(docData).subscribe({
      // Pegando resposta da API e criando objeto do Documento para insercao no banco de dados
      next: (data: any) => {
        this.dbDocData = {
          openID: data.open_id,
          token: data.token,
          name: data.name,
          status: data.status,
          created_at: data.created_at,
          last_update_at: data.last_update_at,
          externalID: data.external_id,
          original_file: data.original_file,
          companyID: 1,
        };

        // Requisicao POST para insercao das informacoes na tabela 'Documents'
        this.http
          .post(
            'http://127.0.0.1:8000/create-doc/',
            JSON.stringify(this.dbDocData),
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          )
          .subscribe({
            next: (response) => {
              console.log('Documento cadastrado com sucesso:', response);
            },
            error: (err) => {
              console.error('Erro ao cadastrar documento:', err);
            },
          });

        // Atribuindo valor do campo 'open_id' do documento a variavel
        const docOpenID = data.open_id;

        // Requisicao GET buscando registro na tabela 'Documents' com 'open_id' igual
        this.http
          .get(`http://127.0.0.1:8000/documents/openid/${docOpenID}`)
          .subscribe({
            next: (idResponse: any) => {
              // Ao encontrar, salva ID do registro na variavel para identificacao na tabela Signatario
              console.log('Documento encontrado:', idResponse);
              const docDbID = idResponse.id;

              // Pegando resposta da API e criando objeto do Signatario para insercao no banco de dados
              this.dbSignerData = {
                signer_token: data.signers
                  .map((signer: any) => signer.token)
                  .join(''),
                signer_status: data.signers
                  .map((signer: any) => signer.status)
                  .join(''),
                signer_name: data.signers
                  .map((signer: any) => signer.name)
                  .join(''),
                signer_email: data.signers
                  .map((signer: any) => signer.email)
                  .join(''),
                signer_id: data.signers
                  .map((signer: any) => signer.external_id)
                  .join(''),
                document_id: docDbID, // Utilizando ID do Documento para ForeignKey do Signatario
              };

              // Requisicao POST para insercao das informacoes na tabela 'Signers'
              this.http
                .post(
                  'http://127.0.0.1:8000/create-signer/',
                  JSON.stringify(this.dbSignerData),
                  {
                    headers: {
                      'Content-Type': 'application/json',
                    },
                  }
                )
                .subscribe({
                  next: (response) => {
                    console.log('Documento cadastrado com sucesso:', response);

                    // Mensagem de Sucesso + Redirecionamento para index
                    alert('Documento cadastrado com sucesso!');
                    this.router.navigate(['']);
                  },
                  error: (err) => {
                    console.error(
                      'Erro ao cadastrar documento (signatario):',
                      err
                    );
                  },
                });
            },
          });
      },
      error: (err) => {
        console.error('Erro ao criar arquivo:', err);
      },
    });
  }
}
