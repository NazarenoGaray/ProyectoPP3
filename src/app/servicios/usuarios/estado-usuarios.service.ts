import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstadoUsuariosService {
  private apiUrl = 'http://localhost/probando/estadoUsuarios.php';

  constructor(private http: HttpClient) { }

  obtenerEstadosUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  obtenerEstadoUsuarioPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?id=${id}`);
  }

  crearEstadoUsuario(estadoUsuario: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, estadoUsuario);
  }

  actualizarEstadoUsuario(id: number, estadoUsuario: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}`, estadoUsuario, { params: { id: id.toString() } });
  }

  eliminarEstadoUsuario(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}`, { params: { id: id.toString() } });
  }
}
