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
  private baseUrl = 'http://localhost/probando';
  public sectores: Sector[] = [];

  constructor(private http: HttpClient) { }

  //php establecimientoComponent - Obtener sectores por idEstablecimiento
  obtenerSectoresPorEstablecimiento(idEstablecimiento: number): Observable<any> {
    const url = `${this.baseUrl}/sectores.php?idEstablecimiento=${idEstablecimiento}`;
    return this.http.get<any>(url).pipe(
      tap((response) => {
        this.sectores = response;
        console.log('Sectores.service sector por establecimiento:', this.sectores);
      })
    );
  }

  //php sectoresComponent - Obtener sector por idSector
  obtenerSectorPorId(idSector: number): Observable<Sector> {
    const url = `${this.baseUrl}/sectores.php?idSector=${idSector}`;
    return this.http.get<Sector>(url).pipe(
      catchError((error: any) => {
        console.log(`Error al obtener el sector: ${error.message}`);
        return throwError(error);
      })
    );
  }
  

  //php - Obtener puestos por ID de sector
  obtenerPuestosPorSector(idSector: number): Observable<Puesto[]> {
    const url = `${this.baseUrl}/puestos.php?idSector=${idSector}`;
    return this.http.get<Puesto[]>(url);
  }

  //php equipos - Obtener equipos por sector
  obtenerEquiposPorSector(idSector: number): Observable<Equipo[]> {
    const url = `${this.baseUrl}/equipos.php?idSector=${idSector}`;
    return this.http.get<Equipo[]>(url);
  }

  crearSector( sector: Sector): Observable<Sector> {
    const url = `${this.baseUrl}/sectores.php`;
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
