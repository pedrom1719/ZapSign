import { Component, OnInit } from '@angular/core';
import { DocListService } from '../services/company.service';
import { SignersListService } from '../services/signers.service';
import { RouterOutlet } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-index-documentos',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NgFor],
  templateUrl: './index-documentos.component.html',
  styleUrl: './index-documentos.component.scss',
})
export class IndexDocumentosComponent implements OnInit {
  // Criando arrays vazios para receberem dados do banco
  documentos: any[] = [];
  signers: any[] = [];

  constructor(
    private DocListServiceIndex: DocListService,
    private SignersListServiceIndex: SignersListService
  ) {}

  // Executando funcao de buscar documentos e signatarios, assim que o componente é renderizado
  ngOnInit(): void {
    this.DocListServiceIndex.getDocuments().subscribe((data) => {
      this.documentos = data;
    });

    this.SignersListServiceIndex.getSigners().subscribe((data) => {
      this.signers = data;
    });
  }

  // Funcao para deletar documento com base no ID recebido no parametro
  deleteDoc(docId: string | number) {
    this.DocListServiceIndex.deleteDocuments(docId).subscribe({
      next: () => {
        this.documentos = this.documentos.filter((doc) => doc.id !== docId);
      },
    });
  }
}
