import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/servicios/token/token.service';
import { HostListener } from '@angular/core';
import { Usuario } from 'src/app/model/usuario.model';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  isNavbarShrunk!: boolean;
  isTokenValid!: boolean;
  usuario!: Usuario;
  message:string='';
  showAlert:boolean=false;
  constructor(
    private router: Router,
    private tokenService: TokenService,
  ) { }
  ngOnInit() {
    this.usuario = this.tokenService.getAuthenticatedUser();
    //console.log("idUsuarioNav: ",this.usuario.idUsuario);
    //console.log("UsuarioNav: ",this.usuario);
    if(!this.usuario){
      this.showAlert = true;
      this.cerrarSesion();
    }
  }

  @HostListener('window:scroll')

  checkScroll() {
    const scrollPosition = window.pageYOffset;
    this.isNavbarShrunk = scrollPosition > 0;
  }


  isLoggedIn(): boolean {
    return this.tokenService.hasToken(); // Implementa el método hasToken() en tu servicio de tokens para verificar si hay un token almacenado.
  }

  cerrarSesion(): void {
    this.tokenService.removeToken(); // Implementa el método removeToken() en tu servicio de tokens para eliminar el token del sessionStorage.
    this.router.navigate(['/']); // Redirige al componente de inicio de sesión después de cerrar sesión.
  }

}
