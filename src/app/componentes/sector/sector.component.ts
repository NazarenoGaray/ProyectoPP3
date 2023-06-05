import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SectoresService } from 'src/app/servicios/sectores/sectores.service';
import { Sector } from '../../model/sectore.model';
import { Puesto } from '../../model/puesto.model';
import { Equipo } from '../../model/equipo.model';

@Component({
  selector: 'app-sector',
  templateUrl: './sector.component.html',
  styleUrls: ['./sector.component.css']
})
export class SectorComponent implements OnInit {
  laboratorioSeleccionado: string | undefined; // Variable para almacenar el laboratorio seleccionado
  sectores: Sector[] = [];
  puestos: Puesto[] = [];
  equipos: Equipo[] = [];


  constructor(
    private route: ActivatedRoute,
    private sectoresService: SectoresService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idLaboratorio = params.get('id'); // Obtener el ID del laboratorio desde la URL
      if (idLaboratorio) {
        this.laboratorioSeleccionado = idLaboratorio; // Almacenar el laboratorio seleccionado en la variable
        this.obtenerSectorConPuestos(Number(idLaboratorio));
      }
    });
  }

  obtenerSectorConPuestos(idSector: number) {
    this.sectoresService.obtenerSectorPorId(idSector).subscribe(
      sector => {
        this.sectores = [sector]; // Almacenar el sector en un array
        console.log(this.sectores);
      },
      error => {
        console.error('Error al obtener el sector:', error);
      }
    );

    this.sectoresService.obtenerPuestosPorSector(idSector).subscribe(
      puestos => {
        this.puestos = puestos; // Almacenar los puestos de red en un array
        console.log(this.puestos);
      },
      error => {
        console.error('Error al obtener los puestos de red:', error);
      }
    );

    this.sectoresService.obtenerEquiposPorSector(idSector).subscribe(
      equipos => {
        this.equipos = equipos; // Almacenar los equipos en un array
        console.log(this.equipos);
      },
      error => {
        console.error('Error al obtener los equipos:', error);
      }
    );
  }

  verDetallesEquipo(equipo: Equipo) {
    this.router.navigate(['/equipo', equipo.id_equipo]);
  }

}
