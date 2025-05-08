import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, take } from 'rxjs';
import { Establecimiento } from 'src/app/model/establecimientos.model';
import { Sector } from 'src/app/model/sector.model';
import { EstablecimientosService } from 'src/app/servicios/establecimientos/establecimientos.service';
import { SectoresService } from 'src/app/servicios/sectores/sectores.service';

@Component({
  selector: 'app-editar-sector',
  templateUrl: './editar-sector.component.html',
  styleUrls: ['./editar-sector.component.css']
})
export class EditarSectorComponent {

  sectorForm!: FormGroup;
  sector!: Sector;

  establecimientos!: Establecimiento[];

  // Validar si hubo cambios en el formulario
  idSector!: number;
  sectorFormInicial!: Sector;
  hayCambios: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private establecimientoService: EstablecimientosService,
    private sectorService: SectoresService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    // Inicializar el formulario
    this.sectorForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      ubicacion: ['', Validators.required],
      idEstablecimiento: ['', Validators.required],
    });


    this.establecimientoService.obtenerEstablecimientos().subscribe((data: Establecimiento[]) => {
      this.establecimientos = data;
    });

    // Obtener el idSector del parámetro de ruta y asignarlo a la variable del componente
    this.route.params.pipe(
      take(1),
      switchMap(params => this.sectorService.obtenerSectorPorId(params['idSector']))
    ).subscribe(
      (sector: Sector | null) => {
        if (sector) {
          //console.log("Datos obtenidos: ", sector);
          this.sector = sector;
          this.idSector = sector.idSector; // Asignar el idSector obtenido del parámetro de ruta
          this.llenarFormulario();
          // Guardar una copia de los valores iniciales del formulario
          this.sectorFormInicial = this.sectorForm.value;
        } else {
          console.error("sector no encontrado");
        }
      },
      error => {
        console.error(error);
      }
    );

    // Verifica si hay cambios en el formulario
    this.sectorForm.valueChanges.subscribe(() => {
      this.detectarCambios();
    });
  }


  llenarFormulario() {
    // Llenar el formulario con los datos del sector obtenidos
    if (this.sector.establecimiento) {
      this.sectorForm.patchValue({
        nombre: this.sector.nombre,
        ubicacion: this.sector.ubicacion,
        idEstablecimiento: this.sector.establecimiento.idEstablecimiento, // Asignar el ID del establecimiento
      });
    }
  }

  editarSector() {
    // Obtener los valores del formulario
    const sectorFormulario = this.sectorForm.value;

    // Crear el objeto de sector con los valores del formulario y el ID del sector a editar
    this.sector = {
      ...sectorFormulario,
      idSector: this.idSector,
    };


    //console.log('Datos enviados al PHP:', this.sector);

    // Llamar al servicio para editar el sector en el backend
    this.sectorService.editarSector(this.idSector, this.sector).subscribe(
      (res: any) => {
        //console.log(`sector con ID ${this.idSector} actualizado`);
        this.router.navigate(['/sector', this.sector.idSector]);
      },
      (err: any) => {
        console.error(`Error al actualizar sector: ${err.message}`);
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
    const formularioActual = this.sectorForm.value;
    // Comparar los valores actuales con los valores originales
    return JSON.stringify(formularioActual) === JSON.stringify(this.sectorFormInicial);
  }




  //funcion para cancelar el formulario
  cancelarEdicion() {
    // Restaurar el formulario a los valores originales
    this.llenarFormulario();

    // Recargar la página
    window.location.reload();
  }


}

