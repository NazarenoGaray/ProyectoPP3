import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/model/usuario.model';
import { UsuarioService } from 'src/app/servicios/usuarios/usuario.service';
import { IncidentesService } from 'src/app/servicios/incidentes/incidentes.service';
import { Incidente } from 'src/app/model/incidente.model';

@Component({
  selector: 'app-vista-tecnico',
  templateUrl: './vista-tecnico.component.html',
  styleUrls: ['./vista-tecnico.component.css']
})
export class VistaTecnicoComponent {
  usuario!: Usuario;

  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private incidentesService: IncidentesService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const idUsuario = Number(params.get('idUsuario'));
      if (!isNaN(idUsuario)) {
        this.obtenerDetallesUsuario(idUsuario);
      } else {
        console.log("***** NO SE ENCONTRÓ EL Usuario *****");
      }
    });
  }

  obtenerDetallesUsuario(idUsuario: number) {
    this.usuario = {} as Usuario;
  
    this.usuarioService.obtenerUsuarioPorId(idUsuario).subscribe(
      (data: Usuario) => {
        console.log(data);
        console.log(idUsuario);
        if (data) {
          this.usuario = data;
  
          //se debe utilizar el servicio de sectores para recuperar mas de un sector
          this.incidentesService.obtenerIncidentesPorUsuario(idUsuario).subscribe(
            (incidentes: Incidente[]) => {
              this.usuario.incidentes = incidentes; // Asignar los sectores al objeto Establecimiento
              console.log('Incidentes por usuario:', this.usuario.incidentes);
            },
            error => {
              console.log('Error al obtener los incidentes por usuario:', error);
            }
          );
        }
      },
      error => {
        console.log('Error al obtener los detalles del usuario:', error);
      }
    );
  }
    


}
