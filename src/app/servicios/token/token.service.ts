import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor(
    private jwtHelper: JwtHelperService,
    private router: Router,
    private http: HttpClient
  ) { }

  private readonly TOKEN_KEY = 'TOKEN';
  isTokenValid!: boolean;
  showAlert = false;
  message = '';
  apiURL = 'http://localhost:8000/api';

  getToken(): string | null {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }
  getAuthenticatedUser() {
    const token = this.getToken();

    if (token !== null) { // Comprueba si token no es null
      this.isTokenValid = !this.jwtHelper.isTokenExpired(token);
      
      //console.log(this.isTokenValid);
      if (this.isTokenValid) {
        // Decodifica el token si es válido.
        const decodedToken = this.jwtHelper.decodeToken(token);
        //console.log('Token decodificado:', decodedToken);

        if (decodedToken.hasOwnProperty('data')) {
          const usuario = decodedToken.data;
          //console.log('ID de usuario:', idUsuario);

          const expirationDate = this.jwtHelper.getTokenExpirationDate(token);
          if (expirationDate !== null) {
            const expirationTimeInSeconds = expirationDate.getTime() / 1000;
            const currentTimeInSeconds = Date.now() / 1000;
            const timeRemainingInSeconds = expirationTimeInSeconds - currentTimeInSeconds;

            if (timeRemainingInSeconds < 900) { // Menos de 15 minutos
              this.refrescarToken().subscribe(
                (response: any) => {
                  const newToken = response.token;
                  this.setToken(newToken);
                  //console.log('Token actualizado con éxito:', newToken);
                },
                (error: any) => {
                  
                  console.error('Error al actualizar el token:', error);
                  return false;
                }
              );
            }
          } else {
            console.log('No se pudo obtener la fecha de vencimiento del token.');
            return false;
          }
          return usuario;
        } else {
          console.log('El campo "data" no está presente en el token.');
          return false;
        }
      } else {
        return false;
      }
      
    } else {
      console.log('Token no encontrado o nulo');
      return false;
    }
  }
  setToken(token: string): void {
    sessionStorage.setItem(this.TOKEN_KEY, token);
  }

  removeToken(): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
  }

  hasToken(): boolean {
    return !!this.getToken();
  }
  refrescarToken(): Observable<any> {
    const token = this.getToken();
    // const token2 = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTY3MzUzNzUsImV4cCI6MTY5NjczNzE3NSwiZGF0YSI6eyJpZFVzdWFyaW8iOjc3LCJ1c3VhcmlvIjoibmF6YS5nYXJheSIsInJvbCI6eyJpZFJvbCI6MSwibm9tYnJlIjoiQWRtaW5pc3RyYWRvciIsImRlc2NyaXBjaW9uIjoiUm9sIGNvbiBwZXJtaXNvcyBkZSBhZG1pbmlzdHJhY2lcdTAwZjNuIiwiY3JlYXRlZF9hdCI6bnVsbCwidXBkYXRlZF9hdCI6bnVsbH19fQ.zvr96KyZT0EiT80MpHKg3_diY5xP-z8NRdvHb79LcfM'
    // console.log("Token enviado a renovar: ", token);
    // console.log("Token2 enviado a renovar: ", token2);
    const url = `${this.apiURL}/renovar-token`;
    return this.http.post(url, { token: token });
  }

}
