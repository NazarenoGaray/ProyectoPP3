import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Sector } from 'src/app/model/sector.model';
import { Rol } from 'src/app/model/roles.model';


@Injectable({
  providedIn: 'root'
})
export class RolService {
  private apiURL = 'http://localhost:8000/api';
  public sectores: Sector[] = [];

  constructor(private http: HttpClient) { }

  obtenerRoles(): Observable<Rol[]> {
    const url = `${this.apiURL}/roles`;
    return this.http.get<Rol[]>(url);
  }

  obtenerRolesPorId(idRol: number): Observable<Rol> {
    const url = `${this.apiURL}/roles/${idRol}`;
    return this.http.get<Rol>(url);
  }

}

