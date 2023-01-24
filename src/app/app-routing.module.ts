import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HistoriasClinicasComponent} from './historias-clinicas/historias-clinicas.component';
import {HistoriaClinicaComponent} from './historia-clinica/historia-clinica.component';
import {PaginaNoEncontradaComponent} from './pagina-no-encontrada/pagina-no-encontrada.component';
import {DetalleHistoriaClinicaComponent} from './detalle-historia-clinica/detalle-historia-clinica.component';
// tslint:disable-next-line:max-line-length
import {ConsultaDetalleHistoriaClinicaComponent} from './consulta-detalle-historia-clinica/consulta-detalle-historia-clinica.component';
import {CrearHistoriaClinicaComponent} from './crear-historia-clinica/crear-historia-clinica.component';
import {ModificaDetalleHistoriaClinicaComponent} from './modifica-detalle-historia-clinica/modifica-detalle-historia-clinica.component'; // CLI imports router


const routes: Routes = [
  { path: '', component: HistoriasClinicasComponent },
  { path: 'historia', component: HistoriaClinicaComponent },
  { path: 'detalle', component: DetalleHistoriaClinicaComponent},
  { path: 'consulta', component: ConsultaDetalleHistoriaClinicaComponent},
  { path: 'creahistoria', component: CrearHistoriaClinicaComponent},
  { path: 'modificadetalle', component: ModificaDetalleHistoriaClinicaComponent},
  { path: '**', component: PaginaNoEncontradaComponent },
];

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
