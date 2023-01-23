import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaDetalleHistoriaClinicaComponent } from './consulta-detalle-historia-clinica.component';

describe('ConsultaDetalleHistoriaClinicaComponent', () => {
  let component: ConsultaDetalleHistoriaClinicaComponent;
  let fixture: ComponentFixture<ConsultaDetalleHistoriaClinicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaDetalleHistoriaClinicaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaDetalleHistoriaClinicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
