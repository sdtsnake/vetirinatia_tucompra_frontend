import {Component, OnInit} from '@angular/core';
import {HistoriaClinicaService} from '../historia-clinica.service';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-crear-historia-clinica',
  templateUrl: './crear-historia-clinica.component.html',
  styleUrls: ['./crear-historia-clinica.component.css']
})
export class CrearHistoriaClinicaComponent implements OnInit {
  idMascota: number | null = null;
  error?: string;
  mascotasSinHistoriaClinica = this.servicio.mascotasSinHistoriaClinica().pipe(map(r => r.data));

  constructor(
    private servicio: HistoriaClinicaService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  cerrarCreacionModal(): void {
    this.router.navigateByUrl(`/`);
    this.error = null;
  }

  crearHistoriaClinica(): void {
    const respuesta = this.servicio.crearHistoriaCLinica(this.idMascota);
    respuesta.toPromise().then(
      r => {
        this.idMascota = null;
        this.router.navigateByUrl(`/`);
      },
      re => {
        this.error = re.error?.error;
        alert(this.error);
        window.location.reload();
      }
    );
  }

  cambiarMascota(idMascota: string): void {
    // tslint:disable-next-line:radix
    this.idMascota = parseInt(idMascota);
    console.log('mascota selecionada ', idMascota);

  }
}
