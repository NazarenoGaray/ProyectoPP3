import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Equipo } from 'src/app/componentes/model/equipo.model';


@Injectable({
  providedIn: 'root'
})
export class EquiposService {
  private baseUrl = 'http://localhost/probando';

  constructor(private http: HttpClient) { }

  //php - Obtener informacion de un equipo en especifico
  obtenerEquipo(idEquipo: number): Observable<Equipo> {
    const url = `${this.baseUrl}/equipos.php?id_equipo=${idEquipo}`;
    return this.http.get<Equipo>(url);
  }


  
}

