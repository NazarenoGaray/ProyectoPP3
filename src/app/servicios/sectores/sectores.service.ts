import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Sector } from 'src/app/model/sector.model';
import { Puesto } from 'src/app/model/puesto.model';
import { Equipo } from 'src/app/model/equipo.model';


@Injectable({
  providedIn: 'root'
})
export class SectoresService {
  private apiURL = 'http://localhost:8000/api';
  public sectores: Sector[] = [];

  constructor(private http: HttpClient) { }

  //php establecimientoComponent - Obtener sectores por idEstablecimiento
  obtenerSectoresPorEstablecimiento(idEstablecimiento: number): Observable<any> {
    const url = `${this.apiURL}/establecimientos/${idEstablecimiento}/sectores`;
    return this.http.get<any>(url).pipe(
      tap((response) => {
        this.sectores = response;
        console.log('Sectores.service sector por establecimiento:', this.sectores);
      })
    );
  }

  obtenerSectorPorId(idSector: number): Observable<Sector> {
    return this.http.get<Sector>(`${this.apiURL}/sectores/${idSector}`).pipe(
      catchError((error: any) => {
        console.error('Error al obtener el sector:', error);
        return throwError('Error al obtener el sector');
      })
    );
  }




  //php equipos - Obtener equipos por sector
  obtenerEquiposPorSector(idSector: number): Observable<Equipo[]> {
    const url = `${this.apiURL}/equipos.php?idSector=${idSector}`;
    return this.http.get<Equipo[]>(url);
  }

  crearSector(sector: Sector): Observable<Sector> {
    const url = `${this.apiURL}/sectores.php`;
    console.log("lo que va al php:", sector);
    return this.http.post<Sector>(url, sector).pipe(
      tap((res: any) => {
      }),
      catchError((error: any) => {
        console.log(`Error al agregar el sector: ${error.message}`);
        return throwError(error);
      })
    );
  }


}
