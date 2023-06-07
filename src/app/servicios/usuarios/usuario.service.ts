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
  usuarios = [];

  // Usuario seleccionado (si lo hay)
  usuarioSeleccionado = null;

  // Constructor del componente
  constructor(private http: HttpClient) { }
  getDatos() {
    return this.http.get(`${this.apiURL}/datos`);
  }
  // Función para obtener todos los usuarios
  obtenerUsuarios(): Observable<Usuario[]> {
    return this.http.get(this.apiURL).pipe(
      map((data: any) => {
        return data.map((usuario: any) => new Usuario(
          usuario.id_usuario,
          usuario.nombre,
          usuario.apellido,
          usuario.direccion,
          usuario.telefono,
          usuario.correo,
          usuario.usuario,
          usuario.contrasena,
          usuario.id_rol,
          usuario.IDPais,
          usuario.IDProvincia,
          usuario.IDLocalidad,
          usuario.id_estado_usuario
        ));
      })
    );
  }


  // Función para obtener un usuario por su ID
  obtenerUsuarioPorId(id_usuario: number) {
    return this.http.get(`${this.apiURL}?id_usuario=${id_usuario}`).pipe(
      take(1),
      tap((data: any) => {
        this.usuarioSeleccionado = data;
      }),
      catchError(err => {
        console.log(`Error al obtener usuario por ID: ${err.message}`);
        return throwError(err);
      })
    );
  }
  obtenerDetallesUsuarioPorId(id_usuario: number,detalles: boolean) {
    return this.http.get(`${this.apiURL}?id_usuario=${id_usuario}&detalles=${detalles}`).pipe(
      take(1),
      tap((data: any) => {
        this.usuarioSeleccionado = data;
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
    return this.http.post(this.apiURL, usuario).pipe(
      tap((data: any) => console.log(`Usuario creado con ID ${data.id_usuario}`)),
      catchError(err => {
        console.log(`Error al crear usuario: ${err.message}`);
        return throwError(err);
      })
    );
  }



  // Función para actualizar un usuario por su ID
  actualizarUsuario(id_usuario: number, usuario: Usuario): Observable<any> {
    return this.http.put(`${this.apiURL}?id_usuario=${id_usuario}`, usuario).pipe(
      catchError(err => {
        console.log(`Error al actualizar usuario: ${err.message}`);
        return throwError(err);
      })
    );
  }


  // Función para eliminar un usuario por su ID
  eliminarUsuario(id_usuario: number): Observable<any> {
    return this.http.delete(`${this.apiURL}?id_usuario=${id_usuario}`).pipe(
      tap(() => console.log(`Usuario con ID ${id_usuario} eliminado`)),
      catchError(error => {
        console.error(error);
        return of(null);
      })
    );
  }

}





