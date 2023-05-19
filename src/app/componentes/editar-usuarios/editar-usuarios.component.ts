import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from '../../servicios/usuario.model';
import { UsuarioService } from '../../../app/servicios/usuario.service';
import { switchMap, take } from 'rxjs/operators';
import { Rol } from '../../servicios/roles.model';
import { RolService } from '../../servicios/roles.service';


@Component({
  selector: 'app-editar-usuarios',
  templateUrl: './editar-usuarios.component.html',
  styleUrls: ['./editar-usuarios.component.css']
})
export class EditarUsuariosComponent implements OnInit {

  usuarioForm!: FormGroup;
  usuario!: Usuario;
  id_usuario!: number;
  roles: Rol[] = [];


  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute,
    private rolService: RolService,

  ) { }

  ngOnInit(): void {
    this.usuarioForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email, this.validateCorreo]],
      domicilio: ['', Validators.required],
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required],
      id_rol: [1, Validators.required],
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
    this.route.params.pipe(
      take(1),
      switchMap(params => this.usuarioService.obtenerUsuarioPorId(params['id']))
    ).subscribe(
      (usuario: Usuario | null) => {
        if (usuario) {
          console.log("Data obtenida: ", usuario);
          this.usuarioForm.patchValue(usuario);
          this.id_usuario = usuario.id_usuario;
          this.usuario = usuario;
        } else {
          console.log("Usuario no encontrado");
        }
      },
      error => {
        console.log(error);
      }
    );

  }
  validateCorreo(control: AbstractControl): { [key: string]: any } | null {
    if (control.value && control.value.length < 5) {
      return { 'correoInvalido': true };
    }
    return null;
  }
  actualizarUsuario() {
    const usuarioFormulario = this.usuarioForm.value;
    this.usuario = {
      ...usuarioFormulario,
      id_usuario: this.id_usuario
    };
    this.usuarioService.actualizarUsuario(this.id_usuario, this.usuario).subscribe(
      (res: any) => {
        console.log(`Usuario con ID ${this.id_usuario} actualizado`);
        this.router.navigate(['/listar-usuarios']);
      },
      (err: any) => {
        console.log(`Error al actualizar usuario: ${err.message}`);
      }
    );
  }

}
