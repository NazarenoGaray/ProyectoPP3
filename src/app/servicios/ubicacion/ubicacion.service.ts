import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Pais } from 'src/app/model/pais.model';
import { Provincia } from 'src/app/model/provincia.model';
import { Localidad } from 'src/app/model/localidad.model';


@Injectable({
  providedIn: 'root'
})
export class UbicacionService {

  private apiURL = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  obtenerPaises(): Observable<Pais[]> {
    const url = `${this.apiURL}/paises`;
    return this.http.get<Pais[]>(url);
  }

  obtenerProvinciaPorId(idPais: number): Observable<Provincia[]> {
    const url = `${this.apiURL}/provincias/${idPais}`;
    return this.http.get<Provincia[]>(url);
  }

  obtenerLocalidadPorId(idProvincia: number): Observable<Localidad[]> {
    const url = `${this.apiURL}/localidades/${idProvincia}`;
    return this.http.get<Localidad[]>(url);
  }

}

