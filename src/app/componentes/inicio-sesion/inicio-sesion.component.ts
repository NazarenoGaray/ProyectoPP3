import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent{
  usuario!: string;
  contrasena!: string;
  token!: any;
  constructor(
    private loginService: LoginService,
    private router: Router) { }
  

  onSubmit() {

    this.loginService.validarCredencial(this.usuario, this.contrasena).subscribe(
      (res: any) => {
        console.log(`Sesión creada con éxito`);

        // Guarda el token de sesión en localStorage
        this.token=JSON.stringify(res.token);
        //localStorage.setItem('TOKEN',this.token);
        sessionStorage.setItem('TOKEN',this.token);// se guarda en sesion storage
        // se lee con:
        this.router.navigate(['/bienvenido']);
      },
      (err: any) => {
        console.log(`Error al iniciar sesión ${err.message}`);
      }
    );
  }
}
