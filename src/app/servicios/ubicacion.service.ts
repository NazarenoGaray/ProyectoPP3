import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pais } from '../componentes/model/pais.model';
import { Provincia } from '../componentes/model/provincia.model';
import { Localidad } from '../componentes/model/localidad.model';

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

  getProvincias(idPais: number): Observable<any> {
    const url = `${this.baseUrl}/provincias.php?IDPais=${idPais}`;
    return this.http.get(url);
  }

  getLocalidades(idProvincia: number): Observable<any> {
    const url = `${this.baseUrl}/localidades.php?IDProvincia=${idProvincia}`;
    return this.http.get(url);
  }
}
