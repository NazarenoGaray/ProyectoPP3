import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { comentarios_incidente } from 'src/app/model/comentarios_incidente.model';
import { Equipo } from 'src/app/model/equipo.model';
import { Incidente } from 'src/app/model/incidente.model';
import { Usuario } from 'src/app/model/usuario.model';
import { IncidentesService } from 'src/app/servicios/incidentes/incidentes.service';
import { LoadingService } from 'src/app/servicios/loading.service';

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
  columnaOrdenada: string = '';
  ordenAscendente: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private incidenteService: IncidentesService,
    private loadingService: LoadingService,

  ) { }


  ngOnInit(): void {
    this.loadingService.show();
    this.route.paramMap.subscribe(params => {
      const idIncidente = params.get('idIncidente');
      const idTipoComentario = params.get('idIncidente');

      if (idIncidente) {
        this.obtenerDetalleIncidentePorId(Number(idIncidente));
        this.obtenerEquiposDeUnIncidente(Number(idIncidente));
        this.obtenerUsuariosDeUnIncidente(Number(idIncidente));
        this.obtenerComentariosDeUnIncidente(Number(idTipoComentario));
        this.loadingService.hide();

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
      (response: any) => {
        if (Array.isArray(response)) {
          // Si response es una matriz, asigna los usuarios
          this.usuarios = response;
          console.log('Usuarios Recuperados:', this.usuarios);
        } else if (response.message) {
          // Si response contiene un mensaje, muestra un mensaje o toma alguna acción
          console.log('Mensaje del servidor:', response.message);
          // Puedes mostrar un mensaje en tu plantilla o realizar otra acción apropiada aquí
        } else {
          console.error('Respuesta inesperada del servidor:', response);
        }
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
  getEstado(){
    return this.loadingService.getEstado();
  } 



}
