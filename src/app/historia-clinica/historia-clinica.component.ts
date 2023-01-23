import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-historia-clinica',
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.css']
})
export class HistoriaClinicaComponent implements OnInit {
  idHistoriaClinica?: string = null;
  error?: string = null;

  constructor(
    private route: ActivatedRoute,
  ) {
  }


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {

      this.abrirHistoriaClinica(params.id);

      console.info(params);
    });
  }

  abrirHistoriaClinica(id?: string) {
    this.idHistoriaClinica = id;
    // tslint:disable-next-line:triple-equals
    if (this.idHistoriaClinica == null || this.idHistoriaClinica.trim() == '') {
      this.error = 'Id de historia con valor no correcto';
    }
  }

}
