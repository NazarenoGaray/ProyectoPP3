import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, take } from 'rxjs';
import { Establecimiento } from 'src/app/model/establecimientos.model';
import { Puesto } from 'src/app/model/puesto.model';
import { Sector } from 'src/app/model/sector.model';
import { EstablecimientosService } from 'src/app/servicios/establecimientos/establecimientos.service';
import { PuestosService } from 'src/app/servicios/puestos/puestos.service';
import { SectoresService } from 'src/app/servicios/sectores/sectores.service';

@Component({
  selector: 'app-alta-puesto',
  templateUrl: './alta-puesto.component.html',
  styleUrls: ['./alta-puesto.component.css']
})
export class AltaPuestoComponent {

  puestoForm!: FormGroup;
  puesto!: Puesto;
  establecimientos!: Establecimiento[];
  sectores!: Sector[];
  keyword = 'nombre';
  idSector!: number;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private establecimientoService: EstablecimientosService,
    private sectorService: SectoresService,
    private puestoService: PuestosService,
    private route: ActivatedRoute,
    
  ) { }

  ngOnInit() {
    this.puestoForm = this.formBuilder.group({
      puestoRed: [''],
      telefono: [''],
      descripcion: [''],
      idEstablecimiento: ['', Validators.required],
      idSector: ['', Validators.required],
    });
    this.obtenerEstablecimientos();
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

  obtenerEstablecimientos() {
    this.establecimientoService.obtenerEstablecimientos().subscribe(
      (data: Establecimiento[]) => {
        this.establecimientos = data;
        console.log('Establecimientos obtenidos:', data);
      },
      error => {
        console.log('Error al obtener los establecimientos:', error);
      }
    );
  }

  onEstablecimientoSelect(event: any) {
    const idEstablecimiento = event.idEstablecimiento;

    if (idEstablecimiento) {
      this.sectorService.obtenerSectoresPorEstablecimiento(idEstablecimiento).subscribe(
        (data: Sector[]) => {
          console.log('Sectores Obtenidos:', data);
          this.sectores = data;
          this.puestoForm.get('idSector')?.enable();
          this.puestoForm.get('idSector')?.setValue(''); // Limpiar el valor seleccionado
        },
        (err: any) => {
          console.log(`Error al obtener los sectores: ${err.message}`);
        }
      );
    }
  }

  altaPuesto() {
    if (this.puestoForm.invalid) {
      return;
    }

    this.puesto = this.puestoForm.value;

    this.puestoService.altaPuesto(this.puesto).subscribe(
      (res: any) => {
        console.log('puesto agregado exitosamente', this.puesto);
        this.router.navigate(['/sector', this.puesto.idSector]);
      },
      (err: any) => {
        console.log('puesto NO agregado', this.puesto);
        console.log(`Error al agregar el puesto: ${err.message}`);
      }
    );
  }
  
  cancelarEdicion() {
    // Restaurar el formulario a los valores originales
    this.puestoForm.reset();
  }
}
