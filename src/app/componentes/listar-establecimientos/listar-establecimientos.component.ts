import { Component, OnInit } from '@angular/core';
import { EstablecimientosService } from 'src/app/servicios/establecimientos.service';
import { Router } from '@angular/router';

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
