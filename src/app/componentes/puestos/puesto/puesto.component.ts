import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Equipo } from 'src/app/model/equipo.model';
import { Puesto } from 'src/app/model/puesto.model';
import { EquiposService } from 'src/app/servicios/equipos/equipos.service';
import { PuestosService } from 'src/app/servicios/puestos/puestos.service';

@Component({
  selector: 'app-puestos',
  templateUrl: './puesto.component.html',
  styleUrls: ['./puesto.component.css']
})
export class PuestoComponent {
  puesto!: Puesto;
  equipos!: Equipo[];

  constructor(
    private route: ActivatedRoute,
    private puestosService: PuestosService,
    private equiposService: EquiposService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idPuesto = params.get('idPuesto');
      if (idPuesto) {
        this.obtenerPuestoPorId(Number(idPuesto));
        this.obtenerEquiposDeUnPuesto(Number(idPuesto));
      } else {
        console.log("***** NO SE ENCONTRÓ EL Puesto *****");
      }
    });
  }

  obtenerPuestoPorId(idPuesto: number) {
    this.puestosService.obtenerPuestoPorId(idPuesto).subscribe(
      (data: any) => {
        if (data.puesto) {
          this.puesto = data.puesto;
          console.log('Datos del puesto:', data);
        } else {
          console.log('Datos del establecimiento incompletos:', data);
        }
      },
      (error: any) => {
        console.log('Error al obtener los detalles del establecimiento:', error);
      }
    );
  }

  obtenerEquiposDeUnPuesto(idPuesto: number) {
    this.puestosService.obtenerEquiposDeUnPuesto(idPuesto).subscribe(
      (data: Equipo[]) => {
        if (data) {
          this.equipos = data;
          console.log('Datos de los equipos obtenedios:', data);
        } else {
          console.log('Error al obtener los equipos:', data);
        }
      },
      (error: any) => {
        console.log('Error al obtener los detalles de los equipos:', error);
      }
    );
  }


}








  // obtenerPuestoPorId(idPuesto: number) {
  //   this.puestosService.obtenerPuestoPorId(idPuesto).subscribe(
  //     (data: Puesto) => {
  //       if (data) {
  //         this.puesto = data;
  //         console.log('Datos del puesto:', data);
  //       } else {
  //         console.log('Datos del establecimiento incompletos:', data);
  //       }
  //     },
  //     (error: any) => {
  //       console.log('Error al obtener los detalles del establecimiento:', error);
  //     }
  //   );
  // }

