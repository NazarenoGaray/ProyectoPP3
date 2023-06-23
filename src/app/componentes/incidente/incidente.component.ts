import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Incidente } from 'src/app/model/incidente.model';
import { IncidentesService } from 'src/app/servicios/incidentes/incidentes.service';

@Component({
  selector: 'app-incidente',
  templateUrl: './incidente.component.html',
  styleUrls: ['./incidente.component.css'],
})
export class IncidenteComponent {
  incidente!: Incidente;
  constructor(
    private route: ActivatedRoute,
    private incidenteService: IncidentesService
  ) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idIncidente = params.get('idIncidente');
      if (idIncidente) {
        this.obtenerDetalleIncidente(Number(idIncidente));
      }
    });
  }


obtenerDetalleIncidente(idIncidente: number) {
  this.incidenteService.obtenerDetalleIncidente(idIncidente).subscribe(
    (incidente: Incidente[]) => {
      if (incidente.length > 0) {
        this.incidente = incidente[0];
        console.log(idIncidente);
        console.log("Incidente:", this.incidente);
      }
    },
    error => {
      console.log('Error al obtener los detalles del incidente:', error);
    }
  );

}

}
