import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  //apiUrl = 'http://localhost/probando/login.php';
  apiUrl = 'http://localhost:8000/api/iniciar-sesion';

  constructor(private http: HttpClient) { }

  validarCredencial(usuario: string, contraseña: string) {
    const body = {
      usuario: usuario,
      contraseña: contraseña
    };
    //console.log(`usuario enviado:`,body);
    return this.http.post(this.apiUrl, body).pipe(
      tap((data: any) => 
        console.log(`Inicio sesión exitosa`//, data

        )),
      catchError(err => {
        console.log(`Error al iniciar sesión`);
        return throwError(err);
      })
    );
  }
}
