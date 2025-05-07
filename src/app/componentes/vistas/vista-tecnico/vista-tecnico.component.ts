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
    forkJoin([
      this.usuarioService.obtenerUsuarioPorId(idUsuario),
      this.incidentesService.obtenerIncidentesPorUsuario(idUsuario)
    ]).subscribe({
      next: ([usuario, incidentes]) => {
        this.usuario = usuario;
        this.incidentes = incidentes || [];
        console.log("incidentes: ",incidentes);
        // Filtrar incidentes agendados (aquellos con incidente_agenda)
        this.incidentesAgendados = this.incidentes.filter(item => 
          item.incidente?.incidente_agenda !== null && 
          item.incidente?.incidente_agenda !== undefined
        );
        
        this.dataReady = true;
        this.loading = false;
        this.loadingService.hide();
      },
      error: (error) => {
        console.error('Error al cargar datos:', error);
        this.loading = false;
        this.dataReady = true; // Mostrar UI incluso con error
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
    switch(prioridad?.toLowerCase()) {
      case 'alta': return 'bg-danger';
      case 'media': return 'bg-warning';
      case 'baja': return 'bg-info';
      default: return 'bg-secondary';
    }
  }

  getStatusClass(estado: string): string {
    switch(estado?.toLowerCase()) {
      case 'resuelto': return 'bg-success';
      case 'en progreso': return 'bg-primary';
      case 'pendiente': return 'bg-secondary';
      default: return 'bg-light text-dark';
    }
  }
}