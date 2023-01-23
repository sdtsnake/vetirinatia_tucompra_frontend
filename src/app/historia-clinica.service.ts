import {Injectable} from '@angular/core';
import {BorrarHistoriaClinica, CreacionHistoriaClinica, HistoriaClinica, Mascota} from './types/historiaClinica';
import {HttpClient} from '@angular/common/http';
import * as http from 'http';

@Injectable({
  providedIn: 'root'
})
export class HistoriaClinicaService {

  // tslint:disable-next-line:no-shadowed-variable
  constructor(private http: HttpClient) {

  }

  cosnultarHistoriasClinicas(): http {
    return this.http.get<{ data: HistoriaClinica[] }>('http://localhost:8886/api/veterinaria/historia/clinica');
  }

  mascotasSinHistoriaClinica(): http {
    return this.http.get<{ data: Mascota[] }>('http://localhost:8886/api/veterinaria/mascota/sin/historia/clinica');
  }

  crearHistoriaCLinica(id: number): http {
    const fechaCreacion = new Date();
    return this.http.post<CreacionHistoriaClinica>('http://localhost:8886/api/veterinaria/historia/clinica', {
      id: -1,
      mascota: {
        id
      },
      fechaCreacion: fechaCreacion.toISOString().split('T')[0]
    });
  }

  borrarHistoriaClinica(idHistoriaClinica: number): void{
    return this.http.delete<BorrarHistoriaClinica>('http://localhost:8886/api/veterinaria/historia/clinica/' + idHistoriaClinica);

  }
}
