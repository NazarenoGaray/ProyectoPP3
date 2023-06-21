import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  hayCambios: boolean = false;
//  establecimientos: Establecimiento[] = [];
  idEstablecimiento!: number;
  establecimiento!: Establecimiento;

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
      nombre: ['', Validators.required],
      ubicacion: ['', Validators.required],
      //establecimientoSeleccionado: [null, Validators.required]
    });

    //Recupera valor predeterminado un Establecimiento, segun idEstablecimiento
    this.activatedRoute.params.subscribe(params => {
      this.idEstablecimiento = params['idEstablecimiento'];
      //const idEstablecimiento = params['idEstablecimiento'];
      // // Establecer el valor seleccionado en el formulario
      // this.sectorForm.patchValue({
      //   establecimientoSeleccionado: idEstablecimiento
      // });

    });
    // Obtiene la lista de establecimientos
    // this.establecimientoService.obtenerEstablecimientos().subscribe(
    //   (establecimientos: Establecimiento[]) => {
    //     this.establecimientos = establecimientos;
    //   },
    //   (error: any) => {
    //     console.log('Error al obtener los establecimientos:', error);
    //   }
    // );
    this.establecimientoService.obtenerEstablecimientoPorId(this.idEstablecimiento).subscribe(
      (establecimiento: Establecimiento) => {
        this.establecimiento = establecimiento;
      },
      (error: any) => {
        console.log('Error al obtener los establecimientos:', error);
      }
    );
    // Observa los cambios en el formulario
    this.sectorForm.valueChanges.subscribe(() => {
      this.hayCambios = true;
    });

  }

  onSubmit(): void {
    // Si el formulario es inválido, no realiza la acción
    if (this.sectorForm.invalid) {
      return;
    }

    // Crea un objeto sector con los valores del formulario
    this.sector = {
      ...this.sectorForm.value,
      idEstablecimiento: this.idEstablecimiento
      
    };
    console.log("sector nuevo:", this.sector);
    // Crea el sector utilizando el servicio correspondiente
    this.sectorService.crearSector(this.sector).subscribe(
      (res: any) => {
        // Guarda el valor seleccionado antes de navegar a la ruta
        this.sector = this.sectorForm.value;
        // Regresa al establecimiento, el cual se agregó el sector
        this.router.navigate(['/establecimiento', this.idEstablecimiento]);
      },
      (err: any) => {
        console.log(`Error al agregar el sector: ${err.message}`);
      }
    );
  }
}
