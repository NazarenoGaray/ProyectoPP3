import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SectoresService } from 'src/app/servicios/sectores/sectores.service';
import { EstablecimientosService } from 'src/app/servicios/Establecimientos/establecimientos.service';
import { Sector } from 'src/app/model/sectore.model';

@Component({
  selector: 'app-establecimiento',
  templateUrl: './establecimiento.component.html',
  styleUrls: ['./establecimiento.component.css']
})
export class EstablecimientoComponent implements OnInit {
  establecimiento: any = {};
  sectores: Sector[] = [];

  constructor(
    private route: ActivatedRoute,
    private establecimientosService: EstablecimientosService,
    private sectoresService: SectoresService,
  ) { }


  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idEstablecimiento = Number(params.get('id')); // Convertir el ID a número
      if ((idEstablecimiento)) { // Verificar si el ID es un número válido
        this.obtenerDetallesEstablecimiento(idEstablecimiento);
        this.obtenerSectoresPorEstablecimiento(idEstablecimiento);
      }else{
        console.log("*****NO SEENCONTRO EL ESTABLECIMIENTO*****");
      }
    });
  }

  obtenerDetallesEstablecimiento(idEstablecimiento: number) { // Cambiar el tipo del parámetro a "number"
    this.establecimientosService.obtenerDetalleEstablecimientoPorId(idEstablecimiento).subscribe(
      (data: any[]) => {
        if (data.length > 0) {
          this.establecimiento = data[0];
        } else {
          console.log('No se encontraron sectores en el establecimiento');
        }
      },
      error => {
        console.log('Error al obtener los detalles del establecimiento:', error);
      }
    );
  }

  obtenerSectoresPorEstablecimiento(idEstablecimiento: number) { // Cambiar el tipo del parámetro a "number"
    this.sectoresService.obtenerSectoresPorEstablecimiento(idEstablecimiento).subscribe(
      response => {
        this.sectores = response;
      },
      error => {
        console.error('Error al obtener los sectores:', error);
      }
    );
  }

}
