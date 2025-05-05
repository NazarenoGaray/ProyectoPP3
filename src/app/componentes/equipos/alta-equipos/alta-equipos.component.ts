import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, take } from 'rxjs';
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

  establecimientos!: Establecimiento[];
  sectores!: Sector[];
  puestos!: Puesto[];
  idSector!: number;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private establecimientoService: EstablecimientosService,
    private sectorService: SectoresService,
    private puestoService: PuestosService,
    private equipoService: EquiposService,
    private route: ActivatedRoute,

    // private textareaService: TexttareaService,
  ) { }

  ngOnInit() {
    this.equipoForm = this.formBuilder.group({
      nombre: [''],
      modelo: [''],
      marca: [''],
      numeroSerie: [''],
      descripcion: [''],
      idEstadoEquipo: ['', Validators.required],
      // puestoEquipo: ['', Validators.required],
      idEstablecimiento: [''],
      idSector: [''],
      idPuesto: [''],
      idTipoEquipo: [''],



    });
    this.obtenerEstadosEquipo();
    this.obtenerEstablecimientos();
    this.obtenerTipoEquipo();
this.route.params.pipe(
      take(1),
      switchMap(params => this.sectorService.obtenerSectorPorId(params['idSector']))
    ).subscribe(
      (sector: Sector | null) => {
        if (sector) {
          console.log("Datos obtenidos: ", sector);
          this.idSector = sector.idSector; // Asignar el idSector obtenido del parámetro de ruta
          // Guardar una copia de los valores iniciales del formulario
        } else {
          console.log("sector no encontrado");
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  obtenerTipoEquipo() {
    this.equipoService.obtenerTipoEquipo()
      .subscribe(
        (data: tipo_equipo[]) => {
          this.tipoEquipo = data;
          console.log('tipoEquipo obtenidos:', data);
        },
        error => {
          console.log('Error al obtener los tipoEquipo:', error);
        }
      );
  }



  obtenerEstadosEquipo() {
    this.equipoService.obtenerEstadosEquipo()
      .subscribe(
        (data: estado_equipo[]) => {
          this.estadoEquipo = data;
          console.log('Estados obtenidos:', data);
        },
        error => {
          console.log('Error al obtener los Estados:', error);
        }
      );
  }



  obtenerEstablecimientos() {
    this.establecimientoService.obtenerEstablecimientos()
      .subscribe(
        (data: Establecimiento[]) => {
          this.establecimientos = data;
          console.log('establecimientos obtenidos:', data);
        },
        error => {
          console.log('Error al obtener los establecimientos:', error);
        }
      );
  }



  onEstablecimientoSelected() {
    const idEstablecimiento = this.equipoForm.value.idEstablecimiento;
    this.equipoForm.get('idSector')?.setValue('');
    this.equipoForm.get('idSector')?.disable();
    this.equipoForm.get('idPuesto')?.setValue('');
    this.equipoForm.get('idPuesto')?.disable();
    this.sectores = [];

    if (idEstablecimiento) {
      this.sectorService.obtenerSectoresPorEstablecimiento(idEstablecimiento).subscribe((data: Sector[]) => {
        console.log('Sectores Obtenidos:', data);
        this.sectores = data;
        this.equipoForm.get('idSector')?.enable();
      },
        (err: any) => {
          console.log(`Error al agregar el equipo: ${err.message}`);
        });
    }
  }
  onSectorSelected() {
    const idSector = this.equipoForm.value.idSector;
    this.equipoForm.get('idPuesto')?.setValue('');
    this.equipoForm.get('idPuesto')?.disable();
    this.puestos = [];

    if (idSector) {
      this.puestoService.obtenerPuestosPorSector(idSector).subscribe((data: Puesto[]) => {
        console.log('Puestos Obtenidos:', data);
        this.puestos = data;
        this.equipoForm.get('idPuesto')?.enable();
      },
        (err: any) => {
          console.log(`Error al agregar el equipo: ${err.message}`);
        });
    }
  }





  altaEquipo() {
    if (this.equipoForm.invalid) {
      return;
    }
    this.equipo = this.equipoForm.value;
    this.equipoService.altaEquipo(this.equipo).subscribe(
      (res: any) => {
        console.log('Equipo agregado exitosamente', this.equipo);
        this.router.navigate(['/listar-equipos']);
      },
      (err: any) => {
        console.log('Equipo NO agregado', this.equipo);
        console.log(`Error al agregar el equipo: ${err.message}`);
      }
    );
  }

  //script para el campo text tarea
  // onTextareaInput(event: Event) {
  //   const textarea = event.target as HTMLTextAreaElement;
  //   this.textareaService.autoResizeTextarea(textarea);
  // }

  //funcion para cancelar el formulario
  cancelarEdicion() {
    // Restaurar el formulario a los valores originales
    this.altaEquipo();

    // Recargar la página
    window.location.reload();
  }
}
