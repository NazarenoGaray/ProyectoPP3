import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Prioridad } from 'src/app/model/prioridad.model';

const API_URL = 'http://localhost/probando/prioridad.php';

@Injectable({
  providedIn: 'root'
})
export class PrioridadService {

  constructor(private http: HttpClient) { }

  // Aquí se definirán los métodos para consumir la API de Prioridades

  obtenerPrioridades(): Observable<Prioridad[]> {
    return this.http.get<Prioridad[]>(API_URL);
  }
  obtenerPrioridadPorId(id: number): Observable<Prioridad> {
    const url = `${API_URL}/${id}`;
    return this.http.get<Prioridad>(url);
  }
  crearPrioridad(prioridad: Prioridad): Observable<Prioridad> {
    return this.http.post<Prioridad>(API_URL, prioridad);
  }
  actualizarPrioridad(prioridad: Prioridad): Observable<any> {
    const url = `${API_URL}/${prioridad.idPrioridad}`;
    return this.http.put(url, prioridad);
  }
  eliminarPrioridad(id: number): Observable<any> {
    const url = `${API_URL}/${id}`;
    return this.http.delete(url);
  }
}
