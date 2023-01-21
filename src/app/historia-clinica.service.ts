import { Injectable } from '@angular/core';
import { CreacionHistoriaClinica, HistoriaClinica, Mascota } from './types/historiaClinica';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HistoriaClinicaService {

  constructor(private http:HttpClient) { 

  }
  
  cosnultarHistoriasClinicas(){
    return this.http.get<{data: HistoriaClinica[]}>('http://localhost:8886/api/veterinaria/historia/clinica');
  }
  
  mascotasSinHistoriaClinica(){
    return this.http.get<{data: Mascota[]}>('http://localhost:8886/api/veterinaria/mascota/sin/historia/clinica');
  }

  crearHistoriaCLinica(id:number){
    let fechaCreacion = new Date()
    return this.http.post<CreacionHistoriaClinica>("http://localhost:8886/api/veterinaria/historia/clinica",{
      id:-1,
      mascota:{
        id
      },
      fechaCreacion:fechaCreacion.toISOString().split('T')[0]
    })
  }
}
