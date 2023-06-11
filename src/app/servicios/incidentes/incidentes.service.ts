import { Observable, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Incidente } from "src/app/model/incidente.model";
import { EstablecimientosService } from "../establecimientos/establecimientos.service";

@Injectable({
  providedIn: 'root'
})
export class IncidentesService {
  private apiUrl = 'http://localhost/probando';

  constructor(private http: HttpClient, private establecimientosService: EstablecimientosService) { }

  obtenerIncidentes(): Observable<Incidente[]> {
    return this.http.get<Incidente[]>(`${this.apiUrl}/incidentes.php`);
  }  

  obtenerIncidentesPorEstablecimiento(idEstablecimiento: number): Observable<Incidente[]> {
    const url = `${this.apiUrl}/incidentes.php?idEstablecimiento=${idEstablecimiento}`;
    return this.http.get<Incidente[]>(url);
  }
  
  obtenerDetalleIncidente(idIncidente: number): Observable<Incidente[]> {
    const url = `${this.apiUrl}/incidentes.php?idIncidente=${idIncidente}`;
    return this.http.get<Incidente[]>(url);
  }



}
