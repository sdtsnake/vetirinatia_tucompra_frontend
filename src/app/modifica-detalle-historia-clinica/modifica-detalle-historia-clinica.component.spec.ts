import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaDetalleHistoriaClinicaComponent } from './modifica-detalle-historia-clinica.component';

describe('ModificaDetalleHistoriaClinicaComponent', () => {
  let component: ModificaDetalleHistoriaClinicaComponent;
  let fixture: ComponentFixture<ModificaDetalleHistoriaClinicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificaDetalleHistoriaClinicaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificaDetalleHistoriaClinicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
