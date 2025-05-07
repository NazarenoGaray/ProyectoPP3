import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Equipo } from 'src/app/model/equipo.model';
import { Establecimiento } from 'src/app/model/establecimientos.model';
import { estado_equipo } from 'src/app/model/estado_equipo.model';
import { Puesto } from 'src/app/model/puesto.model';
import { Sector } from 'src/app/model/sector.model';
import { tipo_equipo } from 'src/app/model/tipo_equipo.model';
import { EquiposService } from 'src/app/servicios/equipos/equipos.service';
import { PuestosService } from 'src/app/servicios/puestos/puestos.service';

@Component({
  selector: 'app-editar-equipos',
  templateUrl: './editar-equipos.component.html',
  styleUrls: ['./editar-equipos.component.css']
})
export class EditarEquiposComponent implements OnInit {
  equipoForm!: FormGroup;
  equipo!: Equipo;
  estadoEquipo!: estado_equipo[];
  tipoEquipo!: tipo_equipo[];
  puestoEquipo!: Puesto[];
  idEquipo!: number;
  establecimientos!: Establecimiento[];
  sectores!: Sector[];
  puestos!: Puesto[];
  puesto!: Puesto;
  loading = true;
  dataReady = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private puestoService: PuestosService,
    private equipoService: EquiposService,
    private route: ActivatedRoute
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
    this.idEquipo = Number(this.route.snapshot.params['idEquipo']);

    forkJoin([
      this.equipoService.obtenerEquipoPorId(this.idEquipo),
      this.equipoService.obtenerEstadosEquipo(),
      this.equipoService.obtenerTipoEquipo(),
      this.puestoService.obtenerPuestoPorId(this.idEquipo) // Obtener puesto si es necesario
    ]).subscribe({
      next: ([equipo, estados, tipos, puesto]) => {
        this.equipo = equipo;
        this.estadoEquipo = estados;
        this.tipoEquipo = tipos;
        this.puesto = puesto;
               
        // Llenar el formulario con los datos del equipo
        this.equipoForm.patchValue({
          nombre: equipo.nombre,
          modelo: equipo.modelo,
          marca: equipo.marca,
          numeroSerie: equipo.numeroSerie,
          descripcion: equipo.descripcion,
          idEstadoEquipo: equipo.estadoEquipo,
          idTipoEquipo: equipo.tipoEquipo,
          idPuesto: equipo.idPuesto
        });

        this.loading = false;
        this.dataReady = true;
      },
      error: (error) => {
        console.error('Error al cargar datos:', error);
        this.loading = false;
        this.router.navigate(['/equipo', this.idEquipo || '']);
      }
    });
  }

  editarEquipo(): void {
    if (this.equipoForm.invalid) return;

    const equipoActualizado: Equipo = {
      ...this.equipo,
      ...this.equipoForm.value
    };

    this.equipoService.editarEquipo(this.idEquipo, equipoActualizado).subscribe({
      next: () => {
        this.router.navigate(['/equipo', this.idEquipo]);
      },
      error: (error) => {
        console.error('Error al editar equipo:', error);
      }
    });
  }

  cancelarEdicion(): void {
    this.router.navigate(['/equipo', this.idEquipo || '']);
  }
}
