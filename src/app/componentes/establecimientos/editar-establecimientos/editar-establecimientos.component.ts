import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Establecimiento } from 'src/app/model/establecimientos.model';
import { Pais } from 'src/app/model/pais.model';
import { Provincia } from 'src/app/model/provincia.model';
import { Localidad } from 'src/app/model/localidad.model';
import { UbicacionService } from 'src/app/servicios/ubicacion/ubicacion.service';
import { switchMap, take } from 'rxjs';
import { EstablecimientosService } from 'src/app/servicios/establecimientos/establecimientos.service';
import { MatDialog, } from '@angular/material/dialog';
import { ConfirmAltaEstablecimientoComponent } from '../../modal/confirm-alta-establecimiento/confirm-alta-establecimiento.component';
import { ExitoAltaEstablecimientoComponent } from '../../modal/exito-alta-establecimiento/exito-alta-establecimiento.component';

@Component({
  selector: 'app-editar-establecimientos',
  templateUrl: './editar-establecimientos.component.html',
  styleUrls: ['./editar-establecimientos.component.css']
})
export class EditarEstablecimientosComponent implements OnInit {
  establecimientoForm!: FormGroup;
  establecimiento!: Establecimiento;
  establecimientoOriginal!: Establecimiento;
  idEstablecimiento!: number;
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
    private dialog: MatDialog,

  ) { }

  ngOnInit() {
    this.establecimientoForm = this.formBuilder.group({
      idEstablecimiento: ['', Validators.required],
      cuit: ['', [Validators.required, Validators.pattern('^\\d{2}-\\d{8}-\\d$')]],
      nombre: ['', Validators.required],
      calle: ['', Validators.required],
      altura: ['', Validators.required],
      idPais: [{ value: '', disabled: false }, Validators.required],
      idProvincia: [{ value: '', disabled: false }, Validators.required],
      idLocalidad: [{ value: '', disabled: false }, Validators.required],
      horaEntrada: ['', Validators.required],
      horaSalida: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      sitioweb: ['', [Validators.required,  Validators.pattern('(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)')]],
    });

    ////////////////////////////////////////////////////////
    this.ubicacionService.obtenerPaises().subscribe((data: any[]) => {
      this.paises = data;
    });
    ////////////////////////////////////////////////////////
    this.route.params.pipe(
      take(1),
      switchMap(params => this.establecimientoService.obtenerDetalleEstablecimientoPorId(params['idEstablecimiento']))
    ).subscribe(
      (establecimiento: Establecimiento | null) => {
        if (establecimiento) {
          console.log("Data esta obtenida: ", establecimiento);
          this.establecimientoForm.patchValue(establecimiento);
          this.establecimiento = this.establecimientoForm.value;
          this.establecimientoOriginal = establecimiento;// cuardamos una copia del establecimiento
          this.idEstablecimiento = establecimiento.idEstablecimiento;
          // this.establecimiento.idPais = establecimiento.idPais;
          // this.establecimiento.idProvincia = establecimiento.idProvincia;
          // this.establecimiento.idLocalidad = establecimiento.idLocalidad;
          // console.log('formularioActual:', JSON.stringify(this.establecimientoForm.value));
          // console.log('EstablecimientoOriginal:', JSON.stringify(this.establecimientoOriginal));

          // Obtener el país del establecimiento seleccionado
          if (establecimiento.idPais) {
            this.establecimientoForm.get('idPais')?.setValue(establecimiento.idPais);
          }
          // Obtener la provincia según el país seleccionado
          if (establecimiento.idPais) {
            this.ubicacionService.obtenerProvinciaPorId(establecimiento.idPais).subscribe((provincias: Provincia[]) => {
              this.provincias = provincias;
              this.establecimientoForm.get('idProvincia')?.enable();
              this.establecimientoForm.get('idProvincia')?.setValue(establecimiento.idProvincia);
            });
          }

          // Obtener la localidad según la provincia seleccionada
          if (establecimiento.idProvincia) {
            this.ubicacionService.obtenerLocalidadPorId(establecimiento.idProvincia).subscribe((localidades: Localidad[]) => {
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
    if (this.establecimientoForm.invalid) {
      return;
    }

    const establecimientoFormulario = this.establecimientoForm.value;
    this.establecimiento = this.establecimientoForm.value;


    console.log("establecimiento actualizado: ",establecimientoFormulario);

    const paisSeleccionado = this.paises.find(p => p.idPais === establecimientoFormulario.idPais);
    const provinciaSeleccionada = this.provincias.find(p => p.idProvincia === establecimientoFormulario.idProvincia);
    const localidadSeleccionada = this.localidades.find(l => l.idLocalidad === establecimientoFormulario.idLocalidad);
    
    const establecimiento = {
      ...establecimientoFormulario,
      paisDescripcion: paisSeleccionado ? paisSeleccionado.Descripcion : '',
      provinciaDescripcion: provinciaSeleccionada ? provinciaSeleccionada.Descripcion : '',
      localidadDescripcion: localidadSeleccionada ? localidadSeleccionada.Descripcion : ''
    };

    const dialogRef = this.dialog.open(ConfirmAltaEstablecimientoComponent,{
      width: '400px',
      data: { establecimiento, modo: 'edicion'}
    })
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.establecimientoService.actualizarEstablecimiento(this.idEstablecimiento, this.establecimiento).subscribe(
          (res: any) => {
            const exitoDialog = this.dialog.open(ExitoAltaEstablecimientoComponent, {
              width: '300px',
              data: { res, modo: 'edicion' }
            });
            exitoDialog.afterClosed().subscribe(() => {
              console.log('Establecimiento actualizado exitosamente', res);
              this.router.navigate(['/listar-establecimientos']);
            });
          },
          (err: any) => {
            console.log(`Error al actualizar establecimiento: ${err.message}`);
          }
        );
      }
    });
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
    //Comparar los valores actuales con los valores originales
    console.log("Actual: ",formularioActual);
    console.log("Original: ",this.establecimientoOriginal);
    return JSON.stringify(formularioActual) === JSON.stringify(this.establecimientoOriginal);
  }
  onPaisSelected() {
    const paisId = this.establecimientoForm.value.idPais;
    this.establecimientoForm.get('idProvincia')?.setValue('');
    this.establecimientoForm.get('idProvincia')?.disable();
    this.establecimientoForm.get('idLocalidad')?.setValue('');
    this.establecimientoForm.get('idLocalidad')?.disable();
    this.provincias = [];

    if (paisId) {
      this.ubicacionService.obtenerProvinciaPorId(paisId).subscribe((data: any[]) => {
        //console.log('provinciadata:',data);
        this.provincias = data;
        this.establecimientoForm.get('idProvincia')?.enable();
      },
        (err: any) => {
          console.log(`Error al agregar el usuario: ${err.message}`);
        });
    }
  }

  onProvinciaSelected() {
    const provinciaId = this.establecimientoForm.value.idProvincia;
    this.establecimientoForm.get('idLocalidad')?.setValue('');
    this.establecimientoForm.get('idLocalidad')?.disable();
    this.localidades = [];

    if (provinciaId) {
      this.ubicacionService.obtenerLocalidadPorId(provinciaId).subscribe((data: any[]) => {
        this.localidades = data;
        this.establecimientoForm.get('idLocalidad')?.enable();
      });
    }
  }
  volverAEstablecimiento(){
    this.router.navigate(['/establecimiento',`${this.idEstablecimiento}`]);
  }
}