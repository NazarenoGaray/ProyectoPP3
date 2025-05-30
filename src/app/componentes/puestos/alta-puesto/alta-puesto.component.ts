import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, take } from 'rxjs';
import { Puesto } from 'src/app/model/puesto.model';
import { Sector } from 'src/app/model/sector.model';
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
  sector!: Sector;
  keyword = 'nombre';
  idSector!: number;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private sectorService: SectoresService,
    private puestoService: PuestosService,
    private route: ActivatedRoute,

  ) { }

  ngOnInit() {
    this.puestoForm = this.formBuilder.group({
      puestoRed: [''],
      telefono: [''],
      descripcion: [''],
      idSector: [''],
    });

    // this.obtenerEstablecimientos();

    this.route.params.pipe(take(1)).subscribe(params => {
      this.idSector = +params['idSector'];
      
      // Cargar los datos del sector
      this.sectorService.obtenerSectorPorId(this.idSector).subscribe(
        (sector: Sector) => {
          this.sector = sector;
          // Asignar el idSector al formulario (oculto)
          this.puestoForm.patchValue({ idSector: this.idSector });
        },
        (error) => {
          console.error('Error al cargar el sector:', error);
        }
      );
    });
  }

  // obtenerEstablecimientos() {
  //   this.establecimientoService.obtenerEstablecimientos().subscribe(
  //     (data: Establecimiento[]) => {
  //       this.establecimientos = data;
  //       console.log('Establecimientos obtenidos:', data);
  //     },
  //     error => {
  //       console.log('Error al obtener los establecimientos:', error);
  //     }
  //   );
  // }

  // onEstablecimientoSelect(event: any) {
  //   const idEstablecimiento = event.idEstablecimiento;

  //   if (idEstablecimiento) {
  //     this.sectorService.obtenerSectoresPorEstablecimiento(idEstablecimiento).subscribe(
  //       (data: Sector[]) => {
  //         console.log('Sectores Obtenidos:', data);
  //         this.sectores = data;
  //         this.puestoForm.get('idSector')?.enable();
  //         this.puestoForm.get('idSector')?.setValue(''); // Limpiar el valor seleccionado
  //       },
  //       (err: any) => {
  //         console.log(`Error al obtener los sectores: ${err.message}`);
  //       }
  //     );
  //   }
  // }

  altaPuesto() {
    if (this.puestoForm.invalid) {
      return;
    }

    this.puesto = this.puestoForm.value;

    this.puestoService.altaPuesto(this.puesto).subscribe(
      (res: any) => {
        console.log('puesto agregado exitosamente', this.puesto);
        this.router.navigate(['/sector', this.idSector]);
      },
      (err: any) => {
        console.log('puesto NO agregado', this.puesto);
        console.error(`Error al agregar el puesto: ${err.message}`);
      }
    );
  }

  cancelarEdicion() {
    // Restaurar el formulario a los valores originales
    this.router.navigate(['/sector', this.idSector]);
  }
}
