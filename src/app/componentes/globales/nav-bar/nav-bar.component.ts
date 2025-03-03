import { ListarEstablecimientosComponent } from './../../establecimientos/listar-establecimientos/listar-establecimientos.component';
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
  userRole!:number;

//variables para el menu 
//usuario
  menuUsuarios:boolean=false;
  altaUsuario:boolean=false;
  listarUsuario:boolean=false;
//establecimientos
  menuEstablecimientos:boolean=false;
  cargarSector:boolean=false;
  listarEstablecimiento:boolean=false;
  cargarEstablecimiento:boolean=false;
//incidentes
  menuIncidentes:boolean=false;
  cargarIncidente:boolean=false;
  listarIncidente:boolean=false;

  constructor(
    private router: Router,
    private tokenService: TokenService,
  ) { }

  ngOnInit() {
    this.usuario = this.tokenService.getAuthenticatedUser();
    //console.log("idUsuarioNav: ",this.usuario.idUsuario);
    //console.log("UsuarioNav: ",this.usuario);
    //console.log("Rol del Usuario: ",this.usuario.rol.idRol);
    if(!this.usuario){
      this.showAlert = true;
      this.cerrarSesion();
    }else{
      this.userRole = this.usuario.rol.idRol;
      //console.log("Rol del Usuario: ",this.userRole);
      this.setVariablesSegunRol(this.userRole);
    }
  }

  @HostListener('window:scroll')

  checkScroll() {
    const scrollPosition = window.pageYOffset;
    this.isNavbarShrunk = scrollPosition > 0;
  }

  setVariablesSegunRol(rol:number){
    switch(rol){
      case 1://admin
        this.menuUsuarios = true;
        this.altaUsuario = true;
        this.listarUsuario = true;
        this.menuEstablecimientos = true;
        this.cargarSector = true;
        this.listarEstablecimiento = true;
        this.cargarEstablecimiento = true;
        this.menuIncidentes = true;
        this.cargarIncidente = true;
        this.listarIncidente = true;
      
        break;
      case 2://gerente
        this.menuUsuarios = true;
        this.altaUsuario = false;
        this.listarUsuario = true;
        this.menuEstablecimientos = true;
        this.cargarSector = false;
        this.listarEstablecimiento = true;
        this.cargarEstablecimiento = false
        this.menuIncidentes = true;
        this.cargarIncidente = false;
        this.listarIncidente = true;
        break;
      case 3://mesa de ayuda  
        this.menuUsuarios = true;
        this.altaUsuario = false;
        this.listarUsuario = true;
        this.menuEstablecimientos = true;
        this.cargarSector = false;
        this.listarEstablecimiento = true;
        this.cargarEstablecimiento = true;
        this.menuIncidentes = true;
        this.cargarIncidente = true;
        this.listarIncidente = true;
        break;
      case 4://tecnico
        this.menuUsuarios = false;
        this.altaUsuario = false;
        this.listarUsuario = false;
        this.menuEstablecimientos = false;
        this.cargarSector = false;
        this.listarEstablecimiento = false;
        this.cargarEstablecimiento = false;
        this.menuIncidentes = true;
        this.cargarIncidente = false;
        this.listarIncidente = true;

        break;
    }
  }

  isLoggedIn(): boolean {
    return this.tokenService.hasToken(); // Implementa el método hasToken() en tu servicio de tokens para verificar si hay un token almacenado.
  }

  cerrarSesion(): void {
    this.tokenService.removeToken(); // Implementa el método removeToken() en tu servicio de tokens para eliminar el token del sessionStorage.
    this.router.navigate(['/']); // Redirige al componente de inicio de sesión después de cerrar sesión.
  }

}
