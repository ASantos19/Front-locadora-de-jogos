import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagamentoDialog } from './pagamento-dialog';

describe('PagamentoDialog', () => {
  let component: PagamentoDialog;
  let fixture: ComponentFixture<PagamentoDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagamentoDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(PagamentoDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
