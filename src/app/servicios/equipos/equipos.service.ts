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
    const url = `${this.baseUrl}/equipos/${idEquipo}`;
    return this.http.get<Equipo>(url);
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


  editarEquipo(idEquipo: number, equipo: Equipo): Observable<Equipo> {
    //console.log("equipo a editar: ",equipo);
    const url = `${this.baseUrl}/equipos/${idEquipo}`;
    return this.http.put<Equipo>(url, equipo);
  }


  obtenerEquiposPorSector(idSector: number): Observable<Equipo[]> {
    //console.log("idSector: ",idSector);
    const url = `${this.baseUrl}/sectores/${idSector}/equipos`;
    return this.http.get<Equipo[]>(url);
  }


  //php - Obtener informacion de un equipo en especifico
  obtenerEquipo(idEquipo: number): Observable<Equipo> {
    const url = `${this.baseUrl}/equipos.php?idEquipo=${idEquipo}`;
    return this.http.get<Equipo>(url);
  }

  obtenerHistorialEquipo(idEquipo: number): Observable<Equipo[]> {
    const url = `${this.baseUrl}/equipos/${idEquipo}/historial`;

    return this.http.get<Equipo[]>(url);
  }




}

