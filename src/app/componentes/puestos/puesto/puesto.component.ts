import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
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
    this.loadingService.show();
    this.route.paramMap.subscribe(params => {
      const idPuesto = params.get('idPuesto');
      if (idPuesto) {
        this.loadAllData(Number(idPuesto));
      } else {
        console.error("No se encontró el parámetro idPuesto");
        this.loadingService.hide();
      }
    });
  }

  loadAllData(idPuesto: number): void {
    // Primero cargamos el puesto
    this.puestosService.obtenerPuestoPorId(idPuesto).subscribe({
      next: (puesto: Puesto) => {
        this.puesto = puesto;
        
        // Luego cargamos en paralelo: sector, establecimiento y equipos
        forkJoin([
          this.sectoresService.obtenerSectorPorId(puesto.idSector),
          this.establecimientosService.obtenerDetalleEstablecimientoPorId(puesto.sectores.idEstablecimiento),
          this.puestosService.obtenerEquiposDeUnPuesto(idPuesto)
        ]).subscribe({
          next: ([sector, establecimiento, equipos]) => {
            this.sector = sector;
            this.establecimiento = establecimiento;
            console.log("equipos:",equipos);
            this.equipos = equipos || [];
            this.loading = false;
            this.loadingService.hide();
          },
          error: (error) => {
            console.error('Error al cargar datos adicionales:', error);
            this.loading = false;
            this.loadingService.hide();
          }
        });
      },
      error: (error) => {
        console.error('Error al cargar puesto:', error);
        this.loading = false;
        this.loadingService.hide();
      }
    });
  }
  
}