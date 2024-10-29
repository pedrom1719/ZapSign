import { Routes } from '@angular/router';
import { IndexDocumentosComponent } from './index-documentos/index-documentos.component';
import { NovoDocumentoComponent } from './novo-documento/novo-documento.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { UpdateDocComponent } from './update-doc/update-doc.component';

// Definindo rotas do aplicativo e os respectivos componentes a serem renderizados
export const routeConfig: Routes = [
  {
    path: '',
    component: IndexDocumentosComponent,
    title: 'ZapSign',
  },
  {
    path: 'novo',
    component: NovoDocumentoComponent,
    title: 'ZapSign | Novo Documento',
  },
  {
    path: 'detalhes/:id',
    component: DetalhesComponent,
    title: 'ZapSign | Detalhes',
  },
  {
    path: 'alterar-doc/:id',
    component: UpdateDocComponent,
    title: 'ZapSign | Alterar',
  },
];
