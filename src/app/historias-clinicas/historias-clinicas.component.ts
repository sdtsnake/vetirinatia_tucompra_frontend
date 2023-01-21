import { Component, OnInit } from '@angular/core';
import { Observable, } from 'rxjs';
import { map } from 'rxjs/operators';
import { HistoriaClinica } from '../types/historiaClinica';
import { HistoriaClinicaService } from "../historia-clinica.service";

@Component({
  selector: 'app-historias-clinicas',
  templateUrl: './historias-clinicas.component.html',
  styleUrls: ['./historias-clinicas.component.css']
})
export class HistoriasClinicasComponent implements OnInit {

  historiasClinicas= this.servicio.cosnultarHistoriasClinicas().pipe(map(r=>r.data));
  
  mascotasSinHistoriaClinica=this.servicio.mascotasSinHistoriaClinica().pipe(map(r=>r.data));  
  
  abrirModalCreacion:boolean=false;
  
  idMascota:number|null=null;

  error?:string;

  constructor(private servicio:HistoriaClinicaService) {

   }

  ngOnInit(): void {
    //this.historiasClinicas=this.servicio.cosnultarHistoriasClinicas();
  }

  getHistoriasClinicas(){
    this.historiasClinicas= this.servicio.cosnultarHistoriasClinicas().pipe(map(r=>r.data))
  }

  changeMascota(idmascota:string){
    this.idMascota=parseInt(idmascota);
    console.log("mascota selecionada ",idmascota);

  }

  crearHistoriaClinica(){
    let respuesta = this.servicio.crearHistoriaCLinica(this.idMascota);
    respuesta.toPromise().then(
      r =>{ 
        this.getHistoriasClinicas();
        this.cerrarModal();
        this.idMascota=null;
      },
      re => {
        this.error=re.error?.error;

        console.warn(re) 

      }
    )

  }

  cerrarModal(){
    this.abrirModalCreacion=false;
    this.error=null;

  }

  aperturaHistoria(){
    this.abrirModalCreacion=true;
  }

}
