import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/model/usuario.model';
import { UsuarioService } from 'src/app/servicios/usuarios/usuario.service';
import { IncidentesService } from 'src/app/servicios/incidentes/incidentes.service';
import { Incidente } from 'src/app/model/incidente.model';
import { incidenteAgenda } from 'src/app/model/incidente_agenda.model';
import { forkJoin, Observable } from 'rxjs';
import { LoadingService } from 'src/app/servicios/loading.service';

@Component({
  selector: 'app-vista-tecnico',
  templateUrl: './vista-tecnico.component.html',
  styleUrls: ['./vista-tecnico.component.css']
})
export class VistaTecnicoComponent implements OnInit {
  usuario!: Usuario;
  incidentes: any[] = [];
  incidentesAgendados: any[] = [];
  loading: boolean = true;
  dataReady: boolean = false;
  idUsuarioActual!: number;
  incidente_agenda!: incidenteAgenda;

  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private incidentesService: IncidentesService,
    private loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.loadingService.show();
    this.route.paramMap.subscribe(params => {
      const idUsuario = params.get('idUsuario');
      if (idUsuario) {
        this.loadUserData(Number(idUsuario));
      } else {
        console.error("ID de usuario no proporcionado");
        this.loading = false;
        this.loadingService.hide();
      }
    });
  }

  private loadUserData(idUsuario: number): void {
    this.idUsuarioActual = idUsuario;
    forkJoin([
      this.usuarioService.obtenerUsuarioPorId(idUsuario),
      this.incidentesService.obtenerIncidentesPorUsuario(idUsuario)
    ]).subscribe({
      next: ([usuario, incidentes]) => {
        this.usuario = usuario;
        this.incidentes = incidentes || [];

        // Filtrar SOLO incidentes que tengan al menos una agenda
        this.incidentesAgendados = this.incidentes.filter(item =>
          item.incidente.agendas &&
          item.incidente.agendas.length > 0
        );

        console.log('Incidentes agendados:', this.incidentesAgendados); // Para depuración

        this.dataReady = true;
        this.loading = false;
        this.loadingService.hide();
      },
      error: (error) => {
        console.error('Error al cargar datos:', error);
        this.loading = false;
        this.dataReady = true;
        this.loadingService.hide();
      }
    });
  }

  // Métodos auxiliares para el template
  shouldShowDateHeader(item: any, index: number): boolean {
    if (index === 0) return true;
    const currentDate = item.incidente.incidente_agenda?.fechaAgenda;
    const previousDate = this.incidentesAgendados[index - 1]?.incidente?.incidente_agenda?.fechaAgenda;
    return currentDate !== previousDate;
  }

  getTimeRange(agenda: any): string {
    //console.log("agenda: ", agenda);
    if (!agenda) return 'Horario no definido';
    return `${agenda.horarioInicio || '--:--'} - ${agenda.horarioFin || '--:--'}`;
  }

  getFullAddress(establecimiento: any): string {
    if (!establecimiento) return 'Dirección no disponible';
    const parts = [
      establecimiento.calle,
      establecimiento.altura,
      establecimiento.localidad?.Descripcion,
      establecimiento.provincia?.Descripcion
    ].filter(Boolean);
    return parts.join(', ') || 'Dirección no disponible';
  }

  getPriorityClass(prioridad: string): string {
    switch (prioridad?.toLowerCase()) {
      case 'alto': return 'bg-danger';
      case 'medio': return 'bg-warning';
      case 'bajo': return 'bg-info';
      default: return 'bg-secondary';
    }
  }

  getStatusClass(estado: string): string {
    switch (estado?.toLowerCase()) {
      case 'solucionado': return 'bg-success';
      case 'en curso': return 'bg-primary';
      case 'nuevo': return 'bg-primary';
      case 'Pendiente': return 'bg-secondary';
      default: return 'bg-light text-dark';
    }
  }
  agendarIncidente(incidente: any): void {
    const fechaHoy = new Date().toISOString().split('T')[0]; // o usar un datepicker
    const horarioInicio = '09:00';
    const horarioFin = '10:00';

    const agendaData = {
      idUsuario: this.idUsuarioActual,
      idIncidente: incidente.idIncidente,
      fechaAgenda: fechaHoy,
      horarioInicio,
      horarioFin
    };

    this.incidentesService.agendarIncidente(agendaData).subscribe({
      next: () => {
        // Actualizar los datos recargando o modificando el array
        incidente.incidente_agenda = agendaData;
        this.incidentesAgendados.push({ incidente });
      },
      error: (err) => {
        console.error("Error al agendar incidente:", err);
        alert("No se pudo agendar el incidente.");
      }
    });
  }

  quitarDeAgenda(incidenteId: number) {
    // Confirmación antes de proceder a eliminar
    if (confirm('¿Estás seguro de querer quitar este incidente de la agenda?')) {
      this.loading = true;
      this.dataReady = false;

      // Llamar al servicio para eliminar el incidente de la agenda
      this.incidentesService.quitarDeAgenda(incidenteId).subscribe(
        response => {
          this.loading = false;
          this.dataReady = true;
          // Actualizar la lista de incidentes agendados
          this.incidentesAgendados = this.incidentesAgendados.filter(item => item.incidente.idIncidente !== incidenteId);
          alert('Incidente quitado de la agenda.');
        },
        error => {
          this.loading = false;
          this.dataReady = true;
          console.error('Error al quitar el incidente de la agenda:', error);
          alert('Hubo un error al intentar quitar el incidente de la agenda.');
        }
      );
    }
  }

}