import { Component, OnInit } from '@angular/core';
import { DocListService } from '../services/company.service';
import { SignersListService } from '../services/signers.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalhes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalhes.component.html',
  styleUrl: './detalhes.component.scss',
})
export class DetalhesComponent implements OnInit {
  // Criando arrays vazios para receberem dados do banco
  documentos: any[] = [];
  signers: any[] = [];

  // Criando variavel para receber ID do registro passado pela URL
  documentoID: any | null;

  constructor(
    private DocListServiceIndex: DocListService,
    private SignersListServiceIndex: SignersListService,
    private RouteIndex: ActivatedRoute
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
      });

      this.SignersListServiceIndex.getSigners().subscribe((data) => {
        this.signers = data.filter((signer) => signer.documentID === index);
      });
    }
  }
}
