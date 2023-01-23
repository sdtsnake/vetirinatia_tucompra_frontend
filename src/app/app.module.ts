import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HistoriaClinicaComponent } from './historia-clinica/historia-clinica.component';
import { HistoriasClinicasComponent } from './historias-clinicas/historias-clinicas.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { PaginaNoEncontradaComponent } from './pagina-no-encontrada/pagina-no-encontrada.component'; // CLI imports

@NgModule({
  declarations: [
    AppComponent,
    HistoriaClinicaComponent,
    HistoriasClinicasComponent,
    PaginaNoEncontradaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
