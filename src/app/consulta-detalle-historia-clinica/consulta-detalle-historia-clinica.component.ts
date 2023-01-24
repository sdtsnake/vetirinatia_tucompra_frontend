import {Component, Input, OnInit} from '@angular/core';
import {DetalleHistoriaClinica, Sexo} from '../types/historiaClinica';
import {ActivatedRoute, Router} from '@angular/router';
import {HistoriaClinicaService} from '../historia-clinica.service';

@Component({
  selector: 'app-consulta-detalle-historia-clinica',
  templateUrl: './consulta-detalle-historia-clinica.component.html',
  styleUrls: ['./consulta-detalle-historia-clinica.component.css']
})
export class ConsultaDetalleHistoriaClinicaComponent implements OnInit {
  @Input('detalle')
  detalle?: DetalleHistoriaClinica = null;
  Sexo = Sexo;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    if (!this.detalle) {
      this.router.navigateByUrl(`/`);
    }
  }

}
