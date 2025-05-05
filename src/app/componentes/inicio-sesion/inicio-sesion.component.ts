import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/servicios/loading.service';
import { LoginService } from 'src/app/servicios/login/login.service';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent{
  usuario!: string;
  contrasena!: string;
  token!: any;
  idUsuario!: any;
  mostrarError = false;
  errorMensaje='';

  constructor(
    private loginService: LoginService,
    private loadingService: LoadingService,
    private router: Router) { }
  

  onSubmit() {
    // Validar que los campos no estén vacíos
    if (!this.usuario || !this.contrasena) {
      this.mostrarError = true;
      this.errorMensaje='Los campos de usuario y contraseña son requeridos';
      console.error('Los campos de usuario y contraseña son requeridos');
      return;
    }
    
    this.loadingService.show();

    this.loginService.validarCredencial(this.usuario, this.contrasena).subscribe({
      next: (res: any) => {
        if (!res || !res.token) {
          console.error('Respuesta inválida del servidor',res);
          this.mostrarError = true;
          this.errorMensaje='res';
          this.loadingService.hide();
          return;
        }

        //console.log('Sesión creada con éxito');
        this.token = JSON.stringify(res.token);
        this.idUsuario = JSON.stringify(res.idUsuario);
        sessionStorage.setItem('TOKEN', this.token);
        sessionStorage.setItem('ID_USUARIO', this.idUsuario);
        console.log("datos de login: ",res);
        this.loadingService.hide();
        if (res.idEstadoUsuario === 5) {
          this.router.navigate(['/cambiar-clave']);
        } else {
          this.router.navigate(['/']); // Página principal
        }
      },
      error: (err: any) => {
        console.error('Error al iniciar sesión:', err);
        this.mostrarError = true;
        this.loadingService.hide();
        if (err.status === 401) {
          this.errorMensaje = 'Contraseña inválida';
          console.error('Contraseña inválida');
        } else if (err.status === 404) {
          this.errorMensaje = 'Usuario no encontrado';
          console.error('Usuario no encontrado');
        } else {
          this.errorMensaje = 'Error al iniciar sesión. Intente nuevamente mas tarde.';
          console.error('Error del servidor:', err.message);
        }
      },
      complete: () => {
        // Opcional: limpiar campos después de completar
        this.usuario = '';
        this.contrasena = '';
      }
    });
  }
   getEstado(){
    return this.loadingService.getEstado();
  } 
}
