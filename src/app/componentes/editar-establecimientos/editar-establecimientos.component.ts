import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Establecimiento } from '../model/establecimientos.model';
import { EstablecimientosService } from 'src/app/servicios/Establecimientos/establecimientos.service';

@Component({
  selector: 'app-editar-establecimientos',
  templateUrl: './editar-establecimientos.component.html',
  styleUrls: ['./editar-establecimientos.component.css']
})
export class EditarEstablecimientosComponent implements OnInit {
  establecimientoForm!: FormGroup;
  establecimientoId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private establecimientoService: EstablecimientosService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.establecimientoForm = this.formBuilder.group({
      nombreEstablecimiento: ['', Validators.required],
      calle: ['', Validators.required],
      altura: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      horario_entrada: ['', Validators.required],
      horario_salida: ['', Validators.required]
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    this.establecimientoId = idParam ? +idParam : 0;

    if (this.establecimientoId) {
      this.establecimientoService
        .obtenerEstablecimientoPorId(this.establecimientoId)
        .subscribe(
          (establecimiento: Establecimiento) => {
            console.log('Establecimiento recuperado:', establecimiento);
            this.establecimientoForm.patchValue(establecimiento);
          },
          (error: any) => {
            console.error('Error al recuperar el establecimiento:', error);
          }
        );
    }
  }

  onSubmit() {
    if (this.establecimientoForm.valid) {
      const datosEstablecimiento = this.establecimientoForm.value;

      // Agrega el ID del establecimiento a los datos modificados
      datosEstablecimiento.idEstablecimiento = this.establecimientoId;

      this.establecimientoService
        .editarEstablecimiento(this.establecimientoId, datosEstablecimiento)
        .subscribe(
          (respuesta: any) => {
            // Éxito al editar el establecimiento
          },
          (error: any) => {
            // Manejo de errores
          }
        );
    }
  }
}
