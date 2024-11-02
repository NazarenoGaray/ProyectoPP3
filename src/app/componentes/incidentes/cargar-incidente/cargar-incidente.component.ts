import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Observable, map, startWith } from 'rxjs';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

//////////////////////////////////////////////
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, inject, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/model/categoria.model';
import { estado_incidente } from 'src/app/model/categoria_incidente.model';
import { Equipo } from 'src/app/model/equipo.model';
import { Establecimiento } from 'src/app/model/establecimientos.model';
import { Incidente } from 'src/app/model/incidente.model';
import { Prioridad } from 'src/app/model/prioridad.model';
import { Sector } from 'src/app/model/sector.model';
import { Usuario } from 'src/app/model/usuario.model';
import { EquiposService } from 'src/app/servicios/equipos/equipos.service';
import { EstablecimientosService } from 'src/app/servicios/establecimientos/establecimientos.service';
import { CategoriaService } from 'src/app/servicios/incidentes/categoria.service';
import { EstadoIncidenteService } from 'src/app/servicios/incidentes/estadoIncidente.service';

import { IncidentesService } from 'src/app/servicios/incidentes/incidentes.service';
import { PrioridadService } from 'src/app/servicios/incidentes/prioridad.service';
import { SectoresService } from 'src/app/servicios/sectores/sectores.service';
import { UsuarioService } from 'src/app/servicios/usuarios/usuario.service';

@Component({
  selector: 'app-cargar-incidente',
  templateUrl: './cargar-incidente.component.html',
  styleUrls: ['./cargar-incidente.component.css']
})
export class CargarIncidenteComponent implements OnInit {
  incidenteForm!: FormGroup;
  establecimientos: Establecimiento[] = [];
  idEstablecimiento: number = 0;
  sectores: Sector[] = [];
  idSector: number = 0;
  prioridades: Prioridad[] = [];
  idPrioridades: number = 0;
  categorias: Categoria[] = [];
  idCategorias: number = 0;
  estados: estado_incidente[] = [];
  usuarios: Usuario[] = [];
  equipos: Equipo[] = [];
  keywordEstablecimiento = 'nombreEstablecimiento';
  keywordSector = 'nombreSector';
  keywordUsuario = 'usuario';
  filteredEstablecimientos: Establecimiento[] = [];
  filteredSectores: Sector[] = [];

  buscarUsuario: string = '';
  resultadosBusquedaUsuario: any[] = [];
  usuariosAgregados: Usuario[] = [];

  buscarEquipos: string = '';
  resultadosBusquedaEquipo: any[] = [];
  equiposAgregados: Equipo[] = [];

  //------------------------------------------------------

  incidenteFormStepper!: FormGroup;
  announcer = inject(LiveAnnouncer);
  isEditable = false;
  contador = 0;



  constructor(
    private formBuilder: FormBuilder,
    private incidenteService: IncidentesService,
    private router: Router,
    private establecimientosService: EstablecimientosService,
    private sectoresService: SectoresService,
    private prioridadService: PrioridadService,
    private categoriaService: CategoriaService,
    private usuariosService: UsuarioService,
    private equipoService: EquiposService,
    private estadoIncidenteService: EstadoIncidenteService,
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.initializeFormStep();
    this.fetchData();
  }

  initializeForm(): void {
    this.incidenteForm = this.formBuilder.group({
      establecimiento: new FormControl({ value: '', disabled: false }, Validators.required),
      sector: new FormControl({ value: '', disabled: true }, Validators.required),
      idPrioridadIncidente: ['', Validators.required],
      idCategoriaIncidente: ['', Validators.required],
      idEstadoIncidente: ['', Validators.required],
      equipos: new FormControl({ value: '', disabled: true }),
      tarea: ['', Validators.required],
      descripcion: ['', Validators.required],
      buscarEquipos: new FormControl({ value: '', disabled: true }),
      buscarUsuario: [''],
    });
  }

  initializeFormStep(): void {
    this.incidenteFormStepper = this.formBuilder.group({
      // FORMULARIO PRIMERA PARTE
      datosTicket: this.formBuilder.group({
        establecimiento: new FormControl({ value: '', disabled: false }, Validators.required),
        sector: new FormControl({ value: '', disabled: true }, Validators.required),
        buscarEquipos: new FormControl({ value: '', disabled: true }),
        equipos: new FormControl({ value: '', disabled: true }),
        buscarUsuario: [''],
        idCategoriaIncidente: ['', Validators.required]
      }),
      // FORMULARIO SEGUNDA PARTE
      descripcionTicket: this.formBuilder.group({

        idPrioridadIncidente: ['', Validators.required],
        idEstadoIncidente: ['', Validators.required],
        tarea: ['', Validators.required],
        descripcion: ['', Validators.required],

      }),
    });
  }

  //*********************************************************************************************************************************/

  //********************************************     CONSULTAR A SERIVICIO POR DATOS   ********************************************/

  fetchData(): void {
    this.establecimientosService.obtenerEstablecimientos().subscribe((data: Establecimiento[]) => {
      this.establecimientos = data;
    });

    this.prioridadService.obtenerPrioridades().subscribe((data: Prioridad[]) => {
      console.log("prioridades", data);
      this.prioridades = data;
    });

    this.categoriaService.obtenerCategorias().subscribe((data: Categoria[]) => {
      console.log("categorias", data);
      this.categorias = data;
    });
    this.estadoIncidenteService.obtenerEstadosIncidentes().subscribe((data: estado_incidente[]) => {
      console.log("estados incidentes:", data);
      this.estados = data;
    });
    this.usuariosService.obtenerUsuarios().subscribe((data: Usuario[]) => {
      this.usuarios = data;
      console.log("usuarios obtenidos:", this.usuarios)
    });
  }
  //***********************ESTABLECIMIENTO******************

  filterEstablecimientos(event: any): void {
    const keyword = event.target.value;
    if (keyword.trim() === '') {
      this.filteredEstablecimientos = [];
    } else {
      this.filteredEstablecimientos = this.establecimientos.filter(
        (establecimiento) => establecimiento.nombre.toLowerCase().includes(keyword.toLowerCase())
      );
    }
  }

  //--  SELECT_ESTABLECIMIENTO --- FORMULARIO ORIGINAL
  selectEstablecimiento(establecimiento: Establecimiento): void {
    this.incidenteForm.get('establecimiento')?.setValue(establecimiento.nombre);
    this.filteredEstablecimientos = [];
    this.idEstablecimiento = establecimiento.idEstablecimiento;
    this.sectoresService.obtenerSectoresPorEstablecimiento(establecimiento.idEstablecimiento).subscribe((data: Sector[]) => {
      this.sectores = data;
      this.incidenteForm.get('sector')?.enable();
      this.incidenteForm.get('sector')?.setValue('');
    });
  }

  //--  SELECT_ESTABLECIMIENTO --- FORMULARIO STEP -- DEL html se pasa la variable seleccionada y la setea en el form step
  selectEstablecimientoFormStep(auxEstablecimiento: Establecimiento): void {
    console.log(auxEstablecimiento.nombre);
    this.incidenteFormStepper
      .get('datosTicket.establecimiento')
      ?.setValue(auxEstablecimiento.nombre);
    this.filteredEstablecimientos = [];
    this.idEstablecimiento = auxEstablecimiento.idEstablecimiento;
    this.sectoresService
      .obtenerSectoresPorEstablecimiento(auxEstablecimiento.idEstablecimiento)
      .subscribe((auxSector: Sector[]) => {
        console.log('muestrra la data traida ', auxSector);
        this.sectores = auxSector;
        this.incidenteFormStepper.get('datosTicket.sector')?.enable();
        this.incidenteFormStepper.get('datosTicket.sector')?.setValue('');
      });
  }

  // ************************************ SECTORES ****************************************************

  // --  FILTRADO_SECTORES --- FORMULARIO ORIGINAL
  filterSectores(event: any): void {
    const keyword = event.target.value;
    if (keyword.trim() === '') {
      this.filteredSectores = [];
    } else {
      this.filteredSectores = this.sectores.filter(
        (sector) => sector.nombre.toLowerCase().includes(keyword.toLowerCase())
      );
    }
  }
  //--  SElECT_SECTORES --- FORMULARIO ORIGINAL
  selectSector(sector: Sector): void {
    this.incidenteForm.get('sector')?.setValue(sector.nombre);
    this.filteredSectores = [];
    this.idSector = sector.idSector;
    this.equipoService.obtenerEquiposPorSector(sector.idSector).subscribe((data: Equipo[]) => {
      this.equipos = data;
      this.incidenteForm.get('equipos')?.enable();
      this.incidenteForm.get('equipos')?.setValue('');
      this.incidenteForm.get('buscarEquipos')?.enable();
      this.incidenteForm.get('buscarEquipos')?.setValue('');
    });
  }
  //--  SElECT_SECTORES --- FORMULARIO nuevo
  seleccionSectorStep(auxSector: Sector): void {
    this.incidenteFormStepper.get('datosTicket.sector')?.setValue(auxSector.nombre);
    this.filteredSectores = [];
    this.idSector = auxSector.idSector;
    this.equipoService.obtenerEquiposPorSector(auxSector.idSector).subscribe((auxEquipo: Equipo[]) => {
      console.log("equipos del sector : ", this.equipos);
      this.equipos = auxEquipo;
      this.incidenteFormStepper.get('datosTicket.equipos')?.enable();
      this.incidenteFormStepper.get('datosTicket.equipos')?.setValue('');
      this.incidenteFormStepper.get('datosTicket.buscarEquipos')?.enable();
      this.incidenteFormStepper.get('datosTicket.buscarEquipos')?.setValue('');
    });
  }

  // ****************************************************  ENVIAR  FORMULARIO original ****************************************************
  onSubmit(): void {
    if (this.incidenteForm.invalid) {
      return;
    }

    const incidente: Incidente = this.incidenteForm.value;

    const usuariosIDs = this.usuariosAgregados.map(usuario => usuario.idUsuario);
    const equiposIDs = this.equiposAgregados.map(equipo => equipo.idEquipo);

    incidente.idUsuarios = usuariosIDs;
    incidente.idEquipos = equiposIDs;
    incidente.idEstablecimiento = this.idEstablecimiento;
    incidente.idSector = this.idSector;

    console.log("datos enviados del incidente:", this.incidenteForm.value);
    this.incidenteService.cargarIncidente(incidente).subscribe(
      () => {
        console.log('Incidente agregado exitosamente');
        this.router.navigate(['/listar-incidentes']);
      },
      (error: any) => {
        console.log(`Error al agregar el incidente: ${error.message}`);
      }
    );
  }
  // ****************************************************  ENVIAR  FORMULARIO step ****************************************************

  onSubmitStep() {
    if (this.incidenteFormStepper.invalid) {
      return;
    }
    // datosTicket:establecimiento,sector,buscarEquipos,equipos,buscarUsuario,idCategoriaIncidente
    // descripcionTicket:idPrioridadIncidente,idEstadoIncidente,tarea,descripcion
    // OBTENEMOS FORMULARIOS
    const datosTicket = this.incidenteFormStepper.get('datosTicket')?.value;
    const descripcionTicket = this.incidenteFormStepper.get('descripcionTicket')?.value;
    // MAPEAMOS USUARIOS Y EQUIPOS
    const usuariosIDs = this.usuariosAgregados.map((usuario) => usuario.idUsuario);
    const equiposIDs = this.equiposAgregados.map((equipo) => equipo.idEquipo);
    // GUARDAMOS EN EL FORMULARIO DATOS MAPEADOS
    datosTicket.idUsuarios = usuariosIDs;
    datosTicket.idEquipos = equiposIDs;
    datosTicket.idEstablecimiento = this.idEstablecimiento;
    datosTicket.idSector = this.idSector;
    // CREAMOS UN OBJETO UNIENDO EL FORMULARIO 
    const incidenteCompleto: Incidente = {
      ...datosTicket,
      ...descripcionTicket
    };

    console.log("datos enviados: ", incidenteCompleto);
    this.incidenteService.cargarIncidente(incidenteCompleto).subscribe(
      (res: any) => {

        console.log('Incidente agregado exitosamente');
        console.log('Respuesta del serv', res);
        this.router.navigate(['/listar-incidentes']);
      },
      (err: any) => {
        console.log(`Error al agregar el incidente: ${err.message}`);
        console.log('error: ', err.message);
      }
    );
  }

  //**************busqueda de equipos/s******
  buscarEquiposFunction() {
    const searchTerm = this.incidenteForm.get('buscarEquipos')?.value.toLowerCase();
    console.log("se filtra por:", this.incidenteForm.get('buscarEquipos')?.value.toLowerCase());

    if (searchTerm.trim() === '') {
      this.resultadosBusquedaEquipo = [];
      return;
    }

    this.resultadosBusquedaEquipo = this.equipos.filter(equipo =>
      equipo.nombre.toLowerCase().includes(searchTerm) || equipo.descripcion.toLowerCase().includes(searchTerm)
    );
  }
  agregarEquipo(equipo: any) {
    if (!this.equiposAgregados.includes(equipo)) {
      this.equiposAgregados.push(equipo);
    }
    console.log("equipos existentes : ", this.equiposAgregados);
  }

  removerEquipo(equipo: any) {
    const index = this.equiposAgregados.indexOf(equipo);
    if (index !== -1) {
      this.equiposAgregados.splice(index, 1);
    }
  }
  //**************busqueda de usuario/s******
  searchUserFunction() {
    const searchTerm = this.incidenteForm.get('buscarUsuario')?.value.toLowerCase();
    console.log("se filtra por:", this.incidenteForm.get('buscarUsuario')?.value.toLowerCase());

    if (searchTerm.trim() === '') {
      this.resultadosBusquedaUsuario = []; // Limpiar resultados si no hay término de búsqueda
      return;
    }

    this.resultadosBusquedaUsuario = this.usuarios.filter(usuario =>
      usuario.nombre.toLowerCase().includes(searchTerm) || usuario.apellido.toLowerCase().includes(searchTerm)
    );
  }
  // ****************************************************  buscar usuario step ****************************************************
  buscarUsuarioStep() {

    const searchTerm = this.incidenteFormStepper.get('datosTicket.buscarUsuario')?.value.toLowerCase()

    console.log('se filtra por:', this.incidenteFormStepper.get('datosTicket.buscarUsuario')?.value.toLowerCase());


    if (searchTerm.trim() === '') {
      this.resultadosBusquedaUsuario = []; // Limpiar resultados si no hay término de búsqueda
      return;
    }

    this.resultadosBusquedaUsuario = this.usuarios.filter(
      (usuario) =>
        usuario.nombre.toLowerCase().includes(searchTerm) ||
        usuario.apellido.toLowerCase().includes(searchTerm)
    );
  }
  // ****************************************************  esto es para ambos ****************************************************
  agregarUsuario(usuario: any) {
    if (!this.usuariosAgregados.includes(usuario)) {
      this.usuariosAgregados.push(usuario);
    }
  }

  removerUsuario(usuario: any) {
    const index = this.usuariosAgregados.indexOf(usuario);
    if (index !== -1) {
      this.usuariosAgregados.splice(index, 1);
    }
  }

  /**
   *  BUSQUEDA DE EQUIPOS - FORM STEP
   */

  buscarEquiposStep() {
    const searchTerm = this.incidenteFormStepper.get('datosTicket.buscarEquipos')?.value.toLowerCase();
    console.log('se filtra por:', this.incidenteFormStepper.get('datosTicket.buscarEquipos')?.value.toLowerCase());
    if (searchTerm.trim() === '') {
      this.resultadosBusquedaEquipo = [];
      return;
    }

    this.resultadosBusquedaEquipo = this.equipos.filter(
      (equipo) =>
        equipo.nombre.toLowerCase().includes(searchTerm) ||
        equipo.descripcion.toLowerCase().includes(searchTerm)
    );
  }

}
