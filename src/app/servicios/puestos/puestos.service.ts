import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PuestosService {
  private baseUrl = 'http://localhost/probando';

  constructor(private http: HttpClient) { }

  obtenerPuestosPorEstablecimiento(idEstablecimiento: number): Observable<any[]> {
    const url = `${this.baseUrl}/puestos.php?id_establecimiento=${idEstablecimiento}`;
    return this.http.get<any[]>(url);
  }
}
