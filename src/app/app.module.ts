import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HistoriaClinicaComponent } from './historia-clinica/historia-clinica.component';
import { HistoriasClinicasComponent } from './historias-clinicas/historias-clinicas.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HistoriaClinicaComponent,
    HistoriasClinicasComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
