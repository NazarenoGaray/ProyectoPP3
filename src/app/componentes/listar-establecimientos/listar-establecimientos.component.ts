import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Establecimiento } from 'src/app/model/establecimientos.model';
import { EstablecimientosService } from 'src/app/servicios/establecimientos/establecimientos.service';

@Component({
  selector: 'app-listar-establecimientos',
  templateUrl: './listar-establecimientos.component.html',
  styleUrls: ['./listar-establecimientos.component.css']
})
export class ListarEstablecimientosComponent implements OnInit {
  listaEstablecimiento: Establecimiento[] = [];

  constructor(private establecimientosService: EstablecimientosService,
    private router: Router) { }

  ngOnInit() {
    this.obtenerEstablecimientos();
  }

  obtenerEstablecimientos() {
    this.establecimientosService.obtenerEstablecimientos().subscribe(
      (data: Establecimiento[]) => {
        this.listaEstablecimiento = data;
        console.log(data);
      },
      error => {
        console.log('Error al obtener los establecimientos:', error);
      }
    );
  }

  verDetalles(idEstablecimiento: number) {
    this.router.navigate(['/establecimiento', idEstablecimiento]);
  }
}
