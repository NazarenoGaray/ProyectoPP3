import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Sector } from 'src/app/model/sectore.model';
import { Puesto } from 'src/app/model/puesto.model';
import { Equipo } from 'src/app/model/equipo.model';


@Injectable({
  providedIn: 'root'
})
export class SectoresService {
  private baseUrl = 'http://localhost/probando';
  public sectores: any[] = [];

  constructor(private http: HttpClient) { }

  //php establecimientoComponent - Obtener sectores por ID establecimiento
  obtenerSectoresPorEstablecimiento(idEstablecimiento: number): Observable<any> {
    const url = `${this.baseUrl}/sectores.php?id_establecimiento=${idEstablecimiento}`;
    return this.http.get<any>(url).pipe(
      tap((response) => {
        this.sectores = response;
        console.log('Sectores.service.ts:', this.sectores);
      })
    );
  }

  //php sectoresComponent - Obtener sector por id 
  obtenerSectorPorId(idSector: number): Observable<Sector> {
    const url = `${this.baseUrl}/sectores.php?id_sector=${idSector}`;
    return this.http.get<Sector>(url);
  }

  //php - Obtener puestos por ID de sector 
  obtenerPuestosPorSector(idSector: number): Observable<Puesto[]> {
    const url = `${this.baseUrl}/puestos.php?id_sector=${idSector}`;
    return this.http.get<Puesto[]>(url);
  }

  //php equipos - Obtener equipos por sector
  obtenerEquiposPorSector(idSector: number): Observable<Equipo[]> {
    const url = `${this.baseUrl}/equipos.php?id_sector=${idSector}`;
    return this.http.get<Equipo[]>(url);
  }

}
