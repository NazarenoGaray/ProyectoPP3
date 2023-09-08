import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SectoresService } from 'src/app/servicios/sectores/sectores.service';
import { Sector } from '../../model/sector.model';
import { Puesto } from '../../model/puesto.model';
import { Equipo } from '../../model/equipo.model';
import { PuestosService } from 'src/app/servicios/puestos/puestos.service';
import { EquiposService } from 'src/app/servicios/equipos/equipos.service';

@Component({
  selector: 'app-sector',
  templateUrl: './sector.component.html',
  styleUrls: ['./sector.component.css']
})
export class SectorComponent implements OnInit {
  sector!: Sector;
  equipos!: Equipo[];
  puestos: Puesto[] = [];

  constructor(
    private route: ActivatedRoute,
    private sectoresService: SectoresService,
    private puestosService: PuestosService,
    private equiposService: EquiposService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idSector = params.get('id');
      if (idSector) {
        this.obtenerPuestosPorSector(Number(idSector));
        this.obtenerEquiposPorSector(Number(idSector));
      }
    });
  }

  obtenerPuestosPorSector(idSector: number) {
    this.puestosService.obtenerPuestosPorSector(idSector).subscribe(
      puestos => {
        this.puestos = puestos;

        // Obtener detalles del sector utilizando el ID del sector de cualquier puesto
        this.sectoresService.obtenerSectorPorId(idSector).subscribe(
          sector => {
            this.sector = sector;
            console.log("Sector seleccionado", this.sector);
            console.log("Puestos recuperados", this.puestos);
          },
          error => {
            console.error('Error al obtener los detalles del sector:', error);
          }
        );
      },
      error => {
        console.error('Error al obtener los puestos:', error);
      }
    );
  }


  obtenerEquiposPorSector(idSector: number) {
    this.equiposService.obtenerEquiposPorSector(idSector).subscribe(
      equipos => {
        this.equipos = equipos;
        console.log("Equipos recuperados", this.equipos);
      },
      (error: any) => {
        console.error('Error al obtener los equipos:', error);
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
    this.router.navigate(['/editar-sector/idSector']);
  }
}
