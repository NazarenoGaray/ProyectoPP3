import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Equipo } from 'src/app/model/equipo.model';
import { estado_equipo } from 'src/app/model/estado_equipo.model';
import { tipo_equipo } from 'src/app/model/tipo_equipo.model';


@Injectable({
  providedIn: 'root'
})
export class EquiposService {
  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  obtenerEquipoPorId(idEquipo: number): Observable<Equipo> {
    return this.http.get<Equipo>(`${this.baseUrl}/equipos/${idEquipo}`).pipe(
      catchError((error: any) => {
        console.error('Error al obtener el equipo:', error);
        return throwError('Error al obtener el equipo');
      })
    );
  }


  obtenerEquiposPorPuesto(idSector: number): Observable<Equipo[]> {
    const url = `${this.baseUrl}/sectores/${idSector}/equipos`;
    return this.http.get<Equipo[]>(url);
  }

  obtenerEstadosEquipo(): Observable<estado_equipo[]> {
    const url = `${this.baseUrl}/estadoEquipo`;
    return this.http.get<estado_equipo[]>(url);
  }

  obtenerTipoEquipo(): Observable<tipo_equipo[]> {
    const url = `${this.baseUrl}/tipoEquipo`;
    return this.http.get<tipo_equipo[]>(url);
  }


    // Método para crear un nuevo equipo
    altaEquipo(equipo: Equipo): Observable<Equipo> {
      return this.http.post<Equipo>(`${this.baseUrl}/equipos`, equipo);
    }
  




  obtenerEquiposPorSector(idSector: number): Observable<Equipo[]> {
    const url = `${this.baseUrl}/sectores/${idSector}/equipos`;
    console.log("Equipos por sector obtenidos:",this.http.get<Equipo[]>(url))
    return this.http.get<Equipo[]>(url);
  }


  //php - Obtener informacion de un equipo en especifico
  obtenerEquipo(idEquipo: number): Observable<Equipo> {
    const url = `${this.baseUrl}/equipos.php?idEquipo=${idEquipo}`;
    return this.http.get<Equipo>(url);
  }

  obtenerHistorialEquipo(idEquipo: number): Observable<Equipo[]> {
    const url = `${this.baseUrl}/historialEquipos.php?idEquipo=${idEquipo}`;
    return this.http.get<Equipo[]>(url);
  }




}

