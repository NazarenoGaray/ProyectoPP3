import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Pais } from 'src/app/model/pais.model';
import { Provincia } from 'src/app/model/provincia.model';
import { Localidad } from 'src/app/model/localidad.model';
import { Establecimiento } from 'src/app/model/establecimientos.model';


@Injectable({
  providedIn: 'root'
})
export class EstablecimientosService {

  private apiURL = 'http://localhost/probando/establecimientos.php';

  constructor(private http: HttpClient) { }

  obtenerEstablecimientos(): Observable<any> {
    const url = `${this.apiURL}`;
    return this.http.get<any>(url);
  }
  obtenerDetalleEstablecimientoPorId(idEstablecimiento: number): Observable<any> {
    const url = `${this.apiURL}?id_establecimiento=${idEstablecimiento}`;
    return this.http.get<any>(url);
  }
  obtenerEstablecimientoPorId(idEstablecimiento: number): Observable<any> {
    const url = `${this.apiURL}?id_establecimientoEditar=${idEstablecimiento}`;
    return this.http.get<any>(url);
  }

  crearEstablecimiento(establecimiento: any): Observable<any> {
    const url = `${this.apiURL}`;
    return this.http.post<any>(url, establecimiento);
  }

  actualizarEstablecimiento(id_establecimiento: number, establecimiento: Establecimiento): Observable<any> {
    return this.http.put(`${this.apiURL}?id_establecimiento=${id_establecimiento}`, establecimiento).pipe(
      catchError(err => {
        console.log(`Error al actualizar establecimiento: ${err.message}`);
        return throwError(err);
      })
    );
  }
  eliminarEstablecimiento(idEstablecimiento: number): Observable<any> {
    const url = `${this.apiURL}`;
    return this.http.delete<any>(url, { body: { idEstablecimiento } });
  }

  obtenerSectoresPorEstablecimiento(idEstablecimiento: number): Observable<any[]> {
    const url = `${this.apiURL}/sectores.php?idEstablecimiento=${idEstablecimiento}`;
    return this.http.get<any[]>(url);


}
}
