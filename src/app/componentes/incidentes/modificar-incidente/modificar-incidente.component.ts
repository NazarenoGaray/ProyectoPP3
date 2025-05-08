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
  idUsuarioAct: number | null = null;

  usuariosAgregados: any[] = [];
  equiposAgregados: Equipo[] = [];
  resultadosBusquedaUsuario: any[] = [];
  resultadosBusquedaEquipo: Equipo[] = [];
  allUsuarios: any[] = [];
  equiposDelSector: Equipo[] = [];


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private incidenteService: IncidentesService,
    private prioridadService: PrioridadService,
    private categoriaService: CategoriaService,
    private usuarioService: UsuarioService,
    private equipoService: EquiposService,
    private estadoIncidenteService: EstadoIncidenteService,
    private dialog: MatDialog,
    private tokenService: TokenService,
    //private snackBar: MatSnackBar
  ) {
    this.idUsuarioAct = this.tokenService.getIdUsuario();

    this.incidenteForm = this.fb.group({
      establecimiento: [{ value: '', disabled: true }, Validators.required],
      sector: [{ value: '', disabled: true }, Validators.required],
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      idPrioridadIncidente: ['', Validators.required],
      idCategoriaIncidente: ['', Validators.required],
      idEstadoIncidente: ['', Validators.required],
      idEstablecimiento: ['', Validators.required],
      idSector: ['', Validators.required],
      buscarUsuario: [''],
      buscarEquipos: [''],
      informeCierre: ['']
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
  updateFormDisabledState(): void {
    const isSolved = this.incidenteSolucionado;

    const controlsToDisable = [
      'titulo', 'descripcion', 'idPrioridadIncidente',
      'idCategoriaIncidente', 'idEstadoIncidente',
    ];

    controlsToDisable.forEach(controlName => {
      const control = this.incidenteForm.get(controlName);
      if (control) {
        isSolved ? control.disable() : control.enable();
      }
    });
  }

  loadData(): void {
    // Primero obtenemos solo los datos básicos del incidente
    this.incidenteService.obtenerDetalleIncidentePorId(this.idIncidente).subscribe({
      next: (incidente) => {
        // Guardamos el incidente y actualizamos el formulario
        this.incidente = incidente;
        this.incidenteForm.patchValue({
          establecimiento: incidente.establecimientos.nombre,
          sector: incidente.sectores.nombre,
          titulo: incidente.titulo,
          descripcion: incidente.descripcion,
          idPrioridadIncidente: incidente.prioridad_incidente.idPrioridadIncidente,
          idCategoriaIncidente: incidente.categoria_incidente.idCategoriaIncidente,
          idEstadoIncidente: incidente.estado_incidente.idEstadoIncidente,
          idEstablecimiento: incidente.establecimientos.idEstablecimiento,
          idSector: incidente.sectores.idSector,
        });

        // Ahora que tenemos el idSector, cargamos el resto de los datos
        forkJoin({
          prioridades: this.prioridadService.obtenerPrioridades(),
          categorias: this.categoriaService.obtenerCategorias(),
          estados: this.estadoIncidenteService.obtenerEstadosIncidentes(),
          comentarios: this.incidenteService.obtenerComentariosDeUnIncidente(this.idIncidente),
          usuariosInc: this.incidenteService.obtenerUsuariosDeUnIncidente(this.idIncidente),
          equiposInc: this.incidenteService.obtenerEquiposDeUnIncidente(this.idIncidente),
          allUsuarios: this.usuarioService.obtenerUsuarios(),
          equiposSector: this.equipoService.obtenerEquiposPorSector(incidente.sectores.idSector),
        }).subscribe({
          next: (responses) => {
            this.prioridades = responses.prioridades;
            this.categorias = responses.categorias;
            this.estados = responses.estados;
            this.equiposInc = responses.equiposInc;

            // Normalizar comentarios
            this.comentarios = responses.comentarios
              .map(c => ({
                ...c,
                tipoComentario: this.getTipoComentarioDisplay(c.tipoComentario)
              }))
              .sort((a, b) => new Date(b.fechaHora).getTime() - new Date(a.fechaHora).getTime());

            // Normalizar usuarios
            this.usuariosInc = responses.usuariosInc
              .filter(u => u.usuario !== null)
              .map(u => ({
                ...u,
                nombre: u.usuario ? u.usuario.nombre : u.nombre,
                apellido: u.usuario ? u.usuario.apellido : u.apellido
              }));

            // Asignar usuarios y equipos iniciales
            this.usuariosAgregados = responses.usuariosInc;
            //console.log("this.usuariosAgregados: ", this.usuariosAgregados);
            this.equiposAgregados = responses.equiposInc;

            // Asignar listas completas
            this.allUsuarios = responses.allUsuarios;
            this.equiposDelSector = responses.equiposSector;

            this.incidenteSolucionado = incidente.estado_incidente.idEstadoIncidente === 4;
            this.updateFormDisabledState();
            this.isLoading = false;


          },
          error: (error) => {
            console.error('Error al cargar los datos adicionales:', error);
            this.isLoading = false;
          }
        });
      },
      error: (error) => {
        console.error('Error al cargar el incidente:', error);
        this.isLoading = false;
      }
    });
  }

  // Métodos para buscar usuarios
  buscarUsuario(event: any): void {
    const keyword = event.target.value.toLowerCase();
    if (keyword.trim() === '') {
      this.resultadosBusquedaUsuario = [];
    } else {
      this.resultadosBusquedaUsuario = this.allUsuarios
        .filter(usuario =>
          usuario.nombre.toLowerCase().includes(keyword) ||
          usuario.apellido.toLowerCase().includes(keyword)
        )
        .map(usuario => ({
          idUsuario: usuario.idUsuario,
          nombre: usuario.nombre,
          apellido: usuario.apellido,
          correo: usuario.correo,
          telefono: usuario.telefono,
          esObservador: 0
        }));
    }
  }

  // Métodos para buscar equipos
  buscarEquipo(event: any): void {
    const keyword = event.target.value.toLowerCase();
    if (keyword.trim() === '') {
      this.resultadosBusquedaEquipo = [];
    } else {
      this.resultadosBusquedaEquipo = this.equiposDelSector.filter(
        equipo =>
          equipo.nombre.toLowerCase().includes(keyword) ||
          equipo.modelo.toLowerCase().includes(keyword)
      );
    }
  }

  // Agregar y quitar usuarios
  agregarUsuario(usuario: any): void {
    if (!this.usuariosAgregados.some(u => u.usuario.idUsuario === usuario.idUsuario)) {
      this.usuariosAgregados.push(usuario);
      //console.log("usuariosAgregados ", this.usuariosAgregados)
    }
    this.incidenteForm.get('buscarUsuario')?.setValue('');
    this.resultadosBusquedaUsuario = [];
  }

  removerUsuario(usuario: any): void {
    //console.log("usuario: ",usuario.usuario);
    this.usuariosAgregados = this.usuariosAgregados.filter(u => u.usuario.idUsuario !== usuario.usuario.idUsuario);
  }

  // Agregar y quitar equipos
  agregarEquipo(equipo: Equipo): void {
    if (!this.equiposAgregados.some(e => e.idEquipo === equipo.idEquipo)) {
      this.equiposAgregados.push(equipo);
    }
    this.resultadosBusquedaEquipo = [];
    this.incidenteForm.get('buscarEquipos')?.setValue('');
  }

  removerEquipo(equipo: Equipo): void {
    this.equiposAgregados = this.equiposAgregados.filter(e => e.idEquipo !== equipo.idEquipo);
  }

  // Actualizar el incidente con los usuarios y equipos
  onSubmit(): void {
    if (this.incidenteForm.invalid) {
      return;
    }

    const estado = this.incidenteForm.value.idEstadoIncidente;
    const comentarioCierre = this.incidenteForm.value.informeCierre;

    if (estado === 4 && !comentarioCierre) {
      this.activeTab = 'informacion';
      this.showCierreWarning = true;
      return;
    }

    // Preparar datos para enviar
    const datosActualizacion = {
      ...this.incidenteForm.value,
      usuarios: this.usuariosAgregados.map(u => ({
        idUsuario: u.idUsuario || u.usuario.idUsuario,
        esObservador: u.esObservador || 0
      })),
      equipos: this.equiposAgregados.map(e => e.idEquipo)
    };

    this.isLoading = true;

    this.incidenteService.actualizarIncidente(this.idIncidente, datosActualizacion)
      .subscribe({
        next: () => {
          if (estado === 4) {
            this.publicarComentario(1, comentarioCierre);
          }
          // this.snackBar.open('Incidente actualizado correctamente', 'Cerrar', {
          //   duration: 3000
          // });

          // Recargar los datos para asegurar consistencia
          this.loadData();
        },
        error: (error) => {
          console.error('Error al actualizar el incidente:', error);
          // this.snackBar.open('Error al actualizar el incidente', 'Cerrar', {
          //   duration: 3000
          // });
          this.isLoading = false;
        }
      });
  }

  publicarComentario(tipo?: number, texto?: string): void {
    const comentario = texto || this.comentario;
    const estadoId = Number(this.incidenteForm.value.idEstadoIncidente);
    let tipoComentarioFinal: number;
    //console.log("estadoId: ", estadoId);
    switch (estadoId) {
      case 4:
        tipoComentarioFinal = 1; // Solución
        break;
      case 3:
        tipoComentarioFinal = 2; // Pendiente
        break;
      default:
        tipoComentarioFinal = 4; // Comentario Adicional
        break;
    }


    if (!comentario) return;

    const comentarioObj = {
      comentario,
      idUsuario: this.idUsuarioAct,
      idIncidente: this.idIncidente,
      idTipoComentario: tipoComentarioFinal
    };
    //console.log("comentarioObj: ", comentarioObj);
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
    // 1. Primero preparamos los datos para la reapertura
    const datosReapertura = {
      ...this.incidenteForm.getRawValue(), // Obtener todos los valores incluyendo disabled
      idEstadoIncidente: 3, // Estado "En curso"
      informeCierre: '', // Limpiar informe de cierre
      usuarios: this.usuariosAgregados.map(u => ({
        idUsuario: u.idUsuario || u.usuario.idUsuario,
        esObservador: u.esObservador || 0
      })),
      equipos: this.equiposAgregados.map(e => e.idEquipo)
    };

    this.isLoading = true;

    // 2. Primero actualizamos el estado del incidente
    this.incidenteService.actualizarIncidente(this.idIncidente, datosReapertura)
      .subscribe({
        next: (response) => {
          // 3. Si la actualización fue exitosa, enviamos el comentario
          const comentarioReapertura = {
            comentario: 'El incidente ha sido reabierto',
            idUsuario: this.idUsuarioAct,
            idIncidente: this.idIncidente,
            idTipoComentario: 4 // Cambiado a tipo 2 (Comentario) en lugar de 5
          };

          this.incidenteService.enviarComentario(comentarioReapertura).subscribe({
            next: () => {
              // 4. Actualizamos el estado local y recargamos datos
              this.incidenteSolucionado = false;
              this.updateFormDisabledState();
              this.loadData();
            },
            error: (error) => {
              console.error('Error al enviar comentario de reapertura:', error);
              this.isLoading = false;
              // Recargamos datos aunque falle el comentario
              this.loadData();
            }
          });
        },
        error: (error) => {
          console.error('Error al actualizar el incidente:', error);
          this.isLoading = false;
        }
      });
  }

  private obtenerComentariosDeUnIncidente(): void {
    this.incidenteService.obtenerComentariosDeUnIncidente(this.idIncidente)
      .subscribe(comentarios => {
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