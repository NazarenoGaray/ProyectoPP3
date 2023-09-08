import { Component, OnInit, ViewChild } from '@angular/core';
import { Incidente } from 'src/app/model/incidente.model';
import { ActivatedRoute, Router } from '@angular/router';
import { IncidentesService } from 'src/app/servicios/incidentes/incidentes.service';
import { Prioridad } from 'src/app/model/prioridad.model';
import { Categoria } from 'src/app/model/categoria.model';
import { estado_incidente } from 'src/app/model/categoria_incidente.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PrioridadService } from 'src/app/servicios/incidentes/prioridad.service';
import { CategoriaService } from 'src/app/servicios/incidentes/categoria.service';
import { EstadoIncidenteService } from 'src/app/servicios/incidentes/estadoIncidente.service';
import { LoadingService } from 'src/app/servicios/loading.service';


@Component({
  selector: 'app-listar-incidentes',
  templateUrl: './listar-incidentes.component.html',
  styleUrls: ['./listar-incidentes.component.css']
})
export class ListarIncidentesComponent implements OnInit {
  incidentes: Incidente[] = [];
  incidentesOriginales: Incidente[] = [];
  filtro: Incidente [] = [];

  prioridades: Prioridad[] = [];
  categorias: Categoria[] = [];
  estados: estado_incidente[]=[];
  incidenteForm!: FormGroup;


  constructor(
    private route: ActivatedRoute,
    private incidentesService: IncidentesService,
    private formBuilder: FormBuilder,
    private prioridadService: PrioridadService,
    private categoriaService: CategoriaService,
    private estadoIncidenteService: EstadoIncidenteService,
    private incidenteService: IncidentesService,
    private router: Router,
    private loadingService: LoadingService,
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.fetchData();
    this.route.paramMap.subscribe(params => {
      const idEstablecimiento = params.get('idEstablecimiento');
      if (idEstablecimiento) {
        this.obtenerIncidentesPorEstablecimiento(Number(idEstablecimiento));
      } 
    });
  }
  initializeForm(): void {
    this.incidenteForm = this.formBuilder.group({
      id: [''],
      establecimiento: [''],
      prioridad: [''],
      categoria: [''],
      estado: [''],
    });
  }
  fetchData():void {
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
  }
  getEstado(){
    return this.loadingService.getEstado();
  } 
  onSubmit(): void {
    this.loadingService.show();
    if (this.incidenteForm.invalid) {
    console.log("datos enviados del incidente:", this.incidenteForm.value);
      return;
    }

    const incidente: any = this.incidenteForm.value;

    console.log("datos enviados del incidente:", this.incidenteForm.value);
    console.log("datos enviados del incidente:", incidente);
     this.incidenteService.obtenerIncidentes(incidente).subscribe(
       (data: Incidente[]) => {
        this.loadingService.hide();
         console.log('Busqueda exitosa:',data); 
         this.incidentes=data;      
       },
       (error: any) => {
        this.loadingService.hide();
         console.log(`Error al buscar el/los incidente/s: ${error.message}`);
       }
    );
  }
  obtenerIncidentesPorEstablecimiento(idEstablecimiento: number) {
    this.incidentesService.obtenerIncidentesPorEstablecimiento(idEstablecimiento).subscribe(
      incidentes => {
        this.incidentes = incidentes;
        console.log('Lista de incidentes por establecimiento:', this.incidentes);
      },
      error => {
        console.log('Error al obtener los incidentes:', error);
      }
    );
  }

  filtrar(): void {
    //this.incidentes = this.incidentesOriginales.filter(incidente =>
      // incidente.idIncidente.toString().includes(this.filtroId) &&
      // incidente.establecimientos.nombre.toLowerCase().includes(this.filtroEstablecimiento.toLowerCase()) &&
      // incidente.prioridad_incidente.descripcion.toLowerCase().includes(this.filtroPrioridad.toLowerCase()) &&
      // incidente.categoria_incidente.descripcion.toLowerCase().includes(this.filtroCategoria.toLowerCase()) &&
      // incidente.estado_incidente.descripcion.toLowerCase().includes(this.filtroEstado.toLowerCase())
      // incidente.estado_usuario.descripcion.toLowerCase().includes(this.filtroEstado.toLowerCase())
    //  );
  }
}
