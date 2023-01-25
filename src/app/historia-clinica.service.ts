import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';
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
    return this.http.get<{ data: HistoriaClinica[] }>(`${environment.apiurl}/veterinaria/historia/clinica`);
  }

  mascotasSinHistoriaClinica() {
    return this.http.get<{ data: Mascota[] }>(`${environment.apiurl}/veterinaria/mascota/sin/historia/clinica`);
  }

  borrarHistoriaClinica(idHistoriaClinica: number) {
    return this.http.delete<BorrarHistoriaClinica>(`${environment.apiurl}/veterinaria/historia/clinica/` + idHistoriaClinica);

  }

  consultarDestalleHistoriaClinica(idHistoriaClinica: string) {
    // tslint:disable-next-line:max-line-length
    return this.http.get<{ data: DetalleHistoriaClinica[] }>(`${environment.apiurl}/veterinaria/detalle/historia/clinica/idhistoria/` + idHistoriaClinica);
  }
  consultarIdDestalleHistoriaClinica(idDetalleHistoriaClinica: string) {
    console.log("id del detalle" + idDetalleHistoriaClinica);
    // tslint:disable-next-line:max-line-length
    return this.http.get<{ data: DetalleHistoriaClinica }>(`${environment.apiurl}/veterinaria/detalle/historia/clinica/id/` + idDetalleHistoriaClinica);
  }

  consultaHistoriaClinica(idHistoriaClinica: string) {
    return this.http.get<{ data: HistoriaClinica }>(`${environment.apiurl}/veterinaria/historia/clinica/id/` + idHistoriaClinica);
  }

  consultaColaboradores() {
    return this.http.get<{ data: Colaborador[] }>(`${environment.apiurl}/veterinaria/colaborador/`);
  }

  crearHistoriaCLinica(id: number) {
    const fechaCreacion = new Date();
    return this.http.post<CreacionHistoriaClinica>(`${environment.apiurl}/veterinaria/historia/clinica`, {
      idMascota: id,
      fechaCreacion: fechaCreacion.toISOString().split(`T`)[0]
    });
  }

  crearDetalleHistoriaClinica(detalleHistoriaPostClinica: DetalleHistoriaPostClinica) {
    console.log(JSON.stringify(detalleHistoriaPostClinica));
    return this.http.post<CreacionDetalleHistoriaClinica>(`${environment.apiurl}/veterinaria/detalle/historia/clinica`, detalleHistoriaPostClinica);
  }

  actualizaDetalleHistoriaClinica(detalleHistoriaPostClinica: DetalleHistoriaPostClinica) {
    console.log(JSON.stringify(detalleHistoriaPostClinica));
    return this.http.put<CreacionDetalleHistoriaClinica>(`${environment.apiurl}/veterinaria/detalle/historia/clinica`, detalleHistoriaPostClinica);
  }

  borrarDetalleHistoriaClinica(idHistoriaClinica: number) {
    return this.http.delete<BorrarHistoriaClinica>(`${environment.apiurl}/veterinaria/detalle/historia/clinica/` + idHistoriaClinica);

  }

}


