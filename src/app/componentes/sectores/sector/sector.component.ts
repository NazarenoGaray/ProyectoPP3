import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SectoresService } from 'src/app/servicios/sectores/sectores.service';
import { Sector } from '../../../model/sector.model';
import { Puesto } from '../../../model/puesto.model';
import { Equipo } from '../../../model/equipo.model';
import { PuestosService } from 'src/app/servicios/puestos/puestos.service';
import { EquiposService } from 'src/app/servicios/equipos/equipos.service';
import { LoadingService } from 'src/app/servicios/loading.service';

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


  constructor(
    private route: ActivatedRoute,
    private sectoresService: SectoresService,
    private puestosService: PuestosService,
    private equiposService: EquiposService,
    private router: Router,
    private loadingService: LoadingService,

  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idSector = params.get('idSector');
      const idPuesto = params.get('idPuesto');

      if (idSector) {
        this.obtenerPuestosPorSector(Number(idSector));
      }

      if (idPuesto) {
        this.obtenerEquiposDeUnPuesto(Number(idPuesto));
      }
    });
  }

  obtenerPuestosPorSector(idSector: number) {
    this.loadingService.show();

    this.puestosService.obtenerPuestosPorSector(idSector).subscribe(
      puestos => {
        this.loadingService.hide();
        this.puestos = puestos;

        // Obtener detalles del sector utilizando el ID del sector de cualquier puesto
        this.sectoresService.obtenerSectorPorId(idSector).subscribe(
          sector => {
            this.sector = sector;
            console.log("Sector seleccionado", this.sector);
            console.log("Puestos recuperados", this.puestos);

            // Para cada puesto, obtener sus equipos
            for (const puesto of this.puestos) {
              this.obtenerEquiposDeUnPuesto(puesto.idPuesto);
            }
          },
          error => {
            this.loadingService.hide();
            console.error('Error al obtener los detalles del sector:', error);
          }
        );
      },
      error => {
        console.error('Error al obtener los puestos:', error);
      }
    );
  }




obtenerEquiposDeUnPuesto(idPuesto: number) {
  this.loadingService.show();

  this.puestosService.obtenerEquiposDeUnPuesto(idPuesto).subscribe(
    (equipos: Equipo[]) => {
      if (equipos) {
        // Buscar el puesto correspondiente y agregar los equipos
        const puesto = this.puestos.find(p => p.idPuesto === idPuesto);
        if (puesto) {
          puesto.equipos = equipos;
          console.log('Datos de los equipos por puesto:', equipos);
        }
      } else {
        console.log('Error al obtener los equipos por puesto:', equipos);
      }
      this.loadingService.hide();
    },
    (error: any) => {
      console.log('Error al obtener los detalles de los equipos:', error);
      this.loadingService.hide();
    }
  );
}






  verDetallesEquipo(equipo: Equipo) {
    this.router.navigate(['/equipo', equipo.idEquipo]);
  }
  verDetallesPuesto(puesto: Puesto) {
    this.router.navigate(['/puesto', puesto.idPuesto]);
  }
  altaEquipo() {
    this.router.navigate(['/alta-equipo']);
  }

  altaPuesto() {
    this.router.navigate(['/alta-puesto']);
  }


  editarDatosSector() {
    this.router.navigate(['/editar-sector/', this.sector.idSector]);
  }

  getEstado() {
    return this.loadingService.getEstado();
  }


  verEquiposDePuesto(puesto: Puesto) {
    puesto.mostrarEquipos = true;
  }

  toggleEquiposDePuesto(puesto: Puesto) {
    puesto.mostrarEquipos = !puesto.mostrarEquipos;
  }

  getEstadoColor(estado: string): string {
    switch(estado.toLowerCase()) {
      case 'activo': return 'primary';
      case 'inactivo': return 'warn';
      case 'mantenimiento': return 'accent';
      default: return '';
    }
  }
}
