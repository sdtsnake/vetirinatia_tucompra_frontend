import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HistoriaClinicaComponent} from './historia-clinica/historia-clinica.component';
import {HistoriasClinicasComponent} from './historias-clinicas/historias-clinicas.component';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {PaginaNoEncontradaComponent} from './pagina-no-encontrada/pagina-no-encontrada.component';
import {DetalleHistoriaClinicaComponent} from './detalle-historia-clinica/detalle-historia-clinica.component';
import {ConsultaDetalleHistoriaClinicaComponent} from './consulta-detalle-historia-clinica/consulta-detalle-historia-clinica.component';
import {CrearHistoriaClinicaComponent} from './crear-historia-clinica/crear-historia-clinica.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ModificaDetalleHistoriaClinicaComponent } from './modifica-detalle-historia-clinica/modifica-detalle-historia-clinica.component';
import { MenuComponent } from './menu/menu.component';
import { PiePaginaComponent } from './pie-pagina/pie-pagina.component';


@NgModule({
  declarations: [
    AppComponent,
    HistoriaClinicaComponent,
    HistoriasClinicasComponent,
    PaginaNoEncontradaComponent,
    DetalleHistoriaClinicaComponent,
    ConsultaDetalleHistoriaClinicaComponent,
    CrearHistoriaClinicaComponent,
    ModificaDetalleHistoriaClinicaComponent,
    MenuComponent,
    PiePaginaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
