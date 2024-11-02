import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Establecimiento } from 'src/app/model/establecimientos.model';
import { EstablecimientosService } from 'src/app/servicios/establecimientos/establecimientos.service';
import { LoadingService } from 'src/app/servicios/loading.service';

@Component({
  selector: 'app-listar-establecimientos',
  templateUrl: './listar-establecimientos.component.html',
  styleUrls: ['./listar-establecimientos.component.css']
})
export class ListarEstablecimientosComponent implements OnInit {
  listaEstablecimiento: Establecimiento[] = [];
  establecimientosIniciales: number = 6; // Establece el límite inicial de establecimientos

  constructor(
    private establecimientosService: EstablecimientosService,
    private router: Router,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.obtenerEstablecimientos();
  }

  getEstado() {
    return this.loadingService.getEstado();
  }

  obtenerEstablecimientos() {
    this.loadingService.show();
    this.establecimientosService.obtenerEstablecimientos().subscribe(
      (data: Establecimiento[]) => {
        this.loadingService.hide();
        this.listaEstablecimiento = data;
        console.log(data);
      },
      (error) => {
        this.loadingService.hide();
        console.log('Error al obtener los establecimientos:', error);
      }
    );
  }

  verDetalles(idEstablecimiento: number) {
    this.router.navigate(['/establecimiento', idEstablecimiento]);
  }

  verMasEstablecimientos() {
    // Aumenta el límite de establecimientos iniciales al hacer clic en "Ver Más"
    this.establecimientosIniciales += 6; // Puedes ajustar la cantidad que desees cargar adicionalmente
  }
}
