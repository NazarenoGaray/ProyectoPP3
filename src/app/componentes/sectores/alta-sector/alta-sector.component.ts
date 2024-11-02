import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SectoresService } from 'src/app/servicios/sectores/sectores.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Sector } from 'src/app/model/sector.model';
import { EstablecimientosService } from 'src/app/servicios/establecimientos/establecimientos.service';
import { Establecimiento } from 'src/app/model/establecimientos.model';

@Component({
  selector: 'app-alta-sector',
  templateUrl: './alta-sector.component.html',
  styleUrls: ['./alta-sector.component.css']
})
export class AltaSectorComponent {

  sectorForm!: FormGroup;
  sector!: Sector;
  //hayCambios: boolean = false;
  establecimientos: Establecimiento[] = [];
  idEstablecimiento!: number;
  establecimiento!: Establecimiento;
  establecimientoEnviado!: any;
  establecimientoIdParam: string | null = null;
  keywordEstablecimiento = 'nombre';
  keywordCuit = 'cuit';
  control : boolean=false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private sectorService: SectoresService,
    private router: Router,
    private establecimientoService: EstablecimientosService
  ) { }

  ngOnInit() {
    // Crea el formulario y sus validadores
    this.sectorForm = this.formBuilder.group({
      // establecimientoSeleccionado: [null, Validators.required],
      establecimiento: new FormControl({ value: null, disabled: this.establecimientoIdParam !== null }),
      nombre: ['', Validators.required],
      ubicacion: ['', Validators.required],
    });

    // Obtener la lista de establecimientos desde el servicio
    this.establecimientoService.obtenerEstablecimientos().subscribe(
      (establecimientos: Establecimiento[]) => {
        this.establecimientos = establecimientos;

        // Obtener el ID de establecimiento de la ruta si existe
        this.activatedRoute.params.subscribe(params => {
          this.establecimientoIdParam = params['idEstablecimiento'];

          // Si se proporciona el ID de establecimiento en la ruta,
          // seleccionarlo en el formulario y deshabilitar el campo
          if (this.establecimientoIdParam) {
            this.control=true;
            const establecimientoSeleccionado = this.establecimientos.find(est => est.idEstablecimiento.toString() === this.establecimientoIdParam);
            if (establecimientoSeleccionado) {
              this.sectorForm.patchValue({
                establecimiento: establecimientoSeleccionado.nombre
              });
            }
            this.sectorForm.get('establecimientoSeleccionado')?.disable();
            this.sectorForm.get('establecimiento')?.disable();
            
          }
          
        });
      },
      (error: any) => {
        console.log('Error al obtener los establecimientos:', error);
      }
    );

    // Suscribirse a los cambios del formulario
    // this.sectorForm.valueChanges.subscribe(() => {
    //   this.hayCambios = true;
    // });
  }
  onEstablecimientoSelect(event: any) {
    const idEstablecimiento = event.idEstablecimiento;

    if (idEstablecimiento) {
      this.sectorForm.get('nombre')?.enable();
    }
  }
  
  altaSector(): void {
    // Verificar la validez del formulario
    if (this.sectorForm.invalid) {
      return;
    }

    // Crear el objeto sector con los datos del formulario
    if (!this.control){
      this.establecimientoEnviado= this.sectorForm.value.establecimiento;
      this.idEstablecimiento = this.establecimientoEnviado.idEstablecimiento;
      this.establecimientoIdParam = this.establecimientoEnviado.idEstablecimiento;
    }

    this.sector = {
      ...this.sectorForm.value,
      idEstablecimiento: this.establecimientoIdParam
      
    };
    console.log("lo que va al service:",this.sector);
    // Llamar al servicio para crear el sector
    this.sectorService.crearSector(this.sector).subscribe(
      (res: any) => {
        //const establecimientoSeleccionado = this.sectorForm.value.establecimientoSeleccionado;
        // Ir a la ruta '/establecimiento' con idEstablecimiento
        //console.log("lo que responde el php:",res)
        this.router.navigate(['/establecimiento', this.idEstablecimiento||this.establecimientoIdParam]);
      },
      (err: any) => {
        console.log(`Error al agregar el sector: ${err.message}`);
      }
    );
  }
}