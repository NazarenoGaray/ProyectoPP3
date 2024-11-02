import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, take } from 'rxjs';
import { Establecimiento } from 'src/app/model/establecimientos.model';
import { Puesto } from 'src/app/model/puesto.model';
import { EstablecimientosService } from 'src/app/servicios/establecimientos/establecimientos.service';
import { PuestosService } from 'src/app/servicios/puestos/puestos.service';

@Component({
  selector: 'app-editar-puesto',
  templateUrl: './editar-puesto.component.html',
  styleUrls: ['./editar-puesto.component.css']
})
export class EditarPuestoComponent {
  puestoForm!: FormGroup;
  puesto!: Puesto;

  establecimientos!: Establecimiento[];

  // Validar si hubo cambios en el formulario
  idPuesto!: number;
  puestoFormInicial!: Puesto;
  hayCambios: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private establecimientoService: EstablecimientosService,
    private puestoService: PuestosService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    // Inicializar el formulario
    this.puestoForm = this.formBuilder.group({
      puestoRed: ['', Validators.required],
      telefono: ['', Validators.required],
      descripcion: ['', Validators.required],
      idEstablecimiento: ['', Validators.required],
      idSector: ['', Validators.required],
    });


    this.establecimientoService.obtenerEstablecimientos().subscribe((data: Establecimiento[]) => {
      this.establecimientos = data;
    });

    // Obtener el idSector del parámetro de ruta y asignarlo a la variable del componente
    this.route.params.pipe(
      take(1),
      switchMap(params => this.puestoService.obtenerPuestoPorId(params['idPuesto']))
    ).subscribe(
      (puesto: Puesto | null) => {
        if (puesto) {
          console.log("Datos obtenidos: ", puesto);
          this.puesto = puesto;
          this.idPuesto = puesto.puesto.idPuesto; // Asignar el idPuesto obtenido del parámetro de ruta
          this.llenarFormulario();
          // Guardar una copia de los valores iniciales del formulario
          this.puestoFormInicial = this.puestoForm.value;
        } else {
          console.log("puesto no encontrado");
        }
      },
      error => {
        console.log(error);
      }
    );

    // Verifica si hay cambios en el formulario
    this.puestoForm.valueChanges.subscribe(() => {
      this.detectarCambios();
    });
  }



  llenarFormulario() {
    // Llenar el formulario con los datos del sector obtenidos
    if (this.puesto) {
      this.puestoForm.patchValue({
        puestoRed: this.puesto.puestoRed,
        descripcion: this.puesto.descripcion,
        telefono: this.puesto.telefono,
        idEstablecimiento: this.puesto.idEstablecimiento, // Asignar el ID del establecimiento
      });
    }
  }


  editarPuesto() {
    // Obtener los valores del formulario
    const puestoFormulario = this.puestoForm.value;

    // Crear el objeto de puesto con los valores del formulario y el ID del puesto a editar
    this.puesto = {
      ...puestoFormulario,
      idPuesto: this.idPuesto,
    };


    console.log('Datos enviados al PHP:', this.puesto);

    // Llamar al servicio para editar el Puesto en el backend
    this.puestoService.editarPuesto(this.idPuesto, this.puesto).subscribe(
      (res: any) => {
        console.log(`puesto con ID ${this.idPuesto} actualizado`);
        this.router.navigate(['/puesto', this.puesto.idPuesto]);
      },
      (err: any) => {
        console.log(`Error al actualizar puesto: ${err.message}`);
      }
    );

    // Detectar cambios y resetear el estado de los cambios
    this.detectarCambios();
    this.hayCambios = false;
  }

  // Verificar si hay cambios en el formulario
  detectarCambios(): void {
    this.hayCambios = !this.sonDatosIguales();
  }

  sonDatosIguales(): boolean {
    // Obtener los valores actuales del formulario
    const formularioActual = this.puestoForm.value;
    // Comparar los valores actuales con los valores originales
    return JSON.stringify(formularioActual) === JSON.stringify(this.puestoFormInicial);
  }




  //funcion para cancelar el formulario
  cancelarEdicion() {
    // Restaurar el formulario a los valores originales
    this.llenarFormulario();

    // Recargar la página
    window.location.reload();
  }


}