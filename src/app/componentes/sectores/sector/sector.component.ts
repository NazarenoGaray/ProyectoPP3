import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SectoresService } from 'src/app/servicios/sectores/sectores.service';
import { Sector } from '../../../model/sector.model';
import { Puesto } from '../../../model/puesto.model';
import { Equipo } from '../../../model/equipo.model';
import { PuestosService } from 'src/app/servicios/puestos/puestos.service';
import { EquiposService } from 'src/app/servicios/equipos/equipos.service';
import { LoadingService } from 'src/app/servicios/loading.service';
import { forkJoin, switchMap } from 'rxjs';

@Component({
  selector: 'app-sector',
  templateUrl: './sector.component.html',
  styleUrls: ['./sector.component.css']
})
export class SectorComponent implements OnInit {
  sector!: Sector;
  equipos!: Equipo[];
  puestos: Puesto[] = [];
  mostrarEquipo: boolean = true;
  loading: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private sectoresService: SectoresService,
    private puestosService: PuestosService,
    private equiposService: EquiposService,
    private router: Router,
    private loadingService: LoadingService,

  ) { }

  ngOnInit(): void {
    // this.route.paramMap.subscribe(params => {
    //   const idSector = params.get('idSector');
    //   if (idSector) {
    //     this.obtenerPuestosPorSector(Number(idSector));
    //   }
    // });
    this.loadSectorData();
  }
  loadSectorData(): void {
    this.loading = true;
    this.loadingService.show();

    this.route.paramMap.pipe(
      switchMap(params => {
        const idSector = Number(params.get('idSector'));
        
        // Obtenemos primero los datos del sector
        return this.sectoresService.obtenerSectorPorId(idSector).pipe(
          switchMap(sector => {
            this.sector = sector;
            
            // Luego obtenemos los puestos de ese sector
            return this.puestosService.obtenerPuestosPorSector(idSector);
          })
        );
      })
    ).subscribe({
      next: (puestos: Puesto[]) => {
        this.puestos = puestos;
        
        // Obtenemos los equipos para cada puesto en paralelo
        this.loadEquiposForPuestos();
      },
      error: (error) => {
        console.error('Error al cargar datos:', error);
        this.loading = false;
        this.loadingService.hide();
      }
    });
  }
  loadEquiposForPuestos(): void {
    if (this.puestos.length === 0) {
      this.loading = false;
      this.loadingService.hide();
      return;
    }

    // Creamos un array de observables para obtener los equipos de cada puesto
    const equiposRequests = this.puestos.map(puesto => 
      this.puestosService.obtenerEquiposDeUnPuesto(puesto.idPuesto)
    );

    forkJoin(equiposRequests).subscribe({
      next: (equiposArrays: Equipo[][]) => {
        // Asignamos los equipos a cada puesto correspondiente
        this.puestos.forEach((puesto, index) => {
          puesto.equipos = equiposArrays[index] || [];
          puesto.mostrarEquipos = false; // Inicialmente ocultos
        });
        
        this.loading = false;
        this.loadingService.hide();
      },
      error: (error) => {
        console.error('Error al cargar equipos:', error);
        this.loading = false;
        this.loadingService.hide();
      }
    });
  }
  toggleEquiposDePuesto(puesto: Puesto): void {
    puesto.mostrarEquipos = !puesto.mostrarEquipos;
  }

  verDetallesEquipo(equipo: Equipo): void {
    this.router.navigate(['/equipo', equipo.idEquipo]);
  }

  altaEquipo(idPuesto: number): void {
    this.router.navigate(['/alta-equipo', idPuesto]);
  }

  altaPuesto(): void {
    this.router.navigate(['/alta-puesto', this.sector.idSector]);
  }

  editarDatosSector(): void {
    this.router.navigate(['/editar-sector', this.sector.idSector]);
  }

  getEstadoColor(estado: string): string {
    switch(estado?.toLowerCase()) {
      case 'activo': return 'primary';
      case 'inactivo': return 'warn';
      case 'mantenimiento': return 'accent';
      default: return '';
    }
  }
//   obtenerPuestosPorSector(idSector: number) {
//     this.loadingService.show();

//     this.puestosService.obtenerPuestosPorSector(idSector).subscribe(
//       puestos => {
//         this.puestos = puestos;

//         // Obtener detalles del sector utilizando el ID del sector de cualquier puesto
//         this.sectoresService.obtenerSectorPorId(idSector).subscribe(
//           sector => {
//             this.sector = sector;
//             console.log("Sector seleccionado", this.sector);
//             console.log("Puestos recuperados", this.puestos);

//             // Para cada puesto, obtener sus equipos
//             for (const puesto of this.puestos) {
//               this.obtenerEquiposDeUnPuesto(puesto.idPuesto);
//             }
//           },
//           error => {
//             this.loadingService.hide();
//             console.error('Error al obtener los detalles del sector:', error);
//           }
//         );
//       },
//       error => {
//         console.error('Error al obtener los puestos:', error);
//       }
//     );
//   }




// obtenerEquiposDeUnPuesto(idPuesto: number) {
//   this.loadingService.show();

//   this.puestosService.obtenerEquiposDeUnPuesto(idPuesto).subscribe(
//     (equipos: Equipo[]) => {
//       if (equipos) {
//         // Buscar el puesto correspondiente y agregar los equipos
//         const puesto = this.puestos.find(p => p.idPuesto === idPuesto);
//         if (puesto) {
//           puesto.equipos = equipos;
//           console.log('Datos de los equipos por puesto:', equipos);
//         }
//       } else {
//         console.log('Error al obtener los equipos por puesto:', equipos);
//       }
//       this.loadingService.hide();
//     },
//     (error: any) => {
//       console.log('Error al obtener los detalles de los equipos:', error);
//       this.loadingService.hide();
//     }
//   );
// }






//   verDetallesEquipo(equipo: Equipo) {
//     this.router.navigate(['/equipo', equipo.idEquipo]);
//   }
//   verDetallesPuesto(puesto: Puesto) {
//     this.router.navigate(['/puesto', puesto.idPuesto]);
//   }
//   altaEquipo() {
//     this.router.navigate(['/alta-equipo']);
//   }

//   altaPuesto() {
//     this.router.navigate(['/alta-puesto']);
//   }


//   editarDatosSector() {
//     this.router.navigate(['/editar-sector/', this.sector.idSector]);
//   }

//   getEstado() {
//     return this.loadingService.getEstado();
//   }


//   verEquiposDePuesto(puesto: Puesto) {
//     puesto.mostrarEquipos = true;
//   }

//   toggleEquiposDePuesto(puesto: Puesto) {
//     puesto.mostrarEquipos = !puesto.mostrarEquipos;
//   }

//   getEstadoColor(estado: string): string {
//     switch(estado.toLowerCase()) {
//       case 'activo': return 'primary';
//       case 'inactivo': return 'warn';
//       case 'mantenimiento': return 'accent';
//       default: return '';
//     }
//   }        
}
