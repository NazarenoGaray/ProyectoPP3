import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Sector } from 'src/app/model/sector.model';
import { Rol } from 'src/app/model/roles.model';
import { estado_usuarios } from 'src/app/model/estado_usuarios.model';


@Injectable({
  providedIn: 'root'
})
export class EstadoUsuariosService {
  private apiURL = 'http://localhost:8000/api';
  public sectores: Sector[] = [];

  constructor(private http: HttpClient) { }

  obtenerEstadosUsuarios(): Observable<estado_usuarios[]> {
    const url = `${this.apiURL}/estadoUsuario`;
    
    return this.http.get<estado_usuarios[]>(url);
  }

  obtenerEstadosUsuariosPorId(idEstadoUsuario: number): Observable<estado_usuarios> {
    const url = `${this.apiURL}/estadoUsuario/${idEstadoUsuario}`;
    return this.http.get<estado_usuarios>(url);
  }

}

