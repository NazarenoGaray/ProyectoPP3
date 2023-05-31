import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EstablecimientosService } from 'src/app/servicios/establecimientos.service';
import { SectoresService } from 'src/app/servicios/sectores.service';
import { Sector } from '../model/sectores.model';

@Component({
  selector: 'app-establecimiento',
  templateUrl: './establecimiento.component.html',
  styleUrls: ['./establecimiento.component.css']
})
export class EstablecimientoComponent implements OnInit {
  establecimiento: any = {};
  sectores: any[] = [];
  nombreSectorSeleccionado: string | undefined;


  constructor(
    private route: ActivatedRoute,
    private establecimientosService: EstablecimientosService,
    private sectoresService: SectoresService
  ) { }

  ngOnInit() {
    this.obtenerDetallesEstablecimiento();
    this.obtenerSectoresPorEstablecimiento();
  }

  // la respuesta del servicio obtenerEstablecimientoPorId() devuelve un array con un solo elemento en lugar de un objeto directo.
  obtenerDetallesEstablecimiento() {
    const idEstablecimiento = this.route.snapshot.params['id'];
    this.establecimientosService.obtenerEstablecimientoPorId(idEstablecimiento).subscribe(
      (data: any[]) => {
        // Verificar si el array contiene al menos un elemento
        if (data.length > 0) {
          this.establecimiento = data[0]; // Acceder al primer elemento del array
        } else {
          console.log('No se encontró el establecimiento');
        }
      },
      error => {
        console.log('Error al obtener los detalles del establecimiento:', error);
      }
    );
  }

  obtenerSectoresPorEstablecimiento() {
    const idEstablecimiento = this.route.snapshot.params['id'];
    this.sectoresService.obtenerSectoresPorEstablecimiento(idEstablecimiento).subscribe(
      response => {
        console.log('Sectores obtenidos:', response);
        // Resto del código para manejar la respuesta y asignar los valores correspondientes
      },
      error => {
        console.error('Error al obtener los sectores:', error);
      }
    );

  }
  trackById(index: number, sector: any) {
    return sector.id; // Reemplaza 'id' con la propiedad única del sector
  }

  mostrarSector(sector: Sector) {
    console.log('Haz clic en el sector:', sector);
    console.log('Detalles del sector:');
    console.log('Nombre: ' + sector.nombre);

    this.nombreSectorSeleccionado = sector.nombre; // Asignar el nombre del sector a la nueva propiedad
  }




}
