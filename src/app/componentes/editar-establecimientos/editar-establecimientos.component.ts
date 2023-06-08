import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  idEstablecimiento!: number;
  establecimiento!: Establecimiento;
  establecimientoOriginal!: Establecimiento;
  paises: Pais[] = [];
  provincias: Provincia[] = [];
  localidades: Localidad[] = [];
  hayCambios: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private establecimientoService: EstablecimientosService,
    private route: ActivatedRoute,
    private router: Router,
    private ubicacionService: UbicacionService,
  ) { }

  ngOnInit() {
    this.establecimientoForm = this.formBuilder.group({
      nombreEstablecimiento: ['', Validators.required],
      calle: ['', Validators.required],
      altura: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      horario_entrada: ['', Validators.required],
      horario_salida: ['', Validators.required],
      IDPais: [{ value: '', disabled: false }, Validators.required],
      IDProvincia: [{ value: '', disabled: false }, Validators.required],
      IDLocalidad: [{ value: '', disabled: false }, Validators.required],
    });
     
    ////////////////////////////////////////////////////////
    this.ubicacionService.getPaises().subscribe((data: any[]) => {
      this.paises = data;
    });
    ////////////////////////////////////////////////////////
    this.route.params.pipe(
      take(1),
      switchMap(params => this.establecimientoService.obtenerEstablecimientoPorId(params['id']))
    ).subscribe(
      (establecimiento: Establecimiento | null) => {
        if (establecimiento) {
          console.log("Data esta obtenida: ", establecimiento);

          this.establecimientoForm.patchValue(establecimiento);
          this.idEstablecimiento = establecimiento.idEstablecimiento;
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
              console.log("esto tiene IDLocalidad:",this.establecimientoForm.value);
              this.establecimientoForm.get('IDLocalidad')?.setValue(establecimiento.IDLocalidad);
            });
          }
          
        } else {
          console.log("Usuario no encontrado");
        }
      },
      error => {
        console.log(error);
      }
    );
    ////////////////////////////////////////////////////////////////verificando cambios
    this.establecimientoForm.valueChanges.subscribe(() => {
      this.detectarCambios();
    });
    ////////////////////////////////////////////////////////

  }

  actualizarEstablecimiento() {
    const establecimientoFormulario = this.establecimientoForm.value;
    this.establecimiento = {
      ...establecimientoFormulario,
      idestablecimiento: this.idEstablecimiento
    };
    this.establecimientoService.actualizarEstablecimiento(this.idEstablecimiento, this.establecimiento).subscribe(
      (res: any) => {
        console.log(`establecimiento con ID ${this.idEstablecimiento} actualizado`);
        this.router.navigate(['/listar-establecimientos']);
      },
      (err: any) => {
        console.log(`Error al actualizar establecimiento: ${err.message}`);
      }
    );
    this.detectarCambios();
    this.hayCambios = false;
  }
  //////////////////////////////////////////////////////////////////////////////////////////

  detectarCambios(): void {
    this.hayCambios = !this.sonDatosIguales();
  }
  sonDatosIguales(): boolean {
    // Obtener los valores actuales del formulario
    const formularioActual = this.establecimientoForm.value;
    //console.log('formularioActual:', JSON.stringify(this.usuarioForm.value));
    //console.log('usuarioOriginal:', JSON.stringify(this.usuarioOriginal));
    // Comparar los valores actuales con los valores originales
    return JSON.stringify(formularioActual) === JSON.stringify(this.establecimientoOriginal);
  }
  onPaisSelected() {
    const paisId = this.establecimientoForm.value.pais;
    this.establecimientoForm.get('provincia')?.setValue('');
    this.establecimientoForm.get('provincia')?.disable();
    this.establecimientoForm.get('localidad')?.setValue('');
    this.establecimientoForm.get('localidad')?.disable();
    this.provincias = [];



    if (paisId) {
      this.ubicacionService.getProvincias(paisId).subscribe((data: any[]) => {
        this.provincias = data;
        
        this.establecimientoForm.get('provincia')?.enable();
      });
    }
  }

  onProvinciaSelected() {
    const provinciaId = this.establecimientoForm.value.provincia;
    this.establecimientoForm.get('localidad')?.setValue('');
    this.establecimientoForm.get('localidad')?.disable();
    this.localidades = [];

    if (provinciaId) {
      this.ubicacionService.getLocalidades(provinciaId).subscribe((data: any[]) => {
        this.localidades = data;
        this.establecimientoForm.get('localidad')?.enable();
      });
    }
  }
}