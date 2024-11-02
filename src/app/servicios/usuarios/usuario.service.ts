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
  apiURL = 'http://localhost:8000/api';
  usuario!: Usuario;
  // Lista de usuarios
  usuarios!: Usuario[];
  // Usuario seleccionado (si lo hay)

  // Constructor del componente
  constructor(private http: HttpClient) { }

  obtenerUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiURL}/usuarios`).pipe(
      catchError((error: any) => {
        console.error('Error al obtener los usuarios:', error);
        return throwError('Error al obtener los usuarios');
      })
    );
  }
  obtenerUsuariosFiltro(usuario:any): Observable<Usuario[]> {
    const url = `${this.apiURL}/usuarios/buscar`;
    //console.log("se envia:",usuario);
    return this.http.post<Usuario[]>(url,usuario).pipe(
      catchError((error: any) => {
        return throwError('Error al obtener los usuarios',error);
      })
    );
  }
  
  obtenerUsuariosInc(): Observable<any> {
    const url = `${this.apiURL}`;
    return this.http.get<Usuario[]>(url).pipe(
      tap((data: Usuario[]) => {
        this.usuarios = data;
        console.log('usdata:', this.usuarios);
      }),
      catchError(err => {
        console.log(`Error al obtener usuarios: ${err.message}`);
        return throwError(err);
      })
    );
  }


  obtenerUsuarioPorId(idUsuario: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiURL}/usuarios/${idUsuario}`).pipe(
      catchError((error: any) => {
        console.error('Error al obtener el usuario:', error);
        return throwError('Error al obtener el usuario');
      })
    );
    console.log(this.usuario);
  }



  // Función para crear un nuevo usuario
  crearUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiURL}/usuarios`, usuario);
  }



  // Función para actualizar un usuario por su ID
  actualizarUsuario(idUsuario: number, usuario: Usuario): Observable<any> {
    return this.http.put(`${this.apiURL}/usuarios/${idUsuario}`, usuario).pipe(
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





