import {Component, OnInit} from '@angular/core';
import {map} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HistoriaClinicaService} from '../historia-clinica.service';
import {Colaborador, DetalleHistoriaClinica, HistoriaClinica, Mascota} from '../types/historiaClinica';

@Component({
  selector: 'app-modifica-detalle-historia-clinica',
  templateUrl: './modifica-detalle-historia-clinica.component.html',
  styleUrls: ['./modifica-detalle-historia-clinica.component.css']
})
export class ModificaDetalleHistoriaClinicaComponent implements OnInit {
  colaboradores = this.servicio.consultaColaboradores().pipe(map(r => r.data));
  idHistoriaClinica?: string = null;
  idDetalleHistoriaClinica?: string = null;
  detalleHistoriasClinicas?: DetalleHistoriaClinica = null;
  idColaborador?: number = null;
  error?: string = null;

  colaboradornombre?: string;
  formularioGrabacion: FormGroup;
  enviando = false;

  constructor(
    private route: ActivatedRoute,
    private servicio: HistoriaClinicaService,
    private router: Router,
    private formulario: FormBuilder) {
  }

  ngOnInit(): void {
    // @ts-ignore
    // @ts-ignore
    this.route.queryParams.subscribe(params => {
      this.abrirDetalleHistoriaClinica(params.idhistoria, params.iddetalle);
      this.cargaDetalle();
      // tslint:disable-next-line:no-console
      console.info(params);
    }),
      this.colaboradornombre = this.detalleHistoriasClinicas.colaborador.apellido + this.detalleHistoriasClinicas.colaborador.nombre;

    this.formularioGrabacion = this.formulario.group(
        {
          temperatura: [this.detalleHistoriasClinicas.temperatura.toString, Validators.required],
          peso: [this.detalleHistoriasClinicas.peso.toString, Validators.required],
          frecuenciaCardica: [this.detalleHistoriasClinicas.frecuenciaCardiaca.toString, Validators.required],
          frecuenciaRespiratoria: [this.detalleHistoriasClinicas.frecuenciaRespiratoria.toString, Validators.required],
          alimentacion: [this.detalleHistoriasClinicas.alimentacion.toString, Validators.maxLength(255)],
          habitad: [this.detalleHistoriasClinicas.observacion.toString, Validators.maxLength(255)],
          observacion: [this.detalleHistoriasClinicas.observacion.toString, Validators.maxLength(255)],
          // tslint:disable-next-line:max-line-length
          colaborador: ['oscar ramos', Validators.required]
        }
      );
  }

  abrirDetalleHistoriaClinica(idHistoriaClinica?: string, iddetalle?: string) {
    this.idHistoriaClinica = idHistoriaClinica;
    this.idDetalleHistoriaClinica = iddetalle;
    // tslint:disable-next-line:triple-equals
    if (this.idHistoriaClinica == null || this.idHistoriaClinica.trim() == '') {
      this.error = 'Id de historia con valor no correcto';
      this.router.navigateByUrl(`/`);
    }
    if (this.idDetalleHistoriaClinica == null || this.idDetalleHistoriaClinica.trim() == '') {
      this.error = 'Id detalle de la historia con valor no correcto';
      this.router.navigateByUrl(`/`);
    }
  }

  cargaDetalle() {
    const respuesta = this.servicio.consultarIdDestalleHistoriaClinica(this.idDetalleHistoriaClinica).pipe();
    respuesta.toPromise().then(
      r => {
        this.detalleHistoriasClinicas = r.data;
      },
      re => {
        this.error = re.error?.error;
      }
    );
    console.log('respuesta del servicio ');
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

    const mascota: Mascota = {
      id: 0, nombre: '', raza: '', sexo: undefined, usuario: undefined

    };

    const colaborador: Colaborador = {
      apellido: '',
      cargo: '',
      documentoIdentificacion: 0,
      especialidad: '',
      id: this.formularioGrabacion.get('colaborador').value,
      nombre: '',
      tipoDocumento: ''
    };

    const historia: HistoriaClinica = {
      fechaCreacion: '', mascota,
      // tslint:disable-next-line:radix
      id: parseInt(this.idHistoriaClinica)
    };

    // tslint:disable-next-line:prefer-const
    let fechaCreacion = new Date();
    // tslint:disable-next-line:no-unused-expression
    const detalle: DetalleHistoriaClinica = {
      alimentacion: this.formularioGrabacion.get('alimentacion').value,
      colaborador,
      fechaHora: fechaCreacion.toISOString(),
      frecuenciaCardiaca: this.formularioGrabacion.get('frecuenciaCardica').value,
      frecuenciaRespiratoria: this.formularioGrabacion.get('frecuenciaRespiratoria').value,
      habitad: this.formularioGrabacion.get('habitad').value,
      historiaClinica: historia,
      id: -1,
      observacion: this.formularioGrabacion.get('observacion').value,
      peso: this.formularioGrabacion.get('peso').value,
      temperatura: this.formularioGrabacion.get('temperatura').value
    };

    const respuesta = this.servicio.actualizaDetalleHistoriaClinica(detalle);
    respuesta.toPromise().then(
      r => {
        this.router.navigateByUrl(`/historia?idhistoria=` + this.idHistoriaClinica);
      },
      re => {
        this.error = re.error?.error;
      }
    );


    if (this.error) {
      alert(this.error);
    }
  }

  get form() {
    return this.formularioGrabacion.controls;
  }

}
