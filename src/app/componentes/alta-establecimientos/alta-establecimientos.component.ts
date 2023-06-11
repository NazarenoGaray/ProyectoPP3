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
  paises: Pais[] = [];
  provincias: Provincia[] = [];
  localidades: Localidad[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private establecimientoService: EstablecimientosService,
    private ubicacionService: UbicacionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.establecimientoForm = this.formBuilder.group({
      nombreEstablecimiento: ['', Validators.required],
      pais: new FormControl({ value: '', disabled: false }, Validators.required),
      provincia: new FormControl({ value: '', disabled: true }, Validators.required),
      localidad: new FormControl({ value: '', disabled: true }, Validators.required),
      calle: ['', Validators.required],
      altura: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      horario_entrada: ['', Validators.required],
      horario_salida: ['', Validators.required]
    });

    this.ubicacionService.getPaises().subscribe((data: any[]) => {
      this.paises = data;
    });
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

  onSubmit(): void {
    if (this.establecimientoForm.invalid) {
      return;
    }

    this.establecimiento = this.establecimientoForm.value;
    this.establecimientoService.crearEstablecimiento(this.establecimiento).subscribe(
      (res: any) => {
        console.log('Establecimiento agregado exitosamente');
        this.router.navigate(['/listar-establecimientos']);
      },
      (err: any) => {
        console.log(`Error al agregar el establecimiento: ${err.message}`);
      }
    );
  }

}
