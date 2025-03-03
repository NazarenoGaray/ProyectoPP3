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



@Component({
  selector: 'app-modificar-incidente',
  templateUrl: './modificar-incidente.component.html',
  styleUrls: ['./modificar-incidente.component.css']
})
export class ModificarIncidenteComponent implements OnInit {
  incidenteForm!: FormGroup;
  prioridades: Prioridad[] = [];
  categorias: Categoria[] = [];
  idCategorias: number = 0;
  idIncidente: number = 0;
  idEstado: number = 0;
  idTipoComentario: number = 3;
  estados: estado_incidente[] = [];
  usuarios: Usuario[] = [];
  equipos: Equipo[] = [];
  usuariosInc: Usuario[] = [];
  usuarioAct!: Usuario;
  equiposInc: Equipo[] = [];
  establecimientos: Establecimiento[] = [];
  idEstablecimiento: number = 0;
  idSector: number = 0;
  comentarios: comentarios_incidente[] = [];
  activeTab = 'comentarios';
  comentario: string = '';
  informeCierre: string = '';
  incidenteSolucionado!: boolean;
  flag: boolean = true;
  isLoading: boolean = true;
  incidente: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private incidenteService: IncidentesService,
    private establecimientosService: EstablecimientosService,
    private prioridadService: PrioridadService,
    private categoriaService: CategoriaService,
    private usuariosService: UsuarioService,
    private tokenService: TokenService,
    private estadoIncidenteService: EstadoIncidenteService,
    private dialog: MatDialog,
    private loadingService: LoadingService,

  ) { }

  //**************************************NG ON INIT************************************/
  
  ngOnInit(): void {
    
    this.incidenteForm = this.formBuilder.group({
      establecimiento: new FormControl({ value: '', disabled: false }, Validators.required),
      sector: new FormControl({ value: '', disabled: false }, Validators.required),
      titulo: new FormControl({ value: '', disabled: false }, Validators.required),
      descripcion: new FormControl({ value: '', disabled: false }, Validators.required),
      idPrioridadIncidente: ['', Validators.required],
      idCategoriaIncidente: ['', Validators.required],
      idEstadoIncidente: ['', Validators.required],
      idEstablecimiento: ['', Validators.required],
      idSector: ['', Validators.required],
      informeCierre:[''],

    });

    this.loadData();

  }

  

 /* loadIncidente(): void {
    const incidenteId = this.route.snapshot.paramMap.get('idIncidente');
    this.idIncidente = Number(incidenteId);
    this.incidenteService.obtenerDetalleIncidentePorId(this.idIncidente).subscribe((incidente: any) => {
      console.log("Datos obtenidos:", incidente);
      this.incidenteForm.patchValue(incidente);
      const sectorControl = this.incidenteForm.get('sector');
      const establecimientoControl = this.incidenteForm.get('establecimiento');
      this.informeCierre = this.incidenteForm.get('informeCierre')?.value;

      //const idEstablecimientoControl = this.incidenteForm.get('idEstablecimiento');
      if (establecimientoControl) {
        establecimientoControl.setValue(incidente.establecimientos.nombre);
        this.idEstablecimiento = incidente.establecimientos.idEstablecimiento;
        
        //console.log("el nombre del establecimiento es:", establecimientoControl);
      } else {
        this.loadingService.hide();
        console.error('El control "establecimiento" no fue encontrado en el formulario.');
      }
      if (sectorControl) {
        sectorControl.setValue(incidente.sectores.nombre);
        this.idSector = incidente.sectores.idSector;
      } else {
        this.loadingService.hide();
        console.error('El control "sector" no fue encontrado en el formulario.');
      }
      if (incidente.idEstadoIncidente === 4) {
        this.incidenteSolucionado = true; // Si el estado es 4, el incidente está solucionado
      } else {
        this.incidenteSolucionado = false;
      }
    });

    this.obtenerUsuariosYEquipos();
    this.obtenerComentariosDeUnIncidente();

  }*/

//************************************** ONSUBMIT ********************************************/
  onSubmit(): void {
    if (this.incidenteForm.invalid) {
      console.log("el incidente es invalido");
      return;
    }
    console.log("estado inc al actualizar: ", this.incidenteForm.value.idEstadoIncidente);
    const updatedIncidente = this.incidenteForm.value;
    if (this.incidenteForm.value.idEstadoIncidente != 4) {
      console.log("entros sin ser 4");
      this.actualizar(updatedIncidente);
    } else if (this.incidenteForm.value.idEstadoIncidente == 4 && this.informeCierre != '') {
      console.log("entros siendo 4 y inf de cierre no null");
      this.actualizar(updatedIncidente);
      this.publicarComentario();
    } else if (this.incidenteForm.value.idEstadoIncidente == 4 && this.informeCierre == '') {
      this.activeTab = 'informacion';
    }

    // console.log("------------------------------------------------------------");
    // console.log("datos incidentes para actualizar:", this.incidenteForm.value);
    // console.log("id incidentes a actualizar:", this.idIncidente);

  }
  
  //********************************************     CONSULTAR A SERIVICIO POR DATOS   ********************************************/

  /*fetchData(): void {
    this.establecimientosService.obtenerEstablecimientos().subscribe((data: Establecimiento[]) => {
      this.establecimientos = data;
    });

    this.prioridadService.obtenerPrioridades().subscribe((data: Prioridad[]) => {
      //console.log("prioridades", data);
      this.prioridades = data;
    });

    this.categoriaService.obtenerCategorias().subscribe((data: Categoria[]) => {
      //console.log("categorias", data);
      this.categorias = data;
    });
    this.estadoIncidenteService.obtenerEstadosIncidentes().subscribe((data: estado_incidente[]) => {
      //console.log("estados incidentes:", data);
      this.estados = data;
    });
    this.usuariosService.obtenerUsuarios().subscribe((data: Usuario[]) => {
      this.usuarios = data;
      //console.log("usuarios obtenidos:", this.usuarios)
    });
  }*/
  
  loadData(){
    const incidenteId = this.route.snapshot.paramMap.get('idIncidente');
    this.idIncidente = Number(incidenteId);
    // Usa forkJoin para esperar a que todas las solicitudes se completen
    forkJoin({
      incidente: this.incidenteService.obtenerDetalleIncidentePorId(this.idIncidente),
      prioridades: this.prioridadService.obtenerPrioridades(),
      categorias: this.categoriaService.obtenerCategorias(),
      estados: this.estadoIncidenteService.obtenerEstadosIncidentes(),
      usuarios: this.usuariosService.obtenerUsuarios(),
      establecimientos: this.establecimientosService.obtenerEstablecimientos(),
      comentarios: this.incidenteService.obtenerComentariosDeUnIncidente(this.idIncidente),
      usuariosInc: this.incidenteService.obtenerUsuariosDeUnIncidente(this.idIncidente),
      equiposInc: this.incidenteService.obtenerEquiposDeUnIncidente(this.idIncidente),
    }).subscribe(
      (responses) => {
        // Asigna los datos a las propiedades del componente
        this.prioridades = responses.prioridades;
        this.categorias = responses.categorias;
        this.estados = responses.estados;
        this.comentarios = responses.comentarios;
        this.usuariosInc = responses.usuariosInc;
        this.equiposInc = responses.equiposInc;

        // Rellena el formulario con los datos del incidente
        this.incidenteForm.patchValue(responses.incidente);
        this.incidenteSolucionado = responses.incidente.estado_incidente.idEstadoIncidente === 4;

        // Marca la carga como completada
        this.isLoading = false;
        this.incidente = true;
      },
      (error) => {
        console.error('Error al cargar los datos:', error);
        this.isLoading = false; // Asegúrate de desactivar el spinner en caso de error
      }
    );
  }
  obtenerUsuariosYEquipos() {
    this.incidenteService.obtenerUsuariosDeUnIncidente(this.idIncidente).subscribe(
      (response: any) => {
        if (Array.isArray(response)) {
          // Si response es una matriz, asigna los usuarios
          this.usuariosInc = response;
          //console.log('Usuarios del incidente:', this.usuariosInc);
        } else if (response.message) {
          // Si response contiene un mensaje, muestra un mensaje o toma alguna acción
          console.log('Mensaje del servidor:', response.message);
        } else {
          console.error('Respuesta inesperada del servidor:', response);
        }

      },
      (error) => {
        console.log('Error al obtener los usuarios del incidente:', error);
      }
    );
    this.incidenteService.obtenerEquiposDeUnIncidente(this.idIncidente).subscribe(
      (equipos: any[]) => {
        this.equiposInc = equipos;
        console.log('Equipos del incidente:', this.equiposInc);
      },
      (error) => {
        console.log('Error al obtener los equipos del incidente:', error);
      }
    );
  }

  obtenerComentariosDeUnIncidente() {
    this.incidenteService.obtenerComentariosDeUnIncidente(this.idIncidente).subscribe((comentarios: any) => {
      console.log("comentarios:", comentarios);
      this.comentarios = comentarios;
    });
  }

  //*********************************************ACTUALIZAR   /   COMENTAR ********************************************/
  publicarComentario() {
    if (this.idEstado === 4) {
      this.idTipoComentario = 1
      this.comentario = this.informeCierre;
    } else if (this.idEstado === 3) {
      this.idTipoComentario = 2;
    }
    const comentarioObj = {
      comentario: this.comentario,
      idUsuario: this.usuarioAct.idUsuario,
      idIncidente: this.idIncidente,
      idTipoComentario: this.idTipoComentario,
    };

    this.incidenteService.enviarComentario(comentarioObj).subscribe(
      (respuesta: any) => {

        console.log('Comentario enviado:', respuesta);

        this.limpiarInputComentario();
        this.obtenerComentariosDeUnIncidente();
      },
      (error: any) => {

        console.error('Error al enviar el comentario:', error);
      }
    );
  }

  limpiarInputComentario() {
    this.comentario = '';
  }

  confirmarReapertura(): void {
    const dialogRef = this.dialog.open(ConfirmarDialogComponent, {
      width: '300px', // Establece el ancho del cuadro de diálogo según tus preferencias
    });

    dialogRef.afterClosed().subscribe((resultado: boolean) => {
      if (resultado) {
        this.reabrirIncidente();
      }
    });
  }

  reabrirIncidente(): void {
    const estadoControl = this.incidenteForm.get('idEstadoIncidente');
    if (estadoControl) {
      estadoControl.setValue(3);
      this.onSubmit();
    } else {
      console.error('El control "idEstadoIncidente" no fue encontrado en el formulario.');
    }

    const comentarioReapertura = {
      comentario: 'El incidente ha sido reabierto',
      idUsuario: this.usuarioAct.idUsuario,
      idIncidente: this.idIncidente,
      idTipoComentario: 5,
    };

    this.incidenteService.enviarComentario(comentarioReapertura).subscribe(
      (respuesta: any) => {
        console.log('Incidente reabierto con éxito', respuesta);
      },
      (error: any) => {
        console.error('Error al reabrir el incidente:', error);
      }
    );
  }

  actualizar(updatedIncidente: any) {
    this.incidenteService.actualizarIncidente(this.idIncidente, updatedIncidente).subscribe(() => {
      console.log('Incidente actualizado con éxito');
      this.router.navigate(['/incidente',this.idIncidente]); // Redirige a la lista de incidentes u otra ubicación deseada
    }, (error: any) => {
      console.error('Error al actualizar el incidente:', error);
    });
  }
}
