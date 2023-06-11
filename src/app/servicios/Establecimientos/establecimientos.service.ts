import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Establecimiento } from 'src/app/model/establecimientos.model';


@Injectable({
  providedIn: 'root'
})
export class EstablecimientosService {

  private apiURL = 'http://localhost/probando/establecimientos.php';

  constructor(private http: HttpClient) { }

  obtenerEstablecimientos(): Observable<any> {
    const url = `${this.apiURL}`;
    return this.http.get<Establecimiento>(url);
  }
  obtenerDetalleEstablecimientoPorId(idEstablecimiento: number): Observable<Establecimiento[]> {
    const url = `${this.apiURL}?idEstablecimiento=${idEstablecimiento}`;
    return this.http.get<Establecimiento[]>(url);
  }

    obtenerEstablecimientoPorId(idEstablecimiento: number): Observable < any > {
      const url = `${this.apiURL}?idEstablecimientoEditar=${idEstablecimiento}`;
      return this.http.get<any>(url);
    }

    crearEstablecimiento(establecimiento: any): Observable < any > {
      const url = `${this.apiURL}`;
      console.log(establecimiento);
      return this.http.post<any>(url, establecimiento);
    }

    actualizarEstablecimiento(idEstablecimiento: number, establecimiento: Establecimiento): Observable < any > {
      return this.http.put(`${this.apiURL}?idEstablecimiento=${idEstablecimiento}`, establecimiento).pipe(
        catchError(err => {
          console.log(`Error al actualizar establecimiento: ${err.message}`);
          return throwError(err);
        })
      );
    }
    eliminarEstablecimiento(idEstablecimiento: number): Observable < any > {
      const url = `${this.apiURL}`;
      return this.http.delete<any>(url, { body: { idEstablecimiento } });
    }

  }
