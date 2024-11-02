import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/model/usuario.model';
import { UsuarioService } from 'src/app/servicios/usuarios/usuario.service';
import { IncidentesService } from 'src/app/servicios/incidentes/incidentes.service';
import { Incidente } from 'src/app/model/incidente.model';
import { incidenteAgenda } from 'src/app/model/incidente_agenda.model';
import { Observable } from 'rxjs';
import { LoadingService } from 'src/app/servicios/loading.service';

@Component({
  selector: 'app-vista-tecnico',
  templateUrl: './vista-tecnico.component.html',
  styleUrls: ['./vista-tecnico.component.css']
})
export class VistaTecnicoComponent {
  usuario!: Usuario;
  incidentes: any[] = [];
  agenda!: incidenteAgenda;
  estadoLoading!: Observable<boolean>;
  estadoLoading2: any = false;

  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private incidentesService: IncidentesService,
    private loadingService: LoadingService
  ) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.estadoLoading = this.loadingService.getEstado();

      const idUsuario = params.get('idUsuario');
      if (idUsuario) {
        this.obtenerDetallesUsuario(Number(idUsuario));

      } else {
        console.log("***** NO SE ENCONTRÓ EL USUARIO *****");
      }
    });

  }

  getEstado() {
    return this.loadingService.getEstado();
  }


  private obtenerDetallesUsuario(idUsuario: number) {
    this.usuarioService.obtenerUsuarioPorId(idUsuario).subscribe(
      (data: Usuario) => {
        console.log("Usuario Recuperado", data);
        if (data) {
          this.usuario = data;
          this.obtenerIncidentesYAgendas(idUsuario);
        }
      },
      error => {
        console.log('Error al obtener los detalles del usuario:', error);
      }
    );
  }

  private obtenerIncidentesYAgendas(idUsuario: number) {
    this.incidentesService.obtenerIncidentesPorUsuario(idUsuario).subscribe(
      (listaIncidentes: any[]) => {
        this.incidentes = listaIncidentes;
        console.log('Lista Incidentes:', this.incidentes);
      },
      (error) => {
        console.log('Error al obtener los equipos del incidente:', error);
      }
    );
  }


}

