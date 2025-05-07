import { Observable, catchError, of, tap, throwError } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Incidente } from "src/app/model/incidente.model";
import { EstablecimientosService } from "../establecimientos/establecimientos.service";
import { Usuario } from "src/app/model/usuario.model";
import { comentarios_incidente } from "src/app/model/comentarios_incidente.model";
import { Equipo } from "src/app/model/equipo.model";

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
    //console.log("se envia:",incidente);
    return this.http.post<Incidente[]>(url,incidente);
  }

  obtenerIncidentesPorEstablecimiento(idEstablecimiento: number): Observable<Incidente[]> {
    const url = `${this.apiURL}/incidentes/${idEstablecimiento}/establecimiento`;
    // console.log("Datos que llegan a incidenteService", Incidente);
    return this.http.get<Incidente[]>(url);
  }

  obtenerDetalleIncidentePorId(idIncidente: number): Observable<Incidente> {
    const url = `${this.apiURL}/incidentes/${idIncidente}`;
    return this.http.get<Incidente>(url);
  }

  obtenerEquiposDeUnIncidente(idIncidente: number): Observable<Equipo[]> {
    const url = `${this.apiURL}/incidentes/${idIncidente}/equipos`;
    return this.http.get<Equipo[]>(url).pipe(
      catchError((error) => {
        if (error.status === 404) {
          // Handle the 404 error here
          console.log('No se encontraron equipos para el incidente con ID', idIncidente);
          // Puedes retornar un arreglo vacío o null, o lanzar una excepción personalizada si lo deseas
          return of([]); // Por ejemplo, retorna un arreglo vacío en caso de 404
        } else {
          // Maneja otros errores aquí
          return throwError('Ocurrió un error al obtener usuarios: ' + error.message);
        }
      })
    );
  }

  obtenerUsuariosDeUnIncidente(idIncidente: number): Observable<Usuario[]> {
    const url = `${this.apiURL}/incidentes/${idIncidente}/usuarios`;
    //console.log('idIncidente: ', idIncidente);
    return this.http.get<Usuario[]>(url).pipe(
      catchError((error) => {
        if (error.status === 404) {
          // Handle the 404 error here
          console.log('No se encontraron usuarios para el incidente con ID', idIncidente);
          // Puedes retornar un arreglo vacío o null, o lanzar una excepción personalizada si lo deseas
          return of([]); // Por ejemplo, retorna un arreglo vacío en caso de 404
        } else {
          // Maneja otros errores aquí
          return throwError('Ocurrió un error al obtener usuarios: ' + error.message);
        }
      })
    );
  }

  obtenerComentariosDeUnIncidente(idIncidente: number): Observable<comentarios_incidente[]> {
    const url = `${this.apiURL}/comentariosPorIncidente/${idIncidente}`;
    return this.http.get<comentarios_incidente[]>(url);
  }


  obtenerIncidentesPorUsuario(idUsuario: number): Observable<Incidente[]> {
    const url = `${this.apiURL}/usuarios/${idUsuario}/incidentes`;
    return this.http.get<Incidente[]>(url);
  }


  cargarIncidente(incidente: Incidente) {
    console.log('Datos del incidente en el servicio:', incidente);
    return this.http.post(`${this.apiURL}/incidentes`, incidente).pipe(
      tap((data: any) => console.log(`incidente creado con ID ${data.idIncidente}`)),
      catchError(err => {
        console.log(`Error al crear incidente: ${err.message}`);
        return throwError(err);
      })
    );
  }

  actualizarIncidente(idIncidente:number,incidente: Incidente) {
    //console.log('Datos del incidente:', incidente);
    return this.http.put(`${this.apiURL}/incidentes/${idIncidente}`, incidente).pipe(
      tap((data: any) => console.log(`incidente ID ${data.idIncidente} actualizado`)),
      catchError(err => {
        console.log(`Error al actualizar incidente: ${err.message}`);
        return throwError(err);
      })
    );
  }

  enviarComentario(comentario:any){
    console.log('Datos del comentario:', comentario);
    return this.http.post(`${this.apiURL}/comentariosIncidente`, comentario).pipe(
      tap((data: any) => console.log(`comentario creado con ID ${data.idIncidente}`)),
      catchError(err => {
        console.log(`Error al cenviar el comentario: ${err.message}`);
        return throwError(err);
      })
    );
  }


}
