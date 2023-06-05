import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { EstablecimientosService } from 'src/app/servicios/Establecimientos/establecimientos.service';

@Component({
  selector: 'app-listar-establecimientos',
  templateUrl: './listar-establecimientos.component.html',
  styleUrls: ['./listar-establecimientos.component.css']
})
export class ListarEstablecimientosComponent implements OnInit {
  listaEstablecimiento: any[] = [];

  constructor(private establecimientosService: EstablecimientosService,
    private router: Router) { }

  ngOnInit() {
    this.obtenerEstablecimientos();
  }

  obtenerEstablecimientos() {
    this.establecimientosService.obtenerEstablecimientos().subscribe(
      (data: any[]) => {
        this.listaEstablecimiento = data;
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
