import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, switchMap, take } from 'rxjs';
import { Equipo } from 'src/app/model/equipo.model';
import { Establecimiento } from 'src/app/model/establecimientos.model';
import { estado_equipo } from 'src/app/model/estado_equipo.model';
import { Puesto } from 'src/app/model/puesto.model';
import { Sector } from 'src/app/model/sector.model';
import { tipo_equipo } from 'src/app/model/tipo_equipo.model';
import { EquiposService } from 'src/app/servicios/equipos/equipos.service';
import { EstablecimientosService } from 'src/app/servicios/establecimientos/establecimientos.service';
import { PuestosService } from 'src/app/servicios/puestos/puestos.service';
import { SectoresService } from 'src/app/servicios/sectores/sectores.service';

@Component({
  selector: 'app-alta-equipos',
  templateUrl: './alta-equipos.component.html',
  styleUrls: ['./alta-equipos.component.css']
})
export class AltaEquiposComponent {
  equipoForm!: FormGroup;
  equipo!: Equipo;
  estadoEquipo!: estado_equipo[];
  tipoEquipo!: tipo_equipo[];
  puestoEquipo!: Puesto[];
  idPuesto!: number;
  establecimientos!: Establecimiento[];
  sectores!: Sector[];
  puestos!: Puesto[];
  idSector!: number;
  puesto!: Puesto;
  loading = true;
  dataReady = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private puestoService: PuestosService,
    private equipoService: EquiposService,
    private route: ActivatedRoute,

    // private textareaService: TexttareaService,
  ) { }

  ngOnInit(): void {
    this.inicializarFormulario();
    this.cargarDatos();
  }

  inicializarFormulario(): void {
    this.equipoForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      modelo: ['', Validators.required],
      marca: ['', Validators.required],
      numeroSerie: ['', Validators.required],
      descripcion: ['', Validators.required],
      idEstadoEquipo: ['', Validators.required],
      idTipoEquipo: ['', Validators.required],
      idPuesto: ['', Validators.required]
    });
  }

  cargarDatos(): void {
    this.idPuesto = Number(this.route.snapshot.params['idPuesto']);

    forkJoin([
      this.puestoService.obtenerPuestoPorId(this.idPuesto),
      this.equipoService.obtenerEstadosEquipo(),
      this.equipoService.obtenerTipoEquipo()
    ]).subscribe({
      next: ([puesto, estados, tipos]) => {
        this.puesto = puesto;
        this.estadoEquipo = estados;
        this.tipoEquipo = tipos;
        
        // Llenar el formulario con el ID del puesto
        this.equipoForm.patchValue({
          idPuesto: this.idPuesto
        });

        this.loading = false;
        this.dataReady = true;
      },
      error: (error) => {
        console.error('Error al cargar datos:', error);
        this.loading = false;
        this.router.navigate(['/puesto', this.idPuesto]);
      }
    });
  }

  altaEquipo(): void {
    if (this.equipoForm.invalid) return;

    this.equipo = this.equipoForm.value;
    this.equipoService.altaEquipo(this.equipo).subscribe({
      next: () => {
        console.log("equipo dado de alta: ",this.equipo);
        this.router.navigate(['/puesto', this.idPuesto]);
      },
      error: (error) => {
        console.error('Error al agregar equipo:', error);
      }
    });
  }

  cancelarEdicion(): void {
    this.router.navigate(['/puesto', this.idPuesto]);
  }
}