import { chunk } from 'lodash-es';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/model/categoria.model';
import { Equipo } from 'src/app/model/equipo.model';
import { Establecimiento } from 'src/app/model/establecimientos.model';
import { Incidente } from 'src/app/model/incidente.model';
import { Prioridad } from 'src/app/model/prioridad.model';
import { Sector } from 'src/app/model/sector.model';
import { Usuario } from 'src/app/model/usuario.model';
import { EstablecimientosService } from 'src/app/servicios/establecimientos/establecimientos.service';
import { CategoriaService } from 'src/app/servicios/incidentes/categoria.service';
import { IncidentesService } from 'src/app/servicios/incidentes/incidentes.service';
import { PrioridadService } from 'src/app/servicios/incidentes/prioridad.service';
import { SectoresService } from 'src/app/servicios/sectores/sectores.service';
import { UsuarioService } from 'src/app/servicios/usuarios/usuario.service';



@Component({
  selector: 'app-cargar-incidente',
  templateUrl: './cargar-incidente.component.html',
  styleUrls: ['./cargar-incidente.component.css']
})
export class CargarIncidenteComponent {



  incidenteForm!: FormGroup;
  incidente!: Incidente;
  establecimientos: Establecimiento[] = [];
  sectores: Sector[] = [];
  prioridades: Prioridad[] = [];
  categorias: Categoria[] = [];
  usuarios: Usuario[] = [];
  equipos: Equipo[] = [];
  keywordEstablecimiento = 'nombreEstablecimiento';
  keywordCuit = 'cuit';
  keywordSector = 'nombreSector';
  keywordUsuario = 'usuario';

  constructor(
    private formBuilder: FormBuilder,
    private incidenteService: IncidentesService,
    private router: Router,
    private establecimientosService: EstablecimientosService,
    private sectoresService: SectoresService,
    private prioridadService: PrioridadService,
    private categoriaService: CategoriaService,
    private usuariosService: UsuarioService,


  ) { }

  ngOnInit(): void {
    this.incidenteForm = this.formBuilder.group({
      establecimiento: new FormControl({ value: '', disabled: false }, Validators.required),
      sector: new FormControl({ value: '', disabled: true }, Validators.required),
      equipos: new FormControl({ value: '', disabled: true }, Validators.required),
      idPrioridad: ['', Validators.required],
      idCategoria: ['', Validators.required],
      descripcion: ['', Validators.required],
      // fechaVisita: ['', Validators.required],
      usuario: ['', Validators.required],
      //idEstadoIncidente: ['', Validators.required],
    });

    //////////////////////////////////////////////////////////////////////////

    this.establecimientosService.obtenerEstablecimientos().subscribe((data: any[]) => {
      this.establecimientos = data;
      console.log('estadata:', this.establecimientos);
    });
    ////////////////////////////////////////////////////////////////////////
    this.prioridadService.obtenerPrioridades().subscribe((data: any[]) => {
      this.prioridades = data;
      //console.log('priodata:',this.prioridades);
    });
    this.categoriaService.obtenerCategoriaes().subscribe((data: any[]) => {
      this.categorias = data;
      //console.log('catedata:',this.categorias);
    });
    this.usuariosService.obtenerUsuariosInc().subscribe((data: any[]) => {
      this.usuarios = data;
      console.log('usdata:', this.usuarios);
    });

  }

  onEstablecimientoSelect(event: any) {
    //const establecimiento = event;
    const idEstablecimiento = event.idEstablecimiento;
    this.incidenteForm.get('sector')?.setValue('');
    this.incidenteForm.get('sector')?.disable();
    this.incidenteForm.get('equipos')?.setValue('');
    this.incidenteForm.get('equipos')?.disable();
    this.sectores = [];
    // console.log("IdEsta:",idEstablecimiento);
    // console.log("IdEsta:",event);
    if (idEstablecimiento) {
      this.incidenteForm.get('idEstablecimiento')?.setValue(idEstablecimiento);
      // Resto de la lógica relacionada con el establecimiento seleccionado
      this.sectoresService.obtenerSectoresPorEstablecimiento(idEstablecimiento).subscribe((data: any[]) => {
        console.log('idEstable:', idEstablecimiento);
        console.log('Sectordata:', data);
        this.sectores = data;
        this.incidenteForm.get('sector')?.enable();
      },
        (err: any) => {
          console.log(`Error al cargar el incidente: ${err.message}`);
        });
    }

    // const IdEstablecimiento = Establecimiento.idEstablecimiento;
    //console.log("IdEsta:",idEstablecimiento);
    // this.incidenteForm.get('idSector')?.setValue('');
    // this.incidenteForm.get('idSector')?.disable();
    // this.sectores = [];

    // if (IdEstablecimiento) {
    //   this.sectoresService.obtenerSectoresPorEstablecimiento(IdEstablecimiento).subscribe((data: any[]) => {
    //     console.log('IDEstable:',IdEstablecimiento);
    //     console.log('Sectordata:',data);
    //     this.sectores = data;
    //     this.incidenteForm.get('idSector')?.enable();
    //   },
    //   (err: any) => {
    //     console.log(`Error al cargar el incidente: ${err.message}`);
    //   });
    // }
  }
  onSectorSelect(sector: any) {
    const idSector = sector.idSector;
    if (idSector) {
      this.incidenteForm.get('idSector')?.setValue(sector.idSector);
      this.sectoresService.obtenerEquiposPorSector(idSector).subscribe((data: any[]) => {
        console.log('IDSector:', idSector);
        console.log('equipos:', data);
        this.equipos = data;
        this.incidenteForm.get('equipos')?.enable();
      },
        (err: any) => {
          console.log(`Error al cargar el incidente: ${err.message}`);
        });
    }
  }
  // onUsuarioSelect(usuario: any) {
  //   this.incidenteForm.get('idUsuario')?.setValue(usuario.idSector);
  // }
  onSubmit(): void {
    if (this.incidenteForm.invalid) {
      return;
    }

    this.incidente = this.incidenteForm.value;
    this.incidenteService.cargarIncidente(this.incidente).subscribe(
      (res: any) => {
        console.log('incidente agregado exitosamente', res);
        this.router.navigate(['/listar-incidentes']);
      },
      (err: any) => {
        console.log(`Error al agregar el incidente: ${err.message}`);
      }
    );
  }
  
  // selectedIds: string[] = [];
  // onEquiposAfectadosChange(event: any) {
  //   this.selectedIds = Array.from(event.target.selectedOptions, (option: any) => option.value);
  // }
  // verEquiposSeleccionados() {
  //   console.log("equipos seleccionados:",this.selectedIds);
    
  // }

  // chunkArray(array: any[], size: number): any[][] {
  //   const chunkedArray = [];
  //   let index = 0;
  
  //   while (index < array.length) {
  //     chunkedArray.push(array.slice(index, index + size));
  //     index += size;
  //   }
  
  //   return chunkedArray;
  // }

  isDropdownOpen: boolean = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}

