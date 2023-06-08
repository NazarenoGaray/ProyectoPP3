import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Establecimiento } from '../../model/establecimientos.model';
import { EstablecimientosService } from 'src/app/servicios/Establecimientos/establecimientos.service';
import { Pais } from 'src/app/model/pais.model';
import { Provincia } from 'src/app/model/provincia.model';
import { Localidad } from 'src/app/model/localidad.model';
import { UbicacionService } from 'src/app/servicios/ubicacion/ubicacion.service';
import { switchMap, take } from 'rxjs';

@Component({
  selector: 'app-editar-establecimientos',
  templateUrl: './editar-establecimientos.component.html',
  styleUrls: ['./editar-establecimientos.component.css']
})
export class EditarEstablecimientosComponent implements OnInit {
  establecimientoForm!: FormGroup;
  establecimiento!: Establecimiento;
  establecimientoOriginal!: Establecimiento;
  id_establecimiento!: number;
  paises: Pais[] = [];
  provincias: Provincia[] = [];
  localidades: Localidad[] = [];
  hayCambios: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private establecimientoService: EstablecimientosService,
    private router: Router,
    private route: ActivatedRoute,
    private ubicacionService: UbicacionService,

  ) { }

  ngOnInit() {
    this.establecimientoForm = this.formBuilder.group({
      nombreEstablecimiento: ['', Validators.required],
      calle: ['', Validators.required],
      altura: ['', Validators.required],
      localidad: new FormControl({ value: '', disabled: true }, Validators.required),
      provincia: new FormControl({ value: '', disabled: true }, Validators.required),
      pais: new FormControl({ value: '', disabled: false }, Validators.required),
      telefono: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      horario_entrada: ['', Validators.required],
      horario_salida: ['', Validators.required]
    });
    /////////////////////////////////////////////
    //obtener Paises
    this.ubicacionService.getPaises().subscribe((data: any[]) => {
      this.paises = data;
    });
    /////////////////////////////////////////////
    // const idParam = this.route.snapshot.paramMap.get('id');
    // this.id_establecimiento = idParam ? +idParam : 0;
    this.route.params.pipe(
      take(1),
      switchMap(params => this.establecimientoService.obtenerEstablecimientoPorId(params['id']))
    ).subscribe(
      (establecimiento: Establecimiento | null) => {
        if (establecimiento) {
          console.log("Data obtenida: ", establecimiento);

          this.establecimientoForm.patchValue(establecimiento);
          this.id_establecimiento = establecimiento.idEstablecimiento;
          this.establecimiento = establecimiento;
          this.establecimientoOriginal = { ...establecimiento };// cuardamos una copia del establecimiento
          this.establecimiento.IDPais = establecimiento.IDPais;
          this.establecimiento.IDProvincia = establecimiento.IDProvincia;
          this.establecimiento.IDLocalidad = establecimiento.IDLocalidad;
          // Obtener el país del establecimiento seleccionado
          if (establecimiento.IDPais) {
            this.establecimientoForm.get('IDPais')?.setValue(establecimiento.IDPais);
          }
          // Obtener la provincia según el país seleccionado
          if (establecimiento.IDPais) {
            this.ubicacionService.getProvincias(establecimiento.IDPais).subscribe((provincias: Provincia[]) => {
              this.provincias = provincias;
              this.establecimientoForm.get('IDProvincia')?.enable();
              this.establecimientoForm.get('IDProvincia')?.setValue(establecimiento.IDProvincia);
            });
          }

          // Obtener la localidad según la provincia seleccionada
          if (establecimiento.IDProvincia) {
            this.ubicacionService.getLocalidades(establecimiento.IDProvincia).subscribe((localidades: Localidad[]) => {
              this.localidades = localidades;
              this.establecimientoForm.get('IDLocalidad')?.enable();
              this.establecimientoForm.get('IDLocalidad')?.setValue(establecimiento.IDLocalidad);
            });
          }
        } else {
          console.log("establecimiento no encontrado");
        }
      },
      error => {
        console.log(error);
      }
    );
    this.establecimientoForm.valueChanges.subscribe(() => {
      this.detectarCambios();
    });
    // if (this.id_establecimiento) {
    //   this.establecimientoService
    //     .obtenerEstablecimientoPorId(this.id_establecimiento)
    //     .subscribe(
    //       (establecimiento: Establecimiento) => {
    //         console.log('Establecimiento recuperado:', establecimiento);
    //         this.establecimientoForm.patchValue(establecimiento);
    //       },
    //       (error: any) => {
    //         console.error('Error al recuperar el establecimiento:', error);
    //       }
    //     );
    // }
  }

  // onSubmit() {
  //   if (this.establecimientoForm.valid) {
  //     const datosEstablecimiento = this.establecimientoForm.value;

  //     // Agrega el ID del establecimiento a los datos modificados
  //     datosEstablecimiento.idEstablecimiento = this.id_establecimiento;

  //     this.establecimientoService
  //       .editarEstablecimiento(this.id_establecimiento, datosEstablecimiento)
  //       .subscribe(
  //         (respuesta: any) => {
  //           // Éxito al editar el establecimiento
  //         },
  //         (error: any) => {
  //           // Manejo de errores
  //         }
  //       );
  //   }

  //   this.detectarCambios();
  //   this.hayCambios = false;
  // }
  
  actualizarEstablecimiento() {
    const establecimientoFormulario = this.establecimientoForm.value;
    this.establecimiento = {
      ...establecimientoFormulario,
      id_establecimiento: this.id_establecimiento
    };
    this.establecimientoService.editarEstablecimiento(this.id_establecimiento, this.establecimiento).subscribe(
      (res: any) => {
        console.log(`establecimiento con ID ${this.id_establecimiento} actualizado`);
        this.router.navigate(['/listar-establecimientos']);
      },
      (err: any) => {
        console.log(`Error al actualizar establecimiento: ${err.message}`);
      }
    );
    this.detectarCambios();
    this.hayCambios = false;
  }
  onPaisSelected() {
    const paisId = this.establecimientoForm.value.IDPais;
    this.establecimientoForm.get('IDProvincia')?.setValue('');
    this.establecimientoForm.get('IDProvincia')?.enable();
    this.establecimientoForm.get('IDLocalidad')?.setValue('');
    this.establecimientoForm.get('IDLocalidad')?.disable();

    this.provincias = [];

    if (paisId) {
      this.ubicacionService.getProvincias(paisId).subscribe((data: any[]) => {
        this.provincias = data;
        this.establecimientoForm.get('IDLocalidad')?.disable();
      });
    }
  }

  onProvinciaSelected() {
    const provinciaId = this.establecimientoForm.value.IDProvincia;
    this.establecimientoForm.get('IDLocalidad')?.setValue('');
    this.establecimientoForm.get('IDLocalidad')?.disable();
    this.localidades = [];

    if (provinciaId) {
      this.ubicacionService.getLocalidades(provinciaId).subscribe((data: any[]) => {
        this.localidades = data;
        this.establecimientoForm.get('IDLocalidad')?.enable();
      });
    }
  }
  detectarCambios(): void {
    this.hayCambios = !this.sonDatosIguales();
  }

  sonDatosIguales(): boolean {
    // Obtener los valores actuales del formulario
    const formularioActual = this.establecimientoForm.value;
    console.log('formularioActual:', JSON.stringify(this.establecimientoForm.value));
    console.log('establecimientoOriginal:', JSON.stringify(this.establecimientoOriginal));
    // Comparar los valores actuales con los valores originales
    return JSON.stringify(formularioActual) === JSON.stringify(this.establecimientoOriginal);
  }


}
