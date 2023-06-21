import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/model/categoria.model';
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
  establecimientos:Establecimiento[]=[];
  sectores: Sector[]=[];
  prioridades:Prioridad[]=[];
  categorias:Categoria[]=[];
  usuarios:Usuario[]=[];

  constructor(
    private formBuilder: FormBuilder,
    private incidenteService: IncidentesService,
    private router: Router,
    private establecimientosService: EstablecimientosService,
    private sectoresService: SectoresService,
    private prioridadService: PrioridadService,
    private categoriaService: CategoriaService,
    private usuariosService: UsuarioService,
    

  ){}

  ngOnInit(): void {
    this.incidenteForm = this.formBuilder.group({
      idEstablecimiento: new FormControl({ value: '', disabled: false }, Validators.required),
      idSector: new FormControl({ value: '', disabled: true }, Validators.required),
      idPrioridad: ['', Validators.required],
      idCategoria: ['', Validators.required],
      descripcion: ['', Validators.required],
      // fechaVisita: ['', Validators.required],
      idUsuario: ['', Validators.required],
      //idEstadoIncidente: ['', Validators.required],
    });
    
    //////////////////////////////////////////////////////////////////////////
    
    this.establecimientosService.obtenerEstablecimientos().subscribe((data: any[]) => {
      this.establecimientos = data;
      //console.log('estadata:',this.establecimientos);
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
      //console.log('usdata:',this.usuarios);
    });
  }
  
  onEstablecimientoSelect() {
    const IdEstablecimiento = this.incidenteForm.value.idEstablecimiento;
    console.log("IdEsta:",IdEstablecimiento);
    this.incidenteForm.get('idSector')?.setValue('');
    this.incidenteForm.get('idSector')?.disable();
    this.sectores = [];

    if (IdEstablecimiento) {
      this.sectoresService.obtenerSectoresPorEstablecimiento(IdEstablecimiento).subscribe((data: any[]) => {
        console.log('IDEstable:',IdEstablecimiento);
        console.log('Sectordata:',data);
        this.sectores = data;
        this.incidenteForm.get('idSector')?.enable();
      },
      (err: any) => {
        console.log(`Error al cargar el incidente: ${err.message}`);
      });
    }
  }

  onSubmit(): void {
    if (this.incidenteForm.invalid) {
      return;
    }
    this.incidente = this.incidenteForm.value;
    this.incidenteService.cargarIncidente(this.incidente).subscribe(
      (res: any) => {
        console.log('incidente agregado exitosamente');
        this.router.navigate(['/listar-incidentes']);
      },
      (err: any) => {
        console.log(`Error al agregar el incidente: ${err.message}`);
      }
    );
  }

}

