import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EstablecimientosService } from 'src/app/servicios/establecimientos/establecimientos.service';
import { Sector } from 'src/app/model/sector.model';
import { Establecimiento } from 'src/app/model/establecimientos.model';
import { SectoresService } from 'src/app/servicios/sectores/sectores.service';

@Component({
  selector: 'app-establecimiento',
  templateUrl: './establecimiento.component.html',
  styleUrls: ['./establecimiento.component.css']
})
export class EstablecimientoComponent implements OnInit {
  establecimiento!: Establecimiento;
  sectores: Sector[] = [];

  constructor(
    private route: ActivatedRoute,
    private establecimientosService: EstablecimientosService,
    private sectoresService: SectoresService,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idEstablecimiento = Number(params.get('idEstablecimiento'));
      if (!isNaN(idEstablecimiento)) {
        this.obtenerDetallesEstablecimiento(idEstablecimiento);
      } else {
        console.log("***** NO SE ENCONTRÓ EL ESTABLECIMIENTO *****");
      }
    });
  }
  

  obtenerDetallesEstablecimiento(idEstablecimiento: number) {
    this.establecimiento = {} as Establecimiento;
  
    this.establecimientosService.obtenerDetalleEstablecimientoPorId(idEstablecimiento).subscribe(
      (data: Establecimiento[]) => {
        console.log(data);
        console.log(idEstablecimiento);
        if (data.length > 0) {
          this.establecimiento = data[0];
  
          //se debe utilizar el servicio de sectores para recuperar mas de un sector
          this.sectoresService.obtenerSectoresPorEstablecimiento(idEstablecimiento).subscribe(
            (sectores: Sector[]) => {
              this.establecimiento.sectores = sectores; // Asignar los sectores al objeto Establecimiento
              console.log('Sectores por establecimiento:', this.establecimiento.sectores);
            },
            error => {
              console.log('Error al obtener los sectores por establecimiento:', error);
            }
          );
        }
      },
      error => {
        console.log('Error al obtener los detalles del establecimiento:', error);
      }
    );
  }
    

  
}
