import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexDocumentosComponent } from './index-documentos.component';

describe('IndexDocumentosComponent', () => {
  let component: IndexDocumentosComponent;
  let fixture: ComponentFixture<IndexDocumentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexDocumentosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexDocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
