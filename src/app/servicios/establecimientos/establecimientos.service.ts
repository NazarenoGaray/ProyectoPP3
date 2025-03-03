import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Establecimiento } from 'src/app/model/establecimientos.model';


@Injectable({
  providedIn: 'root'
})
export class EstablecimientosService {

  private apiURL = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  obtenerEstablecimientos(): Observable<Establecimiento[]> {
    const url = `${this.apiURL}/establecimientos`;
    return this.http.get<Establecimiento[]>(url);
  }

  obtenerDetalleEstablecimientoPorId(idEstablecimiento: number): Observable<Establecimiento> {
    const url = `${this.apiURL}/establecimientos/${idEstablecimiento}`;
    return this.http.get<Establecimiento>(url);
  }

  crearEstablecimiento(establecimiento: Establecimiento): Observable<Establecimiento> {
    //const url = ;
    // console.log("Datos que llegan a establecimientoService", establecimiento);
    return this.http.post<Establecimiento>(`${this.apiURL}/establecimientos`, establecimiento);
  }

  actualizarEstablecimiento(idEstablecimiento: number, establecimiento: Establecimiento): Observable<Establecimiento> {
    return this.http.put<Establecimiento>(`${this.apiURL}/establecimientos/${idEstablecimiento}`, establecimiento);
  }


  eliminarEstablecimiento(idEstablecimiento: number): Observable<Establecimiento> {
    const url = `${this.apiURL}/establecimientos`;
    return this.http.delete<Establecimiento>(url, { body: { idEstablecimiento } });
  }

}


  // obtenerHorariosDeUnEstablecimiento(idEstablecimiento: number): Observable<Establecimiento> {
  //   const url = `${this.apiURL}/establecimientos/${idEstablecimiento}/horarios`;
  //   return this.http.get<Establecimiento>(url);
  // }
