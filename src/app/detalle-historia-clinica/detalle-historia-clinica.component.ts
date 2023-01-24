import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HistoriaClinicaService} from '../historia-clinica.service';
import {HistoriaClinica} from '../types/historiaClinica';
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
  historiaClinica?: HistoriaClinica = null;
  error?: string = null;
  formularioGrabacion: FormGroup;
  enviando: boolean = false;

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
          temperatura: ['', Validators.min(1), Validators.max(90)],
          peso: ['', Validators.min(1), Validators.max(150)],
          frecuenciaCardica: ['', Validators.min(1), Validators.max(500)],
          frecuenciaRespiratoria: ['', Validators.min(1), Validators.max(200)],
          alimentacion: ['', Validators.maxLength(255)],
          observacion: ['', Validators.maxLength(255)],
          colaborador: ['', Validators.nullValidator]
        }
      );
  }

  abrirDetalleHistoriaClinica(idHistoriaClinica?: string) {
    this.idHistoriaClinica = idHistoriaClinica;
    // tslint:disable-next-line:triple-equals
    if (this.idHistoriaClinica == null || this.idHistoriaClinica.trim() == '') {
      this.error = 'Id de historia con valor no correcto';
    }
  }

  cambiarColaborador(idColaborador: string): void {
    // tslint:disable-next-line:radix
    this.idColaborador = parseInt(idColaborador);
  }

  cerrarCreacionDetalle(): void {
    this.router.navigateByUrl(`/`);
  }

  enviar() {
    this.enviando = true;
    if (this.formularioGrabacion.invalid) {
      return;
    }
  }

  get form() {
    return this.formularioGrabacion.controls;
  }



}
