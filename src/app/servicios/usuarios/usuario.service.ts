import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin, of, throwError } from 'rxjs';

import { tap, switchMap, map, catchError } from 'rxjs/operators';
import { take } from 'rxjs/operators';
import { Usuario } from 'src/app/model/usuario.model';



/* el archivo usuario.service.ts sería el controlador 
que se encarga de manejar la lógica de negocio de la aplicación y comunicarse con la API.
 */

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  apiURL = 'http://localhost/probando/usuarios.php';
  usuario!: Usuario;
  // Lista de usuarios
  usuarios!: Usuario[];
  // Usuario seleccionado (si lo hay)

  // Constructor del componente
  constructor(private http: HttpClient) { }
  getDatos() {
    return this.http.get(`${this.apiURL}/datos`);
  }
  
  obtenerUsuarios(): Observable<Usuario> {
    const url = `${this.apiURL}`;
    return this.http.get<Usuario>(url);
  }

  // Función para obtener un usuario por su ID
  obtenerUsuarioPorId(idUsuario: number) {
    return this.http.get(`${this.apiURL}?idUsuario=${idUsuario}`).pipe(
      take(1),
      tap((data: any) => {
        this.usuario = data;
      }),
      catchError(err => {
        console.log(`Error al obtener usuario por ID: ${err.message}`);
        return throwError(err);
      })
    );
  }
  obtenerDetallesUsuarioPorId(idUsuario: number) {
    
    return this.http.get(`${this.apiURL}?idUsuarioDetalle=${idUsuario}`).pipe(
      take(1),
      tap((data: any) => {
        this.usuario = data;
      }),
      catchError(err => {
        console.log(`Error al obtener usuario por ID: ${err.message}`);
        return throwError(err);
      })
    );
  }

  // Función para crear un nuevo usuario
  crearUsuario(usuario: Usuario) {
    console.log('Datos del usuario:', usuario);
    return this.http.post(`${this.apiURL}`, usuario).pipe(
      tap((data: any) => console.log(`Usuario creado con ID ${data.idUsuario}`)),
      catchError(err => {
        console.log(`Error al crear usuario: ${err.message}`);
        return throwError(err);
      })
    );
  }



  // Función para actualizar un usuario por su ID
  actualizarUsuario(idUsuario: number, usuario: Usuario): Observable<any> {
    return this.http.put(`${this.apiURL}?idUsuario=${idUsuario}`, usuario).pipe(
      catchError(err => {
        console.log(`Error al actualizar usuario: ${err.message}`);
        return throwError(err);
      })
    );
  }


  // Función para eliminar un usuario por su ID
  eliminarUsuario(idUsuario: number): Observable<any> {
    return this.http.delete(`${this.apiURL}?idUsuario=${idUsuario}`).pipe(
      tap(() => console.log(`Usuario con ID ${idUsuario} eliminado`)),
      catchError(error => {
        console.error(error);
        return of(null);
      })
    );
  }

}





