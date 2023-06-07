import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UbicacionService {
  private baseUrl = 'http://localhost/probando';

  constructor(private http: HttpClient) {}

  getPaises(): Observable<any> {
    const url = `${this.baseUrl}/paises.php`;
    return this.http.get(url);
  }

  getProvincias(id: number): Observable<any> {
    const url = `${this.baseUrl}/provincias.php?IDPais=${id}`;
    return this.http.get(url);
  }

  getLocalidades(id: number): Observable<any> {
    const url = `${this.baseUrl}/localidades.php?IDProvincia=${id}`;
    
    return this.http.get(url);
  }
  getPaisPorID(id: number): Observable<any> {
    const url = `${this.baseUrl}/paises.php?id=${id}`;
    return this.http.get(url);
  }
  getProvinciaPorID(id: number): Observable<any> {
    const url = `${this.baseUrl}/provincias.php?IDProvincia=${id}`;
    return this.http.get(url);
  }
  getLocalidadPorID(id: number): Observable<any> {
    const url = `${this.baseUrl}/localidades.php?idLocalidad=${id}`;
    return this.http.get(url);
  }
}
