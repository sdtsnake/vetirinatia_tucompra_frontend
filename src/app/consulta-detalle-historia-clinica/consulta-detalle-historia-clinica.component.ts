import {Component, Input, OnInit} from '@angular/core';
import {DetalleHistoriaClinica, Sexo} from '../types/historiaClinica';

@Component({
  selector: 'app-consulta-detalle-historia-clinica',
  templateUrl: './consulta-detalle-historia-clinica.component.html',
  styleUrls: ['./consulta-detalle-historia-clinica.component.css']
})
export class ConsultaDetalleHistoriaClinicaComponent implements OnInit {
  @Input('detalle')
  detalle?: DetalleHistoriaClinica = null;
  Sexo = Sexo;
  constructor() { }

  ngOnInit(): void {
  }

}
