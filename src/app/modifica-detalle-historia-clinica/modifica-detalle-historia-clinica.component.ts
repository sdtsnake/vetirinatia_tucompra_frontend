import {Component, OnInit} from '@angular/core';
import {map} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HistoriaClinicaService} from '../historia-clinica.service';
import {Colaborador, DetalleHistoriaClinica, DetalleHistoriaPostClinica, HistoriaClinica, Mascota} from '../types/historiaClinica';

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
    });
    this.formularioGrabacion = this.formulario.group(
      {
        temperatura: ['', Validators.required],
        peso: ['', Validators.required],
        frecuenciaCardica: ['', Validators.required],
        frecuenciaRespiratoria: ['', Validators.required],
        alimentacion: ['', Validators.maxLength(255)],
        habitad: ['', Validators.maxLength(255)],
        observacion: ['', Validators.maxLength(255)],
        // tslint:disable-next-line:max-line-length
        colaborador: ['', Validators.required]
      }
    );
  }

  cargaFormulario() {
    this.formularioGrabacion.setValue({
      temperatura: this.detalleHistoriasClinicas.temperatura,
      peso: this.detalleHistoriasClinicas.peso,
      frecuenciaCardica: this.detalleHistoriasClinicas.frecuenciaCardiaca,
      frecuenciaRespiratoria: this.detalleHistoriasClinicas.frecuenciaRespiratoria,
      alimentacion: this.detalleHistoriasClinicas.alimentacion,
      habitad: this.detalleHistoriasClinicas.habitad,
      observacion: this.detalleHistoriasClinicas.observacion,
      colaborador: this.detalleHistoriasClinicas.colaborador.id
    });
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
        this.cargaFormulario();
        console.log('respuesta del servicio data ', r);
      },
      re => {
        this.error = re.error?.error;
        console.log('respuesta del servicio con error');
      }
    );
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
    // tslint:disable-next-line:no-unused-expression
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
      idColaborador: this.formularioGrabacion.get('colaborador').value,
      id : parseInt(this.idDetalleHistoriaClinica)
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
