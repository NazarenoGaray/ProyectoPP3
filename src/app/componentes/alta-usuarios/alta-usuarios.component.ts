import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../../servicios/usuario.model';
import { UsuarioService } from '../../../app/servicios/usuario.service';
import { Rol } from '../../servicios/roles.model';
import { RolService } from '../../servicios/roles.service';

@Component({
  selector: 'app-alta-usuarios',
  templateUrl: './alta-usuarios.component.html',
  styleUrls: ['./alta-usuarios.component.css']
})
export class AltaUsuariosComponent implements OnInit {

  usuarioForm!: FormGroup;
  usuario!: Usuario;
  roles: Rol[] = [];

  constructor(private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private rolService: RolService,
    private router: Router) { }

  ngOnInit(): void {
    this.usuarioForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email, this.validateCorreo]],
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required],
      id_rol: ['', Validators.required],
      IDLocalidad: ['', Validators.required],
      id_estado_usuario: ['', Validators.required]

    });

    // Obtenemos los roles para cargarlos en el select
    this.rolService.obtenerRoles().subscribe(
      (res: Rol[]) => {
        this.roles = res;
      },
      (err: any) => {
        console.log(`Error al obtener los roles: ${err.message}`);
      }
    );
  }

  validateCorreo(control: AbstractControl): { [key: string]: any } | null {
    if (control.value && control.value.length < 5) {
      return { 'correoInvalido': true };
    }
    return null;
  }

  agregarUsuario() {
    const usuarioFormulario = this.usuarioForm.value;

    this.usuarioService.crearUsuario(usuarioFormulario).subscribe(
      (res: any) => {
        console.log(`Usuario creado con ID ${res.id_usuario}`);
        this.router.navigate(['/listar-usuarios']);
      },
      (err: any) => {
        console.log(`Error al crear usuario: ${err.message}`);
      }
    );
  }

}
