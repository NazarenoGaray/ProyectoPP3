import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Establecimiento } from '../../model/establecimientos.model';
import { Pais } from '../../model/pais.model';
import { Provincia } from '../../model/provincia.model';
import { Localidad } from '../../model/localidad.model';
import { UbicacionService } from 'src/app/servicios/ubicacion/ubicacion.service';
import { EstablecimientosService } from 'src/app/servicios/establecimientos/establecimientos.service';

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
  ) { }

  ngOnInit(): void {
    this.establecimientoForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      // idPais: new FormControl({ value: '', disabled: false }, Validators.required),
      // idProvincia: new FormControl({ value: '', disabled: true }, Validators.required),
      // idLocalidad: new FormControl({ value: '', disabled: true }, Validators.required),
      calle: ['', Validators.required],
      altura: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
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

    this.establecimiento = this.establecimientoForm.value;
    this.establecimientoService.crearEstablecimiento(this.establecimiento).subscribe(
      (res: any) => {
        console.log('Establecimiento agregado exitosamente', res);
        this.router.navigate(['/listar-establecimientos']);
      },
      (err: any) => {
        console.log(`Error al agregar el establecimiento: ${err.message}`);
      }
    );
  }
  
}
