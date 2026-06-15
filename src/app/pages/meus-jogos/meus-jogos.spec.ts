import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeusJogos } from './meus-jogos';

describe('MeusJogos', () => {
  let component: MeusJogos;
  let fixture: ComponentFixture<MeusJogos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeusJogos],
    }).compileComponents();

    fixture = TestBed.createComponent(MeusJogos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
