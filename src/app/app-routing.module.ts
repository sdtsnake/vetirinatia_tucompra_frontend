import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HistoriasClinicasComponent} from './historias-clinicas/historias-clinicas.component';
import {HistoriaClinicaComponent} from './historia-clinica/historia-clinica.component';
import {PaginaNoEncontradaComponent} from './pagina-no-encontrada/pagina-no-encontrada.component'; // CLI imports router


const routes: Routes = [
  { path: '', component: HistoriasClinicasComponent },
  { path: 'historia', component: HistoriaClinicaComponent },
  { path: '**', component: PaginaNoEncontradaComponent },
];

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }