import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators,FormArray } from '@angular/forms';
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
  idSector: number= 0;
  prioridades: Prioridad[] = [];
  idPrioridades: number = 0;
  categorias: Categoria[] = [];
  idCategorias: number = 0;
  estados: estado_incidente[]=[];
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



  fetchData(): void {
    this.establecimientosService.obtenerEstablecimientos().subscribe((data: Establecimiento[]) => {
      this.establecimientos = data;
    });

    this.prioridadService.obtenerPrioridades().subscribe((data: Prioridad[]) => {
      console.log("prioridades",data);
      this.prioridades = data;
    });

    this.categoriaService.obtenerCategorias().subscribe((data: Categoria[]) => {
      console.log("categorias",data);
      this.categorias = data;
    });
    this.estadoIncidenteService.obtenerEstadosIncidentes().subscribe((data: estado_incidente[]) => {
      console.log("estados incidentes:",data);
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
  onSubmit(): void {
    if (this.incidenteForm.invalid) {
      return;
    }

    const incidente: Incidente = this.incidenteForm.value;

    const usuariosIDs= this.usuariosAgregados.map(usuario => usuario.idUsuario);
    const equiposIDs= this.equiposAgregados.map(equipo => equipo.idEquipo);

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

}
