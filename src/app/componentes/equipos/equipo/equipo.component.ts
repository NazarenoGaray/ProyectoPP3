import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Sector } from '../../../model/sector.model';
import { Puesto } from '../../../model/puesto.model';
import { Equipo } from '../../../model/equipo.model';
import { EquiposService } from 'src/app/servicios/equipos/equipos.service';


@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.css']
})
export class EquipoComponent implements OnInit {
  sectores!: Sector;
  puestos!: Puesto[];
  equipo!: Equipo;
  historial!: Equipo[];
  mostrarHistorial: boolean = true; 


  constructor(
    private route: ActivatedRoute,
    private equiposService: EquiposService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idEquipo = params.get('idEquipo');
      this.obtenerHistorialEquipo(Number(idEquipo));
      this.obtenerEquipoPorId(Number(idEquipo));
    });
  }

  obtenerEquipoPorId(idEquipo: number) {
    this.equiposService.obtenerEquipoPorId(idEquipo).subscribe(
      (data: Equipo) => {
        if (data) {
          this.equipo = data;
          console.log('Datos del equipo:', data);
        } else {
          console.log('Datos del establecimiento incompletos:', data);
        }
      },
      (error: any) => {
        console.log('Error al obtener los detalles del establecimiento:', error);
      }
    );
  }


  obtenerHistorialEquipo(idEquipo: number): void {
    this.equiposService.obtenerHistorialEquipo(idEquipo).subscribe(
      (historial: Equipo[]) => {
        this.historial = historial;
        console.log('Historial del equipo: ', historial);
      },
      (error: any) => {
        console.error('Error al obtener el historial del equipo:', error);
      }
    );
  }

    // Función para cambiar el estado de mostrarHistorial
    // toggleHistorial(): void {
    //   this.mostrarHistorial = !this.mostrarHistorial;
    // }
  
  
}

