import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Establecimiento } from '../../model/establecimientos.model';
import { Pais } from 'src/app/model/pais.model';
import { Provincia } from 'src/app/model/provincia.model';
import { Localidad } from 'src/app/model/localidad.model';
import { UbicacionService } from 'src/app/servicios/ubicacion/ubicacion.service';
import { switchMap, take } from 'rxjs';
import { EstablecimientosService } from 'src/app/servicios/establecimientos/establecimientos.service';

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
      nombre: ['', Validators.required],
      calle: ['', Validators.required],
      altura: ['', Validators.required],
      idPais: [{ value: '', disabled: false }, Validators.required],
      idProvincia: [{ value: '', disabled: false }, Validators.required],
      idLocalidad: [{ value: '', disabled: false }, Validators.required],
      telefono: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      horaEntrada: ['', Validators.required],
      horaSalida: ['', Validators.required],
    });
     
    ////////////////////////////////////////////////////////
    this.ubicacionService.getPaises().subscribe((data: any[]) => {
      this.paises = data;
    });
    ////////////////////////////////////////////////////////
    this.route.params.pipe(
      take(1),
      switchMap(params => this.establecimientoService.obtenerEstablecimientoPorId(params['idEstablecimiento']))
    ).subscribe(
      (establecimiento: Establecimiento | null) => {
        if (establecimiento) {
          console.log("Data esta obtenida: ", establecimiento);
          this.establecimientoForm.patchValue(establecimiento);
          this.establecimiento = establecimiento;
          this.establecimientoOriginal = establecimiento;// cuardamos una copia del establecimiento
          this.idEstablecimiento = establecimiento.idEstablecimiento;
          this.establecimiento.idPais = establecimiento.idPais;
          this.establecimiento.idProvincia = establecimiento.idProvincia;
          this.establecimiento.idLocalidad = establecimiento.idLocalidad;
         
          // Obtener el país del establecimiento seleccionado
          if (establecimiento.idPais) {
            this.establecimientoForm.get('idPais')?.setValue(establecimiento.idPais);
          }
          // Obtener la provincia según el país seleccionado
          if (establecimiento.idPais) {
            this.ubicacionService.getProvincias(establecimiento.idPais).subscribe((provincias: Provincia[]) => {
              this.provincias = provincias;
              this.establecimientoForm.get('idProvincia')?.enable();
              this.establecimientoForm.get('idProvincia')?.setValue(establecimiento.idProvincia);
            });
          }

          // Obtener la localidad según la provincia seleccionada
          if (establecimiento.idProvincia) {
            this.ubicacionService.getLocalidades(establecimiento.idProvincia).subscribe((localidades: Localidad[]) => {
              this.localidades = localidades;
              this.establecimientoForm.get('idLocalidad')?.enable();
              this.establecimientoForm.get('idLocalidad')?.setValue(establecimiento.idLocalidad);
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
      idEstablecimiento: this.idEstablecimiento
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
    // console.log("establecimiento original:",this.establecimientoOriginal);
    // console.log("establecimiento actual:",this.establecimiento);
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
    console.log('formularioActual:', JSON.stringify(this.establecimientoForm.value));
    console.log('usuarioOriginal:', JSON.stringify(this.establecimiento));
    //Comparar los valores actuales con los valores originales
    return JSON.stringify(formularioActual) === JSON.stringify(this.establecimientoOriginal);
  }
  onPaisSelected() {
    const paisId = this.establecimientoForm.value.pais;
    this.establecimientoForm.get('idProvincia')?.setValue('');
    this.establecimientoForm.get('idProvincia')?.disable();
    this.establecimientoForm.get('idLocalidad')?.setValue('');
    this.establecimientoForm.get('idLocalidad')?.disable();
    this.provincias = [];



    if (paisId) {
      this.ubicacionService.getProvincias(paisId).subscribe((data: any[]) => {
        this.provincias = data;
        
        this.establecimientoForm.get('idProvincia')?.enable();
      });
    }
  }

  onProvinciaSelected() {
    const provinciaId = this.establecimientoForm.value.provincia;
    this.establecimientoForm.get('idLocalidad')?.setValue('');
    this.establecimientoForm.get('idLocalidad')?.disable();
    this.localidades = [];

    if (provinciaId) {
      this.ubicacionService.getLocalidades(provinciaId).subscribe((data: any[]) => {
        this.localidades = data;
        this.establecimientoForm.get('idLocalidad')?.enable();
      });
    }
  }
  getId(){
    return this.idEstablecimiento;
  }