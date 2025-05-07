import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/model/categoria.model';
import { estado_incidente } from 'src/app/model/categoria_incidente.model';
import { comentarios_incidente } from 'src/app/model/comentarios_incidente.model';
import { Equipo } from 'src/app/model/equipo.model';
import { Establecimiento } from 'src/app/model/establecimientos.model';
import { Prioridad } from 'src/app/model/prioridad.model';
import { Usuario } from 'src/app/model/usuario.model';
import { EquiposService } from 'src/app/servicios/equipos/equipos.service';
import { EstablecimientosService } from 'src/app/servicios/establecimientos/establecimientos.service';
import { CategoriaService } from 'src/app/servicios/incidentes/categoria.service';
import { EstadoIncidenteService } from 'src/app/servicios/incidentes/estadoIncidente.service';
import { IncidentesService } from 'src/app/servicios/incidentes/incidentes.service';
import { PrioridadService } from 'src/app/servicios/incidentes/prioridad.service';
import { SectoresService } from 'src/app/servicios/sectores/sectores.service';
import { UsuarioService } from 'src/app/servicios/usuarios/usuario.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarDialogComponent } from '../../globales/confirmar-dialog/confirmar-dialog.component';
import { TokenService } from 'src/app/servicios/token/token.service';
import { LoadingService } from 'src/app/servicios/loading.service';
import { forkJoin } from 'rxjs';
import { Incidente } from 'src/app/model/incidente.model';

@Component({
  selector: 'app-modificar-incidente',
  templateUrl: './modificar-incidente.component.html',
  styleUrls: ['./modificar-incidente.component.css']
})
export class ModificarIncidenteComponent implements OnInit {
  incidente!: Incidente;
  incidenteForm: FormGroup;
  prioridades: Prioridad[] = [];
  categorias: Categoria[] = [];
  estados: estado_incidente[] = [];
  usuariosInc: any[] = [];
  equiposInc: Equipo[] = [];
  comentarios: comentarios_incidente[] = [];

  idIncidente: number = 0;
  activeTab = 'comentarios';
  comentario = '';
  informeCierre = '';
  incidenteSolucionado = false;
  isLoading = true;
  showCierreWarning = false;
  idUsuarioAct: number | null = null; // Acepta number o null

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private incidenteService: IncidentesService,
    private prioridadService: PrioridadService,
    private categoriaService: CategoriaService,
    private estadoIncidenteService: EstadoIncidenteService,
    private dialog: MatDialog,
    private tokenService: TokenService
  ) {
    this.idUsuarioAct = this.tokenService.getIdUsuario();

    this.incidenteForm = this.fb.group({
      establecimiento: ['', Validators.required],
      sector: ['', Validators.required],
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      idPrioridadIncidente: ['', Validators.required],
      idCategoriaIncidente: ['', Validators.required],
      idEstadoIncidente: ['', Validators.required],
      idEstablecimiento: ['', Validators.required],
      idSector: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.idIncidente = Number(this.route.snapshot.paramMap.get('idIncidente'));
    const idUsuario = this.tokenService.getIdUsuario();

    if (idUsuario === null) {
      // Manejar el caso cuando no hay usuario autenticado
      console.error('No se pudo obtener el ID del usuario');
      this.router.navigate(['/login']);
      return;
    }
    this.loadData();
  }

  loadData(): void {
    forkJoin({
      incidente: this.incidenteService.obtenerDetalleIncidentePorId(this.idIncidente),
      prioridades: this.prioridadService.obtenerPrioridades(),
      categorias: this.categoriaService.obtenerCategorias(),
      estados: this.estadoIncidenteService.obtenerEstadosIncidentes(),
      comentarios: this.incidenteService.obtenerComentariosDeUnIncidente(this.idIncidente),
      usuariosInc: this.incidenteService.obtenerUsuariosDeUnIncidente(this.idIncidente),
      equiposInc: this.incidenteService.obtenerEquiposDeUnIncidente(this.idIncidente)
    }).subscribe({
      next: (responses) => {
        console.log('responses', responses);
        this.prioridades = responses.prioridades;
        this.categorias = responses.categorias;
        this.estados = responses.estados;
        //this.comentarios = responses.comentarios;
        this.equiposInc = responses.equiposInc;
        
        // Normalizar comentarios
        console.log('comentarios', responses.comentarios);
        this.comentarios = responses.comentarios
        .map(c => ({
          ...c,
          tipoComentario: this.getTipoComentarioDisplay(c.tipoComentario)
        }))
        .sort((a, b) => new Date(b.fechaHora).getTime() - new Date(a.fechaHora).getTime());
        
        // Normalizar usuarios
        this.usuariosInc = responses.usuariosInc
        .filter(u => u.usuario !== null) // Filtrar usuarios nulos
        .map(u => ({
          ...u,
          nombre: u.usuario ? u.usuario.nombre : u.nombre,
          apellido: u.usuario ? u.usuario.apellido : u.apellido
        }));
        
        //this.usuariosInc = responses.usuariosInc;
        console.log('usuariosInc', this.usuariosInc);
        this.equiposInc = responses.equiposInc;
        // Actualizar el formulario con los datos necesarios
        this.incidenteForm.patchValue({
          establecimiento: responses.incidente.establecimientos.nombre,
          sector: responses.incidente.sectores.nombre,
          titulo: responses.incidente.titulo,
          descripcion: responses.incidente.descripcion,
          idPrioridadIncidente: responses.incidente.prioridad_incidente.idPrioridadIncidente,
          idCategoriaIncidente: responses.incidente.categoria_incidente.idCategoriaIncidente,
          idEstadoIncidente: responses.incidente.estado_incidente.idEstadoIncidente,
          idEstablecimiento: responses.incidente.establecimientos.idEstablecimiento,
          idSector: responses.incidente.sectores.idSector,
        });
        //console.log("responses: ",responses);
        this.incidente = responses.incidente;
        this.incidenteSolucionado = responses.incidente.estado_incidente.idEstadoIncidente === 4;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar los datos:', error);
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.incidenteForm.invalid) {
      return;
    }

    const estado = this.incidenteForm.value.idEstadoIncidente;

    if (estado === 4 && !this.informeCierre) {
      this.activeTab = 'informacion';
      this.showCierreWarning = true;
      return;
    }

    this.incidenteService.actualizarIncidente(this.idIncidente, this.incidenteForm.value)
      .subscribe({
        next: () => {
          if (estado === 4) {
            this.publicarComentario(1, this.informeCierre);
          }
          this.router.navigate(['/incidente', this.idIncidente]);
        },
        error: (error) => {
          console.error('Error al actualizar el incidente:', error);
        }
      });
  }

  publicarComentario(tipo?: number, texto?: string): void {
    const comentario = texto || this.comentario;
    const tipoComentario = tipo || (this.incidenteForm.value.idEstadoIncidente === 3 ? 2 : 3);

    if (!comentario) return;

    const comentarioObj = {
      comentario,
      idUsuario: this.idUsuarioAct,
      idIncidente: this.idIncidente,
      idTipoComentario: tipoComentario
    };

    this.incidenteService.enviarComentario(comentarioObj).subscribe({
      next: () => {
        this.comentario = '';
        // Solo actualizamos los comentarios sin redirigir
        this.obtenerComentariosDeUnIncidente();

        // Si es un comentario de cierre, actualizamos el estado
        if (tipo === 1) {
          this.incidenteSolucionado = true;
        }
      },
      error: (error) => {
        console.error('Error al enviar el comentario:', error);
      }
    });
  }

  confirmarReapertura(): void {
    const dialogRef = this.dialog.open(ConfirmarDialogComponent, {
      width: '300px',
      data: {
        title: 'Confirmar reapertura',
        message: '¿Está seguro que desea reabrir este incidente?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.reabrirIncidente();
      }
    });
  }

  private reabrirIncidente(): void {
    this.incidenteForm.patchValue({ idEstadoIncidente: 3 });
    this.onSubmit();

    const comentarioReapertura = {
      comentario: 'El incidente ha sido reabierto',
      idUsuario: this.idUsuarioAct,
      idIncidente: this.idIncidente,
      idTipoComentario: 5
    };

    this.incidenteService.enviarComentario(comentarioReapertura).subscribe({
      next: () => this.obtenerComentariosDeUnIncidente(),
      error: (error) => console.error('Error al reabrir el incidente:', error)
    });
  }

  private obtenerComentariosDeUnIncidente(): void {
    this.incidenteService.obtenerComentariosDeUnIncidente(this.idIncidente)
      .subscribe(comentarios=> {
        // Ordenamos los comentarios de más nuevo a más viejo
        this.comentarios = comentarios.sort((a, b) => {
            return new Date(b.fechaHora).getTime() - new Date(a.fechaHora).getTime();
        });
      });
  }

  getEstablecimientoDisplay(): string {
    if (!this.incidente) return '';

    const est = this.incidente.establecimientos;
    return `${est.nombre} - ${est.calle} ${est.altura}`;
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