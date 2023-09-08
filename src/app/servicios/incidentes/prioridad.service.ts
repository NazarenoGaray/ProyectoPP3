import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Prioridad } from 'src/app/model/prioridad.model';

@Injectable({
  providedIn: 'root'
})
export class PrioridadService {

  private apiURL = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  obtenerPrioridades(): Observable<Prioridad[]> {
    const url = `${this.apiURL}/prioridadIncidentes`;
    return this.http.get<Prioridad[]>(url);
  }

  obtenerPrioridadPorId(idPrioridadIncidente: number): Observable<Prioridad> {
    const url = `${this.apiURL}/prioridadIncidentes/${idPrioridadIncidente}`;
    return this.http.get<Prioridad>(url);
  }

  crearPrioridad(prioridad: Prioridad): Observable<Prioridad> {
    return this.http.post<Prioridad>(this.apiURL, prioridad);
  }


}
