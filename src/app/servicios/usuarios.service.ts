import { Injectable, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../servicios/usuario.model';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    // ...
    HttpClientModule,
  ],
  // ...
})

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private apiUrl = 'http://localhost/PP3/ProyectoPP3/src/back/api.php';

  constructor(private http: HttpClient) { }

  listarUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  cargarUsuario(id: number): Observable<Usuario> {
    const url = `${this.apiUrl}?id=${id}`;
    return this.http.get<Usuario>(url);
  }

  agregarUsuario(usuario: Usuario): Observable<any> {
    return this.http.post<any>(this.apiUrl, usuario);
  }

  actualizarUsuario(id: number, usuario: Usuario): Observable<any> {
    const url = `${this.apiUrl}?id=${id}`;
    return this.http.put<any>(url, usuario);
  }

  eliminarUsuario(id: number): Observable<any> {
    const url = `${this.apiUrl}?id=${id}`;
    return this.http.delete<any>(url);
  }

}

