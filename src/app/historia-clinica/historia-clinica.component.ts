import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/operators';
import {HistoriaClinicaService} from '../historia-clinica.service';

@Component({
  selector: 'app-historia-clinica',
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.css']
})
export class HistoriaClinicaComponent implements OnInit {
  detalleHistoriasClinicas = this.servicio.consultarDestalleHistoriaClinica().pipe(map(r => r.data));
  idHistoriaClinica?: string = null;
  idMacota?: string = null;
  error?: string = null;

  constructor(
    private route: ActivatedRoute,
    private servicio: HistoriaClinicaService,
  ) {
  }


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {

      this.abrirDetalleHistoriaClinica(params.idhistoria, params.idmascota);

      // tslint:disable-next-line:no-console
      console.info(params);
    });
  }

  // @ts-ignore
  abrirDetalleHistoriaClinica(idhistoria?: string, idmascota?: string): string {
    this.idHistoriaClinica = idhistoria;
    this.idMacota = idmascota;
    // tslint:disable-next-line:triple-equals
    if (this.idHistoriaClinica == null || this.idHistoriaClinica.trim() == '') {
      this.error = 'Id de historia con valor no correcto';
    }
    // tslint:disable-next-line:triple-equals
    if (this.idMacota == null || this.idMacota.trim() == '') {
      this.error = 'Id de mascota con valor no correcto';
    }
  }

  getDetalleHistoriasClinicas(): void {
    this.detalleHistoriasClinicas = this.servicio.consultarDestalleHistoriaClinica().pipe(map(r => r.data));
  }

}
