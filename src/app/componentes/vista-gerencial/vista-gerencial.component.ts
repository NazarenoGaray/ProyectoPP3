import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Establecimiento } from 'src/app/model/establecimientos.model';
import { Estadisticas } from 'src/app/model/estadisticas.model';
import { Incidente } from 'src/app/model/incidente.model';
import { Usuario } from 'src/app/model/usuario.model';
import { EstadisticasService } from 'src/app/servicios/estadisticas/estadisticas.service';
import { UsuarioService } from 'src/app/servicios/usuarios/usuario.service';

@Component({
  selector: 'app-vista-gerencial',
  templateUrl: './vista-gerencial.component.html',
  styleUrls: ['./vista-gerencial.component.css']
})
export class VistaGerencialComponent {

  usuario!: Usuario;
  estadisticasPorFecha!: Estadisticas;
  fechaInicio: string = '2023-01-01';
  fechaFinalizacion: string = '2023-10-01';
  listaEstablecimiento!: Establecimiento[];
  totalIncidentes!: number;
  incidentes!: Incidente;

  mostrarPrioridades: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private estadisticasService: EstadisticasService,
  ) { }

  ngOnInit(): void {
    // this.obtenerEstadisticasIncidentes();
    this.route.paramMap.subscribe((params) => {
      const idUsuario = params.get('idUsuario');
      if (idUsuario) {
        this.obtenerDetallesUsuario(Number(idUsuario));
      } else {
        console.log("***** NO SE ENCONTRÓ EL USUARIO *****");
      }

    });
    this.consultarEstadisticasIncidentes();
    this.consultarEstablecimientosConMasIncidencias();
  }

  obtenerDetallesUsuario(idUsuario: number) {
    this.usuarioService.obtenerUsuarioPorId(idUsuario).subscribe(
      (data: Usuario) => {
        console.log("Usuario Recuperado", data);
        if (data) {
          this.usuario = data;
        }
      },
      error => {
        console.log('Error al obtener los detalles del usuario:', error);
      }
    );
  }

  consultarEstadisticasIncidentes() {
    // Verifica que ambas fechas estén definidas antes de hacer la solicitud
    if (this.fechaInicio && this.fechaFinalizacion) {
      console.log("Estadisticas Recuperadas", this.fechaInicio);
      console.log("Estadisticas Recuperadas", this.fechaFinalizacion);

      // Realiza la solicitud a la API utilizando las fechas seleccionadas
      this.estadisticasService.obtenerEstadisticasDeIncidentesPorFecha(this.fechaInicio, this.fechaFinalizacion).subscribe(
        (data: Estadisticas) => {
          console.log("Estadisticas Recuperadas", data);
          if (data) {
            this.estadisticasPorFecha = data;
          }
        },
        error => {
          console.log('Error al obtener las estadísticas de hoy:', error);
        }
      );
    }
  }

  consultarEstablecimientosConMasIncidencias() {
    this.estadisticasService.consultarEstablecimientosConMasIncidencias().subscribe(
      (data: any) => {
        if (data && data.establecimientosConMasIncidencias) {
          this.listaEstablecimiento = data.establecimientosConMasIncidencias;

          // Calcula la cantidad total de incidentes solo si listaEstablecimiento está definida
          if (this.listaEstablecimiento) {
            this.totalIncidentes = this.listaEstablecimiento.reduce((total, establecimiento) => total + establecimiento.totalIncidentes, 0);
          }
          console.log("Establecimientos Recuperados: ", this.listaEstablecimiento);
        } else {
          console.log('No se encontraron establecimientos con incidencias.');
        }
      },
      error => {
        console.log('Error al obtener los establecimientos:', error);
      }
    );
  }


  // private obtenerEstadisticasIncidentes() {
  //   this.estadisticasService.obtenerEstadisticasIncidentes().subscribe(
  //     (listaIncidentes: Incidente) => {
  //       this.incidentes = listaIncidentes;
  //       console.log('Cantidad Total de Incidentes:', this.incidentes);
  //     },
  //     (error) => {
  //       console.log('Error al obtener la Cantidad Total de Incidentes:', error);
  //     }
  //   );
  // }

  togglePrioridades() {
    this.mostrarPrioridades = !this.mostrarPrioridades;
}

  

}
