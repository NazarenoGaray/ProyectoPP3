import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl = 'http://localhost/probando/login.php';

  constructor(private http: HttpClient) { }

  validarCredencial(usuario: string, contrasena: string) {
    const body = {
      usuario: usuario,
      contrasena: contrasena
    };
    return this.http.post(this.apiUrl, body).pipe(
      tap((data: any) => console.log(`Inicio sesión exitosa`)),
      catchError(err => {
        console.log(`Error al iniciar sesión`);
        return throwError(err);
      })
    );
  }
}
