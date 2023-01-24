import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HistoriaClinicaService} from '../historia-clinica.service';
import {DetalleHistoriaClinica, HistoriaClinica, Sexo} from '../types/historiaClinica';


@Component({
  selector: 'app-historia-clinica',
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.css']
})
export class HistoriaClinicaComponent implements OnInit {
  detalleHistoriasClinicas?: DetalleHistoriaClinica[] = null;
  historiaClinica?: HistoriaClinica = null;
  idHistoriaClinica?: string = null;
  idDetalleHistoriaClinica?: number = null;
  error?: string = null;
  Sexo = Sexo;
  indices = new Map();
  abrirModalBorrado = false;

  muestraDetalleAdcional: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private servicio: HistoriaClinicaService,
    private router: Router,
  ) {
  }


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {

      this.abrirDetalleHistoriaClinica(params.idhistoria);
      this.getHistoriaClinica();
      this.actulizaDetalleHistoria();

      // tslint:disable-next-line:no-console
      console.info(params);
    });
  }

  // @ts-ignore
  abrirDetalleHistoriaClinica(idHistoriaClinica?: string): string {
    this.idHistoriaClinica = idHistoriaClinica;
    // tslint:disable-next-line:triple-equals
    if (this.idHistoriaClinica == null || this.idHistoriaClinica.trim() == '') {
      this.error = 'Id de historia con valor no correcto';
    }
  }

  getHistoriaClinica(): void {
    const respuesta = this.servicio.consultaHistoriaClinica(this.idHistoriaClinica);
    respuesta.toPromise().then(
      r => {
        this.historiaClinica = r.data;
      },
      re => {
        this.error = re.error?.error;
        console.warn(re);
      }
    );
  }

  actulizaDetalleHistoria() {
    const respuesta = this.servicio.consultarDestalleHistoriaClinica(this.idHistoriaClinica);
    respuesta.toPromise().then(
      r => {
        this.detalleHistoriasClinicas = r.data;
        // tslint:disable-next-line:no-console
        console.info(this.detalleHistoriasClinicas);
      },
      re => {
        this.error = re.error?.error;
      }
    );
  }

  muestraDetalle(id: number) {
    if (this.muestraDetalleAdcional) {
      this.muestraDetalleAdcional = false;
      this.indices.set(id, false);
      console.info(this.indices.get(id));

    } else {
      this.muestraDetalleAdcional = true;
      this.indices.set(id, true);
      console.info(this.indices.get(id));
    }
  }

  grabaDetalle() {
    this.router.navigateByUrl(`/detalle?idhistoria=` + this.idHistoriaClinica);
  }
  borraDetalle(id: number) {
    this.idDetalleHistoriaClinica = id;
    this.abrirModalBorrado = true;
  }
  borrarHitoriaClinica(){
    const respuesta = this.servicio.borrarDetalleHistoriaClinica(this.idDetalleHistoriaClinica);
    respuesta.toPromise().then(
      r => {
        this.getHistoriaClinica();
        this.cerrarModalBorrado();
      },
      re => {
        this.error = re.error?.error;
        console.warn(re);
      }
    );
  }

  regresarHistora(){
    this.router.navigateByUrl(`/`);
  }

  cerrarModalBorrado(): void {
    this.abrirModalBorrado = false;
    this.idDetalleHistoriaClinica = null;
    this.error = null;
  }


}
