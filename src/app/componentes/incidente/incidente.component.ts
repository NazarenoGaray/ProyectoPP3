import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { comentarios_incidente } from 'src/app/model/comentarios_incidente.model';
import { Equipo } from 'src/app/model/equipo.model';
import { Incidente } from 'src/app/model/incidente.model';
import { Usuario } from 'src/app/model/usuario.model';
import { IncidentesService } from 'src/app/servicios/incidentes/incidentes.service';

@Component({
  selector: 'app-incidente',
  templateUrl: './incidente.component.html',
  styleUrls: ['./incidente.component.css'],
})
export class IncidenteComponent {
  incidente!: Incidente;
  equipos!: Equipo[];
  usuarios!: Usuario[];
  comentarios_incidente!: comentarios_incidente[];

  constructor(
    private route: ActivatedRoute,
    private incidenteService: IncidentesService
  ) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idIncidente = params.get('idIncidente');
      const idTipoComentario = params.get('idIncidente');

      
      if (idIncidente) {
        this.obtenerDetalleIncidentePorId(Number(idIncidente));
        this.obtenerEquiposDeUnIncidente(Number(idIncidente));
        this.obtenerUsuariosDeUnIncidente(Number(idIncidente));
        this.obtenerComentariosDeUnIncidente(Number(idTipoComentario));


      }
    });
  }

  obtenerDetalleIncidentePorId(idIncidente: number) {
    this.incidenteService.obtenerDetalleIncidentePorId(idIncidente).subscribe(
      (data: Incidente) => {
        console.log('Detalle del incidente:', data);
        if (data) {
          this.incidente = data;
        }
      },
      error => {
        console.log('Error al obtener los detalles del incidente:', error);
      }
    );
  }


  obtenerEquiposDeUnIncidente(idIncidente: number) {
    this.incidenteService.obtenerEquiposDeUnIncidente(idIncidente).subscribe(
      (equipos: any[]) => {
        this.equipos = equipos;
        console.log('Equipos Recuperados:', this.equipos);
      },
      (error) => {
        console.log('Error al obtener los equipos del incidente:', error);
      }
    );
  }

  obtenerUsuariosDeUnIncidente(idIncidente: number) {
    this.incidenteService.obtenerUsuariosDeUnIncidente(idIncidente).subscribe(
      (usuarios: any[]) => {
        this.usuarios = usuarios;
        console.log('Usuarios Recuperados:', this.usuarios);
      },
      (error) => {
        console.log('Error al obtener los usuarios del incidente:', error);
      }
    );
  }

  obtenerComentariosDeUnIncidente(idTipoComentario: number) {
    this.incidenteService.obtenerComentariosDeUnIncidente(idTipoComentario).subscribe(
      (comentarios_incidente: any[]) => {
        this.comentarios_incidente = comentarios_incidente;
        console.log('comentarios_incidente Recuperados:', this.comentarios_incidente);
      },
      (error) => {
        console.log('Error al obtener los comentarios_incidente del incidente:', error);
      }
    );
  }
  



}
