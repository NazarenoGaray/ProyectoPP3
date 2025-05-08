import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EstablecimientosService } from 'src/app/servicios/establecimientos/establecimientos.service';
import { Sector } from 'src/app/model/sector.model';
import { Establecimiento } from 'src/app/model/establecimientos.model';
import { SectoresService } from 'src/app/servicios/sectores/sectores.service';
import { LoadingService } from 'src/app/servicios/loading.service';
import { Incidente } from 'src/app/model/incidente.model';
import { IncidentesService } from 'src/app/servicios/incidentes/incidentes.service';

@Component({
  selector: 'app-establecimiento',
  templateUrl: './establecimiento.component.html',
  styleUrls: ['./establecimiento.component.css']
})
export class EstablecimientoComponent implements OnInit {
  establecimiento!: Establecimiento;
  sectores: Sector[] = []; // Inicializa la variable sectores como un array vacío

  mostrarSectores: boolean = true; // Inicialmente oculto
  mostrarIncidentes: boolean = true; // Inicialmente oculto

  incidentes: Incidente[] = [];



  constructor(
    private route: ActivatedRoute,
    private establecimientosService: EstablecimientosService,
    private sectoresService: SectoresService,
    private loadingService: LoadingService,
    private incidentesService: IncidentesService,

  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idEstablecimiento = params.get('idEstablecimiento');
      if (idEstablecimiento) {
        this.obtenerDetalleEstablecimientoPorId(Number(idEstablecimiento));
        this.obtenerIncidentesPorEstablecimiento(Number(idEstablecimiento));
        this.obtenerSectoresPorEstablecimiento(Number(idEstablecimiento));

        
      } else {
        console.error("***** NO SE ENCONTRÓ EL ESTABLECIMIENTO *****");
      }
    });
  }

  obtenerDetalleEstablecimientoPorId(idEstablecimiento: number) {
    this.loadingService.show();

    this.establecimientosService.obtenerDetalleEstablecimientoPorId(idEstablecimiento).subscribe(
      (data: Establecimiento) => {
        if (data && data.localidad && data.provincia && data.pais) {
          this.loadingService.hide();

          this.establecimiento = data;
          //console.log('Datos del establecimiento:', data);
        } else {
          console.error('Datos del establecimiento incompletos:', data);
        }
      },
      (error: any) => {
        this.loadingService.hide();
        console.error('Error al obtener los detalles del establecimiento:', error);
      }
    );
  }

  cargarSectores(): void {
    this.loadingService.show();

    if (!this.establecimiento.sectores) {
      this.loadingService.hide();

      this.sectoresService.obtenerSectoresPorEstablecimiento(this.establecimiento.idEstablecimiento).subscribe(
        (sectores: Sector[]) => {
          this.establecimiento.sectores = sectores;
          this.mostrarSectores = true;
        },
        error => {
          this.loadingService.hide();

          console.error('Error al obtener los sectores por establecimiento:', error);
        }
      );
    } else {
      this.loadingService.hide();

      this.mostrarSectores = true;
    }
  }
  
  toggleSectores(): void {
    this.mostrarSectores = !this.mostrarSectores; // Cambia el valor de mostrarIncidentes al contrario de su valor actual
    if (this.mostrarSectores) {
      // Si mostrarSectores es true, carga los incidentes
      this.cargarSectores();
    }
  }

  toggleIncidentes(): void {
    this.mostrarIncidentes = !this.mostrarIncidentes; // Cambia el valor de mostrarIncidentes al contrario de su valor actual
    if (this.mostrarIncidentes) {
      // Si mostrarIncidentes es true, carga los incidentes
      this.cargarIncidentes();
    }
  }



  obtenerIncidentesPorEstablecimiento(idEstablecimiento: number) {
    this.incidentesService.obtenerIncidentesPorEstablecimiento(idEstablecimiento).subscribe(
      incidentes => {
        this.incidentes = incidentes;
        //console.log('Lista de incidentes por establecimiento:', this.incidentes);
      },
      error => {
        console.error('Error al obtener los incidentes:', error);
      }
    );
  }

  
  obtenerSectoresPorEstablecimiento(idEstablecimiento: number) {
    this.sectoresService.obtenerSectoresPorEstablecimiento(idEstablecimiento).subscribe(
      sectores => {
        this.sectores = sectores;
        //console.log('Lista de sectores por establecimiento:', this.sectores);
      },
      error => {
        console.error('Error al obtener los sectores:', error);
      }
    );
  }

  cargarIncidentes(): void {
    if (!this.incidentes) {
      this.incidentesService.obtenerIncidentesPorEstablecimiento(this.establecimiento.idEstablecimiento).subscribe(
        (incidentes: Incidente[]) => {
          this.incidentes = incidentes;
          this.mostrarIncidentes = true;
          //console.log('Lista de incidentes por establecimiento:', this.incidentes);

        },
        error => {
          console.error('Error al obtener los Incidentes por establecimiento:', error);
        }
      );
    } else {
      this.mostrarIncidentes = true;
    }
  }




  
  getEstado() {
    return this.loadingService.getEstado();
  }

}
