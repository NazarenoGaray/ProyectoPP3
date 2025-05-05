import { Component } from '@angular/core';
import { ActivatedRoute, ɵafterNextNavigation } from '@angular/router';
import { catchError, forkJoin, of } from 'rxjs';
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

  constructor(
    private route: ActivatedRoute,
    private incidenteService: IncidentesService,
    private loadingService: LoadingService,

  ) { }


  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loadingService.show();

    this.route.paramMap.subscribe({
      next: (params) => {
        const idIncidente = params.get('idIncidente');

        if (!idIncidente) {
          this.loadingService.hide();
          return;
        }

        const id = Number(idIncidente);

        forkJoin({
          incidente: this.incidenteService.obtenerDetalleIncidentePorId(id).pipe(
            catchError(error => {
              console.error('Error al obtener incidente:', error);
              return of({} as Incidente); // Devuelve un objeto Incidente vacío
            })
          ),
          equipos: this.incidenteService.obtenerEquiposDeUnIncidente(id).pipe(
            catchError(error => {
              console.error('Error al obtener equipos:', error);
              return of([]); // Devuelve array vacío como fallback
            })
          ),
          usuarios: this.incidenteService.obtenerUsuariosDeUnIncidente(id).pipe(
            catchError(error => {
              console.error('Error al obtener usuarios:', error);
              return of([]); // Devuelve array vacío como fallback
            })
          ),
          comentarios: this.incidenteService.obtenerComentariosDeUnIncidente(id).pipe(
            catchError(error => {
              console.error('Error al obtener comentarios:', error);
              return of([]); // Devuelve array vacío como fallback
            })
          )
        }).subscribe({
          next: (responses) => {
            // Asignar valores con comprobación de undefined
            this.incidente = responses.incidente || {} as Incidente;
            this.equipos = responses.equipos || [];

            // Inicializar propiedades anidadas si son undefined
            if (!this.incidente.establecimientos) {
              this.incidente.establecimientos = {} as any;
            }

            //console.log('incidente: ', this.incidente);
            //console.log('equipos: ', this.equipos);

            // Procesar usuarios
            // if (Array.isArray(responses.usuarios)) {
            //   this.usuarios = responses.usuarios.map(u => ({
            //     ...u.usuario,
            //     esObservador: u.esObservador
            //   }));
            // } else {
            //   this.usuarios = [];
            // }
            //console.log('Usuarios: ', this.usuarios);

            this.comentarios_incidente = responses.comentarios || [];
            
            // Normalizar comentarios
            this.comentarios_incidente = responses.comentarios
            .map(c => ({
              ...c,
              tipoComentario: this.getTipoComentarioDisplay(c.tipoComentario)
            }))
            .sort((a, b) => new Date(b.fechaHora).getTime() - new Date(a.fechaHora).getTime()) || [];
            console.log('comentarios: ', this.comentarios_incidente);

            // Normalizar usuarios
            this.usuarios = responses.usuarios
              .filter(u => u.usuario !== null) // Filtrar usuarios nulos
              .map(u => ({
                ...u,
                nombre: u.usuario ? u.usuario.nombre : u.nombre,
                apellido: u.usuario ? u.usuario.apellido : u.apellido
              }));
            this.loadingService.hide();
          },
          error: (error) => {
            console.error('Error en forkJoin:', error);
            this.incidente = {} as Incidente;
            this.equipos = [];
            this.usuarios = [];
            this.comentarios_incidente = [];
            this.loadingService.hide();
          }
        });
      },
      error: (error) => {
        console.error('Error al obtener parámetros de ruta:', error);
        this.loadingService.hide();
      }
    });
  }

  getEstado() {
    return this.loadingService.getEstado();
  }

  private getTipoComentarioDisplay(tipo: string): string {
    const tipos: { [key: string]: string } = {
      '1': 'Solución',
      '2': 'Comentario',
      '3': 'Informe',
      '4': 'Comentario Adicional',
      '5': 'Reapertura'
    };
    return tipos[tipo] || tipo;
  }
}