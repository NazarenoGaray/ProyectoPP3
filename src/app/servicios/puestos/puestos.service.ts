import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Puesto } from 'src/app/model/puesto.model';
import { Equipo } from 'src/app/model/equipo.model';

@Injectable({
  providedIn: 'root'
})
export class PuestosService {
  private apiURL = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  editarPuesto(idPuesto: number, puesto: Puesto): Observable<Puesto> {
    return this.http.put<Puesto>(`${this.apiURL}/puestos/${idPuesto}`, puesto);
  }



  obtenerPuestosPorEstablecimiento(): Observable<Puesto[]> {
    return this.http.get<Puesto[]>(`${this.apiURL}/puestos`);
  }

  obtenerPuestoPorId(idPuesto: number): Observable<Puesto> {
    const url = `${this.apiURL}/puestos/${idPuesto}`;
    return this.http.get<any>(url);
  }

  // Obtener todos los puestos de un sector
  obtenerPuestosPorSector(idSector: number): Observable<Puesto[]> {
    const url = `${this.apiURL}/sectores/${idSector}/puestos`;
    return this.http.get<Puesto[]>(url);
  }


  // Obtener todos los equipos de un puesto
  obtenerEquiposDeUnPuesto(idPuesto: number): Observable<Equipo[]> {
    const url = `${this.apiURL}/puestos/${idPuesto}/equipos`;

    return this.http.get<Equipo[]>(url).pipe(
      tap((equipos: Equipo[]) => {
        console.log("Equipos recuperados:", equipos);
      })
    );
  }

  // Método para crear un nuevo puesto
  altaPuesto(puesto: Puesto): Observable<Puesto> {
    return this.http.post<Puesto>(`${this.apiURL}/puestos`, puesto);
  }

}
