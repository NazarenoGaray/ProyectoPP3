import { Component, OnInit } from '@angular/core';
import { Incidente } from 'src/app/model/incidente.model';
import { ActivatedRoute } from '@angular/router';
import { IncidentesService } from 'src/app/servicios/incidentes/incidentes.service';

@Component({
  selector: 'app-listar-incidentes',
  templateUrl: './listar-incidentes.component.html',
  styleUrls: ['./listar-incidentes.component.css']
})
export class ListarIncidentesComponent implements OnInit {
  listaIncidentes: Incidente[] = [];

  constructor(
    private route: ActivatedRoute,
    private incidentesService: IncidentesService
  ) { }
  
  ngOnInit(): void {
    const idEstablecimiento = this.route.snapshot.firstChild?.params['idEstablecimiento'];
    if (idEstablecimiento) {
      this.obtenerIncidentesPorEstablecimiento(Number(idEstablecimiento));
    } else {
      this.obtenerIncidentes();
    }
  }
  
      
  obtenerIncidentes() {
    this.incidentesService.obtenerIncidentes().subscribe(
      incidentes => {
        this.listaIncidentes = incidentes;
        console.log('Lista de todos los incidentes:', this.listaIncidentes);
      },
      error => {
        console.log('Error al obtener los incidentes:', error);
      }
    );
  }

  obtenerIncidentesPorEstablecimiento(idEstablecimiento: number) {
    this.incidentesService.obtenerIncidentesPorEstablecimiento(idEstablecimiento).subscribe(
      incidentes => {
        this.listaIncidentes = incidentes;
        console.log('Lista de incidentes por establecimiento:', this.listaIncidentes);
      },
      error => {
        console.log('Error al obtener los incidentes:', error);
      }
    );
  }
}
