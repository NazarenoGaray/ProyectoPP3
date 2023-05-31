import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/token/token.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  constructor(
    private router: Router,
    private tokenService: TokenService
  ) {}

  isLoggedIn(): boolean {
    return this.tokenService.hasToken(); // Implementa el método hasToken() en tu servicio de tokens para verificar si hay un token almacenado.
  }

  cerrarSesion(): void {
    this.tokenService.removeToken(); // Implementa el método removeToken() en tu servicio de tokens para eliminar el token del sessionStorage.
    this.router.navigate(['/']); // Redirige al componente de inicio de sesión después de cerrar sesión.
  }

}
