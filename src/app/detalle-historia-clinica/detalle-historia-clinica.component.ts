import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HistoriaClinicaService} from '../historia-clinica.service';
import {Colaborador, DetalleHistoriaClinica, DetalleHistoriaPostClinica, HistoriaClinica, Mascota} from '../types/historiaClinica';
import {map} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-detalle-historia-clinica',
  templateUrl: './detalle-historia-clinica.component.html',
  styleUrls: ['./detalle-historia-clinica.component.css']
})
export class DetalleHistoriaClinicaComponent implements OnInit {
  // @ts-ignore
  colaboradores = this.servicio.consultaColaboradores().pipe(map(r => r.data));
  idHistoriaClinica?: string = null;
  idColaborador?: number = null;
  error?: string = null;
  formularioGrabacion: FormGroup;
  enviando = false;


  constructor(
    private route: ActivatedRoute,
    private servicio: HistoriaClinicaService,
    private router: Router,
    private formulario: FormBuilder) {

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.abrirDetalleHistoriaClinica(params.idhistoria);
      // tslint:disable-next-line:no-console
      console.info(params);
    }),
      this.formularioGrabacion = this.formulario.group(
        {
          temperatura: ['', Validators.required],
          peso: ['', Validators.required],
          frecuenciaCardica: ['', Validators.required],
          frecuenciaRespiratoria: ['', Validators.required],
          alimentacion: ['', Validators.maxLength(255)],
          habitad: ['', Validators.maxLength(255)],
          observacion: ['', Validators.maxLength(255)],
          colaborador: ['', Validators.required]
        }
      );
  }

  abrirDetalleHistoriaClinica(idHistoriaClinica?: string) {
    this.idHistoriaClinica = idHistoriaClinica;
    // tslint:disable-next-line:triple-equals
    if (this.idHistoriaClinica == null || this.idHistoriaClinica.trim() == '') {
      this.error = 'Id de historia con valor no correcto';
      this.router.navigateByUrl(`/`);
    }
  }

  cambiarColaborador(idColaborador: string): void {
    // tslint:disable-next-line:radix
    this.idColaborador = parseInt(idColaborador);
  }

  cerrarCreacionDetalle(): void {
    this.router.navigateByUrl(`/historia?idhistoria=` + this.idHistoriaClinica);
  }

  enviar() {
    this.enviando = true;
    if (this.formularioGrabacion.invalid) {
      return;
    }

    // tslint:disable-next-line:prefer-const
    let fechaCreacion = new Date();
    // @ts-ignore
    // @ts-ignore
    const detalle: DetalleHistoriaPostClinica = {
      alimentacion: this.formularioGrabacion.get('alimentacion').value,
      fechaHora: fechaCreacion.toISOString(),
      frecuenciaCardiaca: this.formularioGrabacion.get('frecuenciaCardica').value,
      frecuenciaRespiratoria: this.formularioGrabacion.get('frecuenciaRespiratoria').value,
      habitad: this.formularioGrabacion.get('habitad').value,
      observacion: this.formularioGrabacion.get('observacion').value,
      peso: this.formularioGrabacion.get('peso').value,
      temperatura: this.formularioGrabacion.get('temperatura').value,
      idHistoriaClinica: parseInt(this.idHistoriaClinica),
      idColaborador: this.idColaborador
    };

    const respuesta = this.servicio.crearDetalleHistoriaClinica(detalle);
    respuesta.toPromise().then(
      r => {
        this.router.navigateByUrl(`/historia?idhistoria=` + this.idHistoriaClinica);
      },
      re => {
        this.error = re.error?.error;
      }
    );


    if (this.error){
      alert(this.error);
    }
  }

  get form() {
    return this.formularioGrabacion.controls;
  }

}
