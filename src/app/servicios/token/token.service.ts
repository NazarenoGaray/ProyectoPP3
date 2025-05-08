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
    private http: HttpClient,
  ) { }

  private readonly TOKEN_KEY = 'TOKEN';
  isTokenValid!: boolean;
  showAlert = false;
  message = '';
  apiURL = 'http://localhost:8000/api';
  idUsuario!: number;

  getToken(): string | null {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }
  getIdUsuario(): number | null {
    const userData = this.getAuthenticatedUser();
    //console.log('userData', userData);

    if (!userData || typeof userData === 'boolean') {
      throw new Error('Usuario no autenticado o token inválido');
    }

    if (!userData.idUsuario) {
      throw new Error('Datos de usuario incompletos en el token');
    }

    this.idUsuario = userData.idUsuario;

    return Number(userData.idUsuario);
  }

  getAuthenticatedUser() {
    const token = this.getToken();

    // 1. Verificar si el token existe
    if (token === null) {
      console.info('Por favor inicia sesión');
      this.redirectToLogin();
      return false;
    }

    // 2. Verificar si el token está expirado
    if (this.jwtHelper.isTokenExpired(token)) {
      console.error('Tu sesión ha expirado');
      this.redirectToLogin();
      return false;
    }

    // 3. Decodificar token válido
    const decodedToken = this.jwtHelper.decodeToken(token);
    if (!decodedToken?.data) {
      console.error('Estructura de token inválida');
      this.redirectToLogin();
      return false;
    }

    // 4. Verificar tiempo restante y refrescar si es necesario
    const expirationDate = this.jwtHelper.getTokenExpirationDate(token);
    if (expirationDate) {
      const timeRemaining = (expirationDate.getTime() - Date.now()) / 1000;
      this.checkTokenExpiration(timeRemaining);

      if (timeRemaining < 900) { // 15 minutos
        this.refrescarToken().subscribe({
          next: (response) => this.setToken(response.token),
          error: (error) => {
            console.error('Error refrescando token:', error);
            this.redirectToLogin();
          }
        });
      }
    }

    return decodedToken.data;
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

  private redirectToLogin(): void {
    console.error('Tu sesión ha expirado. Por favor ingresa nuevamente.');
    sessionStorage.setItem('redirectUrl', this.router.url);
    this.router.navigate(['/login']);
  }

  private checkTokenExpiration(timeRemaining: number): void {
    if (timeRemaining < 300) { // 5 minutos
      this.showWarning('Tu sesión expirará en 5 minutos');
    } else if (timeRemaining < 900) { // 15 minutos
      console.error('Tu sesión expirará pronto');
    }
  }

  private showWarning(message: string): void {
    // Usar Toast, Snackbar, o similar
    console.warn(message);
  }
}
