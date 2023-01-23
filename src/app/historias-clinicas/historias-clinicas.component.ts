import {Component, OnInit} from '@angular/core';
import {Observable, } from 'rxjs';
import {map} from 'rxjs/operators';
import {HistoriaClinica} from '../types/historiaClinica';
import {HistoriaClinicaService} from '../historia-clinica.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-historias-clinicas',
  templateUrl: './historias-clinicas.component.html',
  styleUrls: ['./historias-clinicas.component.css']
})
export class HistoriasClinicasComponent implements OnInit {

  historiasClinicas = this.servicio.cosnultarHistoriasClinicas().pipe(map(r => r.data));

  mascotasSinHistoriaClinica = this.servicio.mascotasSinHistoriaClinica().pipe(map(r => r.data));

  abrirModalCreacion = false;
  abrirModalBorrado = false;
  idMascota: number | null = null;

  idHistoriaClinica: number | null = null;

  error?: string;

  constructor(
    private servicio: HistoriaClinicaService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    // this.historiasClinicas=this.servicio.cosnultarHistoriasClinicas();
  }

  getHistoriasClinicas(): void {
    this.historiasClinicas = this.servicio.cosnultarHistoriasClinicas().pipe(map(r => r.data));
  }

  changeMascota(idMascota: string): void {
    this.idMascota = parseInt(idMascota);
    console.log('mascota selecionada ', idMascota);

  }

  crearHistoriaClinica(): void {
    const respuesta = this.servicio.crearHistoriaCLinica(this.idMascota);
    respuesta.toPromise().then(
      r => {
        this.getHistoriasClinicas();
        this.cerrarModal();
        this.idMascota = null;
      },
      re => {
        this.error = re.error?.error;

        console.warn(re);

      }
    );

  }
  borrarHitoriaClinica(): void {
    const respuesta = this.servicio.borrarHistoriaClinica(this.idHistoriaClinica);
    respuesta.toPromise().then(
      r => {
        this.getHistoriasClinicas();
        this.cerrarModalBorrado();
      },
      re => {
        this.error = re.error?.error;
        console.warn(re);
      }
    );
  }

  cerrarModal(): void {
    this.abrirModalCreacion = false;
    this.error = null;

  }
  cerrarModalBorrado(): void {
    this.abrirModalBorrado = false;
    this.idHistoriaClinica = null;
    this.error = null;
  }

  decideBorrarHistoriaClinica(id: number): void {
    this.idHistoriaClinica = id;
    this.abrirModalBorrado = true;
  }

  aperturaHistoria(): void {
    this.abrirModalCreacion = true;
  }

  aperturaHistoriaClinica(id: number): void {
    // from /view1?page=1 to/view2?page=1
    console.info(id);
    this.router.navigateByUrl(`/historia?id=${id}`);
  }

}
