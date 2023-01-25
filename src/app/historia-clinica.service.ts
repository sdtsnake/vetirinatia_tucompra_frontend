import {Injectable} from '@angular/core';
import {
  BorrarHistoriaClinica,
  Colaborador,
  CreacionDetalleHistoriaClinica,
  CreacionHistoriaClinica,
  DetalleHistoriaClinica, DetalleHistoriaPostClinica,
  HistoriaClinica,
  Mascota
} from './types/historiaClinica';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HistoriaClinicaService {

  // tslint:disable-next-line:no-shadowed-variable
  constructor(private http: HttpClient) {

  }

  cosnultarHistoriasClinicas() {
    return this.http.get<{ data: HistoriaClinica[] }>('http://localhost:8886/api/veterinaria/historia/clinica');
  }

  mascotasSinHistoriaClinica() {
    return this.http.get<{ data: Mascota[] }>('http://localhost:8886/api/veterinaria/mascota/sin/historia/clinica');
  }

  borrarHistoriaClinica(idHistoriaClinica: number) {
    return this.http.delete<BorrarHistoriaClinica>('http://localhost:8886/api/veterinaria/historia/clinica/' + idHistoriaClinica);

  }

  consultarDestalleHistoriaClinica(idHistoriaClinica: string) {
    // tslint:disable-next-line:max-line-length
    return this.http.get<{ data: DetalleHistoriaClinica[] }>('http://localhost:8886/api/veterinaria/detalle/historia/clinica/idhistoria/' + idHistoriaClinica);
  }
  consultarIdDestalleHistoriaClinica(idDetalleHistoriaClinica: string) {
    console.log("id del detalle" + idDetalleHistoriaClinica);
    // tslint:disable-next-line:max-line-length
    return this.http.get<{ data: DetalleHistoriaClinica }>('http://localhost:8886/api/veterinaria/detalle/historia/clinica/id/' + idDetalleHistoriaClinica);
  }

  consultaHistoriaClinica(idHistoriaClinica: string) {
    return this.http.get<{ data: HistoriaClinica }>('http://localhost:8886/api/veterinaria/historia/clinica/id/' + idHistoriaClinica);
  }

  consultaColaboradores() {
    return this.http.get<{ data: Colaborador[] }>('http://localhost:8886/api/veterinaria/colaborador/');
  }

  crearHistoriaCLinica(id: number) {
    const fechaCreacion = new Date();
    return this.http.post<CreacionHistoriaClinica>('http://localhost:8886/api/veterinaria/historia/clinica', {
      idMascota: id,
      fechaCreacion: fechaCreacion.toISOString().split('T')[0]
    });
  }

  crearDetalleHistoriaClinica(detalleHistoriaPostClinica: DetalleHistoriaPostClinica) {
    console.log(JSON.stringify(detalleHistoriaPostClinica));
    return this.http.post<CreacionDetalleHistoriaClinica>('http://localhost:8886/api/veterinaria/detalle/historia/clinica', detalleHistoriaPostClinica);
  }

  actualizaDetalleHistoriaClinica(detalleHistoriaClinica: DetalleHistoriaClinica) {
    console.log(JSON.stringify(detalleHistoriaClinica));
    return this.http.put<CreacionDetalleHistoriaClinica>('http://localhost:8886/api/veterinaria/detalle/historia/clinica', detalleHistoriaClinica);
  }

  borrarDetalleHistoriaClinica(idHistoriaClinica: number) {
    return this.http.delete<BorrarHistoriaClinica>('http://localhost:8886/api/veterinaria/detalle/historia/clinica/' + idHistoriaClinica);

  }

}


