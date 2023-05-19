import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Agrega esta importación
import { Rol } from './roles.model';

const API_URL = 'http://localhost/probando/roles.php';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor(private http: HttpClient) { }

  // Aquí se definirán los métodos para consumir la API de roles

  obtenerRoles(): Observable<Rol[]> {
    return this.http.get<Rol[]>(API_URL);
  }
  obtenerRolPorId(id: number): Observable<Rol> {
    const url = `${API_URL}/${id}`;
    return this.http.get<Rol>(url);
  }
  crearRol(rol: Rol): Observable<Rol> {
    return this.http.post<Rol>(API_URL, rol);
  }
  actualizarRol(rol: Rol): Observable<any> {
    const url = `${API_URL}/${rol.id_rol}`;
    return this.http.put(url, rol);
  }
  eliminarRol(id: number): Observable<any> {
    const url = `${API_URL}/${id}`;
    return this.http.delete(url);
  }

  obtenerNombreRol(id_rol: number): Observable<string> {
    return this.obtenerRolPorId(id_rol).pipe(
      map((rol: Rol) => rol.rol)
    );
  }
}
