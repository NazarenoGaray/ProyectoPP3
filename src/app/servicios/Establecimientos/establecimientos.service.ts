import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pais } from 'src/app/componentes/model/pais.model';
import { Provincia } from 'src/app/componentes/model/provincia.model';
import { Localidad } from 'src/app/componentes/model/localidad.model';


@Injectable({
  providedIn: 'root'
})
export class EstablecimientosService {

  private baseUrl = 'http://localhost/probando';

  constructor(private http: HttpClient) { }

  obtenerEstablecimientos(): Observable<any> {
    const url = `${this.baseUrl}/establecimientos.php`;
    return this.http.get<any>(url);
  }
  obtenerEstablecimientoPorId(idEstablecimiento: number): Observable<any> {
    const url = `${this.baseUrl}/establecimientos.php?id_establecimiento=${idEstablecimiento}`;
    return this.http.get<any>(url);
  }

  crearEstablecimiento(establecimiento: any): Observable<any> {
    const url = `${this.baseUrl}/establecimientos.php`;
    return this.http.post<any>(url, establecimiento);
  }

  editarEstablecimiento(establecimiento: any,datosEstablecimiento: any): Observable<any> {
    const url = `${this.baseUrl}/establecimientos.php`;
    return this.http.put<any>(url, establecimiento);
  }

  eliminarEstablecimiento(idEstablecimiento: number): Observable<any> {
    const url = `${this.baseUrl}/establecimientos.php`;
    return this.http.delete<any>(url, { body: { idEstablecimiento } });
  }

  obtenerSectoresPorEstablecimiento(idEstablecimiento: number): Observable<any[]> {
    const url = `${this.baseUrl}/sectores.php?idEstablecimiento=${idEstablecimiento}`;
    return this.http.get<any[]>(url);
  }









  // Recuperar todos los países
  getPaises(): Observable<Pais[]> {
    return this.http.get<Pais[]>(`${this.baseUrl}/establecimientos.php?paises`);
  }

  // Recuperar un país por su idPais
  getPais(idPais: number): Observable<Pais> {
    return this.http.get<Pais>(`${this.baseUrl}/establecimientos.php?pais&IDPais=${idPais}`);
  }


  // Recuperar todas las provincias según idPais
  getProvincias(idPais: number): Observable<Provincia[]> {
    return this.http.get<Provincia[]>(`${this.baseUrl}/establecimientos.php?idPais=${idPais}`);
  }

  // Recuperar todas las localidades según idProvincia
  getLocalidades(idProvincia: number): Observable<Localidad[]> {
    return this.http.get<Localidad[]>(`${this.baseUrl}/establecimientos.php?idProvincia=${idProvincia}`);
  }

}
