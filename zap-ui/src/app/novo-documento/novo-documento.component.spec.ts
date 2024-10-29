import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoDocumentoComponent } from './novo-documento.component';

describe('NovoDocumentoComponent', () => {
  let component: NovoDocumentoComponent;
  let fixture: ComponentFixture<NovoDocumentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NovoDocumentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NovoDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
