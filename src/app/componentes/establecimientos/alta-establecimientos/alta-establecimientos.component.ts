import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, } from '@angular/material/dialog';

import { UbicacionService } from 'src/app/servicios/ubicacion/ubicacion.service';
import { EstablecimientosService } from 'src/app/servicios/establecimientos/establecimientos.service';
import { Establecimiento } from 'src/app/model/establecimientos.model';
import { Pais } from 'src/app/model/pais.model';
import { Provincia } from 'src/app/model/provincia.model';
import { Localidad } from 'src/app/model/localidad.model';
import { ConfirmAltaEstablecimientoComponent } from '../../modal/confirm-alta-establecimiento/confirm-alta-establecimiento.component';
import { ExitoAltaEstablecimientoComponent } from '../../modal/exito-alta-establecimiento/exito-alta-establecimiento.component';


@Component({
  selector: 'app-alta-establecimientos',
  templateUrl: './alta-establecimientos.component.html',
  styleUrls: ['./alta-establecimientos.component.css']
})
export class AltaEstablecimientosComponent implements OnInit {

  establecimientoForm!: FormGroup;
  establecimiento!: Establecimiento;
  paises!: Pais[];
  provincias!: Provincia[];
  localidades!: Localidad[];
  hayCambios: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private establecimientoService: EstablecimientosService,
    private ubicacionService: UbicacionService,
    private router: Router,
    private dialog: MatDialog,

  ) { }

  ngOnInit(): void {
    this.establecimientoForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      cuit: ['', [Validators.required, Validators.pattern('^\\d{2}-\\d{8}-\\d$')]],
      idPais: new FormControl({ value: '', disabled: false }, Validators.required),
      idProvincia: new FormControl({ value: '', disabled: true }, Validators.required),
      idLocalidad: new FormControl({ value: '', disabled: true }, Validators.required),
      calle: ['', Validators.required],
      altura: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      sitioweb: ['', [Validators.required,  Validators.pattern('https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)')]],
      horaEntrada: ['', Validators.required],
      horaSalida: ['', Validators.required],
    });
    this.establecimientoForm.valueChanges.subscribe(() => {
      this.hayCambios = this.establecimientoForm.valid;
    });
    this.ubicacionService.obtenerPaises().subscribe((data: any[]) => {
      this.paises = data;
      console.log('paisdata:',data);
    });
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
        console.log('provinciadata:',data);
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

  onSubmit(): void {
    if (this.establecimientoForm.invalid) {
      return;
    }

     // Obtener los valores seleccionados
     const formValue = this.establecimientoForm.value;
     this.establecimiento = this.establecimientoForm.value;
    //console.log("formValue.idPais: ",formValue.idPais);
    
    const paisSeleccionado = this.paises.find(p => p.idPais === formValue.idPais);
    const provinciaSeleccionada = this.provincias.find(p => p.idProvincia === formValue.idProvincia);
    const localidadSeleccionada = this.localidades.find(l => l.idLocalidad === formValue.idLocalidad);
    
    const establecimiento = {
      ...formValue,
      paisDescripcion: paisSeleccionado ? paisSeleccionado.Descripcion : '',
      provinciaDescripcion: provinciaSeleccionada ? provinciaSeleccionada.Descripcion : '',
      localidadDescripcion: localidadSeleccionada ? localidadSeleccionada.Descripcion : ''
    };

    //console.log("establecimiento: ",establecimiento);
    console.log("this.establecimiento: ",this.establecimiento);

    const dialogRef = this.dialog.open(ConfirmAltaEstablecimientoComponent,{
      width: '400px',
      data: { establecimiento, modo: 'alta'}
    })

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.establecimientoService.crearEstablecimiento(this.establecimiento).subscribe(
          (res: any) => {
            const exitoDialog = this.dialog.open(ExitoAltaEstablecimientoComponent, {
              width: '300px',
              data: { res, modo: 'alta' }
            });
            exitoDialog.afterClosed().subscribe(() => {
              console.log('Establecimiento agregado exitosamente', res);
              this.router.navigate(['/listar-establecimientos']);
            });
          },
          (err: any) => {
            console.log(`Error al agregar el establecimiento: ${err.message}`);
          }
        );
      }
    });
  }
  
}
