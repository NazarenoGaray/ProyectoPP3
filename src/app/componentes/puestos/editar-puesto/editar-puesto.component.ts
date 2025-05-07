import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, take } from 'rxjs';
import { Establecimiento } from 'src/app/model/establecimientos.model';
import { Puesto } from 'src/app/model/puesto.model';
import { Sector } from 'src/app/model/sector.model';
import { EstablecimientosService } from 'src/app/servicios/establecimientos/establecimientos.service';
import { PuestosService } from 'src/app/servicios/puestos/puestos.service';

@Component({
  selector: 'app-editar-puesto',
  templateUrl: './editar-puesto.component.html',
  styleUrls: ['./editar-puesto.component.css']
})
export class EditarPuestoComponent implements OnInit {
  puestoForm!: FormGroup;
  puesto!: Puesto;
  sector!: Sector;
  idPuesto!: number;
  hayCambios = false;
  private puestoFormInicial: any;
  loading:boolean = true;
  
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private puestoService: PuestosService
  ) { }

  ngOnInit(): void {
    this.inicializarFormulario();
    this.cargarPuesto();
  }

  inicializarFormulario(): void {
    this.puestoForm = this.fb.group({
      puestoRed: ['', Validators.required],
      telefono: ['', Validators.required],
      descripcion: ['', Validators.required],
      idSector: ['']
    });

    // Escuchar cambios en el formulario
    this.puestoForm.valueChanges.subscribe(() => {
      this.detectarCambios();
    });
  }

  cargarPuesto(): void {
    this.route.params.pipe(
      take(1),
      switchMap(params => {
        this.idPuesto = params['idPuesto'];
        return this.puestoService.obtenerPuestoPorId(this.idPuesto);
      })
    ).subscribe({
      next: (puesto: Puesto) => {
        this.puesto = puesto;
        console.log("puesto a editr: ",puesto);
        this.llenarFormulario();
        // Guardar estado inicial del formulario
        this.puestoFormInicial = this.puestoForm.value;
      },
      error: (error) => {
        console.error('Error al cargar puesto:', error);
        this.router.navigate(['/puesto', this.idPuesto]);
      }
    });
  }

  llenarFormulario(): void {
    this.puestoForm.patchValue({
      puestoRed: this.puesto.puestoRed,
      telefono: this.puesto.telefono,
      descripcion: this.puesto.descripcion,
      idSector: this.puesto.idSector
    });
    this.loading = false;
  }

  editarPuesto(): void {
    if (this.puestoForm.invalid || !this.hayCambios) return;

    const datosActualizados = {
      ...this.puestoForm.value,
      idPuesto: this.idPuesto
    };

    this.puestoService.editarPuesto(this.idPuesto, datosActualizados).subscribe({
      next: () => {
        this.router.navigate(['/puesto', this.idPuesto]);
      },
      error: (error) => {
        console.error('Error al actualizar puesto:', error);
      }
    });
  }

  detectarCambios(): void {
    this.hayCambios = JSON.stringify(this.puestoForm.value) !== JSON.stringify(this.puestoFormInicial);
  }

  cancelarEdicion(): void {
    if (this.hayCambios && !confirm('¿Desea descartar los cambios realizados?')) {
      return;
    }
    this.router.navigate(['/puesto', this.idPuesto]);
  }
}