import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Sector } from '../../model/sectore.model';
import { Puesto } from '../../model/puesto.model';
import { Equipo } from '../../model/equipo.model';
import { EquiposService } from 'src/app/servicios/equipos/equipos.service';


@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.css']
})
export class EquipoComponent implements OnInit {
  sectores: Sector[] = [];
  puestos: Puesto[] = [];
  equipos: Equipo[] = [];


  constructor(
    private route: ActivatedRoute,
    private equiposService: EquiposService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idEquipo = params.get('id');
      if (idEquipo) {
        this.obtenerEquipo(Number(idEquipo));
      }
    });
  }

  obtenerEquipo(idEquipo: number): void {
    this.equiposService.obtenerEquipo(idEquipo).subscribe(
      (equipo: Equipo) => {
        this.equipos = [equipo];
        console.log(this.equipos);
      },
      (error: any) => {
        console.error('Error al obtener el equipo:', error);
      }
    );
  }


}
