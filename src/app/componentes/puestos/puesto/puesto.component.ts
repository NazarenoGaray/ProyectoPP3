import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Equipo } from 'src/app/model/equipo.model';
import { Establecimiento } from 'src/app/model/establecimientos.model';
import { Puesto } from 'src/app/model/puesto.model';
import { Sector } from 'src/app/model/sector.model';
import { EquiposService } from 'src/app/servicios/equipos/equipos.service';
import { EstablecimientosService } from 'src/app/servicios/establecimientos/establecimientos.service';
import { LoadingService } from 'src/app/servicios/loading.service';
import { PuestosService } from 'src/app/servicios/puestos/puestos.service';
import { SectoresService } from 'src/app/servicios/sectores/sectores.service';

@Component({
  selector: 'app-puestos',
  templateUrl: './puesto.component.html',
  styleUrls: ['./puesto.component.css']
})
export class PuestoComponent {
  puesto!: Puesto;
  sector!: Sector;
  equipos!: Equipo[];
  loading: boolean = true;
  establecimiento!: Establecimiento;
  
  constructor(
    private route: ActivatedRoute,
    private puestosService: PuestosService,
    private equiposService: EquiposService,
    private sectoresService: SectoresService,
    private establecimientosService: EstablecimientosService,
    private loadingService: LoadingService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idPuesto = params.get('idPuesto');
      //console.log("idpuesto de parametro: ",idPuesto);
      if (idPuesto) {
        this.loadPuestoData(Number(idPuesto));
      } else {
        console.log("***** NO SE ENCONTRÓ EL Puesto *****");
      }
    });
  }

  loadPuestoData(idPuesto: number): void {
    this.puestosService.obtenerPuestoPorId(idPuesto).subscribe({
      next: (puesto: Puesto) => {
        this.puesto = puesto;
        console.log("puesto: ",puesto);
        if(puesto.idSector){
          this.loadSector(puesto.idSector);
        }
        this.loadEquipos(idPuesto);
      },
      error: (error) => {
        console.error('Error al cargar puesto:', error);
        this.loadingService.hide();
      }
    });
  }

  loadSector(idSector: number): void {
    this.sectoresService.obtenerSectorPorId(idSector).subscribe({
      next: (sector: Sector) => {
        this.sector = sector;
        console.log("sector: ",sector);
      },
      error: (error) => {
        console.error('Error al cargar puesto:', error);
        this.loadingService.hide();
      }
    });
  }

  loadEquipos(idPuesto: number): void {
    this.equiposService.obtenerEquiposPorPuesto(idPuesto).subscribe({
      next: (equipos: Equipo[]) => {
        this.equipos = equipos || [];
        this.loading = false;
        this.loadingService.hide();
      },
      error: (error) => {
        console.error('Error al cargar equipos:', error);
        this.equipos = [];
        this.loading = false;
        this.loadingService.hide();
      }
    });
  }

  loadEstablecimiento(idEstablecimiento: number): void {
    this.establecimientosService.obtenerDetalleEstablecimientoPorId(idEstablecimiento).subscribe({
      next: (establecimiento: Establecimiento) => {
        this.establecimiento = establecimiento;
        console.log("establecimiento: ",establecimiento);
      },
      error: (error) => {
        console.error('Error al cargar puesto:', error);
        this.loadingService.hide();
      }
    });
  }
  
}








  // obtenerPuestoPorId(idPuesto: number) {
  //   this.puestosService.obtenerPuestoPorId(idPuesto).subscribe(
  //     (data: Puesto) => {
  //       if (data) {
  //         this.puesto = data;
  //         console.log('Datos del puesto:', data);
  //       } else {
  //         console.log('Datos del establecimiento incompletos:', data);
  //       }
  //     },
  //     (error: any) => {
  //       console.log('Error al obtener los detalles del establecimiento:', error);
  //     }
  //   );
  // }

