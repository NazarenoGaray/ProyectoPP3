import { Observable, catchError, tap, throwError } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Incidente } from "src/app/model/incidente.model";
import { EstablecimientosService } from "../establecimientos/establecimientos.service";
import { Usuario } from "src/app/model/usuario.model";
import { comentarios_incidente } from "src/app/model/comentarios_incidente.model";

@Injectable({
  providedIn: 'root'
})
export class IncidentesService {
  private apiURL = 'http://localhost:8000/api';

  constructor(private http: HttpClient, private establecimientosService: EstablecimientosService) { }

  // obtenerIncidentes(): Observable<Incidente[]> {
  //   return this.http.get<Incidente[]>(`${this.apiURL}/incidentes.php`);
  // }  

  obtenerIncidentes(incidente:any): Observable<Incidente[]> {
    const url = `${this.apiURL}/incidentes/buscar`;
    console.log("se envia:",incidente);
    return this.http.post<Incidente[]>(url,incidente);
  }

  obtenerIncidentesPorEstablecimiento(idEstablecimiento: number): Observable<Incidente[]> {
    const url = `${this.apiURL}/incidentes/${idEstablecimiento}`;
    return this.http.get<Incidente[]>(url);
  }

  obtenerDetalleIncidentePorId(idIncidente: number): Observable<Incidente> {
    const url = `${this.apiURL}/incidentes/${idIncidente}`;
    return this.http.get<Incidente>(url);
  }

  obtenerEquiposDeUnIncidente(idIncidente: number): Observable<Incidente[]> {
    const url = `${this.apiURL}/incidentes/${idIncidente}/equipos`;
    return this.http.get<Incidente[]>(url);
  }

  obtenerUsuariosDeUnIncidente(idIncidente: number): Observable<Usuario[]> {
    const url = `${this.apiURL}/incidentes/${idIncidente}/usuarios`;
    return this.http.get<Usuario[]>(url);
  }

  obtenerComentariosDeUnIncidente(idTipoComentario: number): Observable<comentarios_incidente[]> {
    const url = `${this.apiURL}/comentariosIncidente/${idTipoComentario}`;
    return this.http.get<comentarios_incidente[]>(url);
  }





  obtenerIncidentesPorUsuario(idUsuario: number): Observable<Incidente[]> {
    const url = `${this.apiURL}/incidentes/${idUsuario}`;
    return this.http.get<Incidente[]>(url);
  }


  cargarIncidente(incidente: Incidente) {
    console.log('Datos del incidente:', incidente);
    return this.http.post(`${this.apiURL}/incidentes.php`, incidente).pipe(
      tap((data: any) => console.log(`incidente creado con ID ${data.idIncidente}`)),
      catchError(err => {
        console.log(`Error al crear incidente: ${err.message}`);
        return throwError(err);
      })
    );
  }

  crearIncidente(incidente: Incidente) {
    console.log('Datos del incidente:', incidente);
    return this.http.post(`${this.apiURL}/incidentes`, incidente).pipe(
      tap((data: any) => console.log(`incidente creado con ID ${data.idIncidente}`)),
      catchError(err => {
        console.log(`Error al crear incidente: ${err.message}`);
        return throwError(err);
      })
    );
  }




}
