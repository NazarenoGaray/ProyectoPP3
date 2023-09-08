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
  sectores!: Sector[];

  constructor(
    private route: ActivatedRoute,
    private establecimientosService: EstablecimientosService,
    private sectoresService: SectoresService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idEstablecimiento = params.get('idEstablecimiento');
      if (idEstablecimiento) {
        this.obtenerDetalleEstablecimientoPorId(Number(idEstablecimiento));
      }else {
        console.log("***** NO SE ENCONTRÓ EL ESTABLECIMIENTO *****");
      }
    });
  }



  obtenerDetalleEstablecimientoPorId(idEstablecimiento: number) {
    this.establecimientosService.obtenerDetalleEstablecimientoPorId(idEstablecimiento).subscribe(
      (data: Establecimiento) => {
        if (data && data.localidad && data.provincia && data.pais) {
          this.establecimiento = data;
          console.log('Datos del establecimiento:', data);
          this.sectoresService.obtenerSectoresPorEstablecimiento(idEstablecimiento).subscribe(
            (sectores: Sector[]) => {
              if (this.establecimiento) {
                this.establecimiento.sectores = sectores;
              }
            },
            error => {
              console.log('Error al obtener los sectores por establecimiento:', error);
            }
          );

        } else {
          console.log('Datos del establecimiento incompletos:', data);
        }
      },
      (error: any) => {
        console.log('Error al obtener los detalles del establecimiento:', error);
      }
    );
  }
}