import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap, take } from 'rxjs/operators';
import { UbicacionService } from 'src/app/servicios/ubicacion/ubicacion.service';
import { estado_usuarios } from '../../model/estado_usuarios.model';
import { Pais } from '../../model/pais.model';
import { Provincia } from '../../model/provincia.model';
import { Localidad } from '../../model/localidad.model';
import { Usuario } from '../../model/usuario.model';
import { Rol } from '../../model/roles.model';
import { UsuarioService } from 'src/app/servicios/usuarios/usuario.service';
import { RolService } from 'src/app/servicios/usuarios/roles.service';
import { EstadoUsuariosService } from 'src/app/servicios/usuarios/estado-usuarios.service';


@Component({
  selector: 'app-editar-usuarios',
  templateUrl: './editar-usuarios.component.html',
  styleUrls: ['./editar-usuarios.component.css']
})
export class EditarUsuariosComponent implements OnInit {

  usuarioForm!: FormGroup;
  usuario!: Usuario;
  usuarioOriginal!: Usuario;
  id_usuario!: number;
  roles: Rol[] = [];
  estados: estado_usuarios[] = [];
  paises: Pais[] = [];
  provincias: Provincia[] = [];
  localidades: Localidad[] = [];
  hayCambios: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute,
    private ubicacionService: UbicacionService,
    private rolService: RolService,
    private estadoService: EstadoUsuariosService,
  ) { }

  ngOnInit(): void {
    this.usuarioForm = this.formBuilder.group({
      id_usuario: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email, this.validateCorreo]],
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required],
      direccion: ['', Validators.required],
      IDLocalidad: [{ value: '', disabled: false }, Validators.required],
      IDProvincia: [{ value: '', disabled: false }, Validators.required],
      IDPais: [{ value: '', disabled: false }, Validators.required],
      id_rol: ['', Validators.required],
      id_estado_usuario: ['', Validators.required],
    });

    // console.log('formulario:', JSON.stringify({
    //   ...this.usuarioForm.value,
    //   IDProvincia: this.usuarioForm.get('IDProvincia')?.value,
    //   IDLocalidad: this.usuarioForm.get('IDLocalidad')?.value,
    //   id_usuario: this.usuarioForm.get('id_usuario')?.value
    // }));
    // Obtenemos los roles para cargarlos en el select
    this.rolService.obtenerRoles().subscribe(
      (res: Rol[]) => {
        this.roles = res;
      },
      (err: any) => {
        console.log(`Error al obtener los roles: ${err.message}`);
      }
    );
    ///////////////////////////////////////////////
    this.estadoService.obtenerEstadosUsuarios().subscribe(
      (res: estado_usuarios[]) => {
        this.estados = res;
      },
      (err: any) => {
        console.log(`Error al obtener los estados: ${err.message}`);
      }
    );
    ////////////////////////////////////////////////////////
    this.ubicacionService.getPaises().subscribe((data: any[]) => {
      this.paises = data;
    });
    ////////////////////////////////////////////////////////
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
          this.usuarioOriginal = { ...usuario };// cuardamos una copia del usuario
          this.usuario.IDPais = usuario.IDPais;
          this.usuario.IDProvincia = usuario.IDProvincia;
          this.usuario.IDLocalidad = usuario.IDLocalidad;
          // Obtener el país del usuario seleccionado
          if (usuario.IDPais) {
            this.usuarioForm.get('IDPais')?.setValue(usuario.IDPais);
          }
          // Obtener la provincia según el país seleccionado
          if (usuario.IDPais) {
            this.ubicacionService.getProvincias(usuario.IDPais).subscribe((provincias: Provincia[]) => {
              this.provincias = provincias;
              this.usuarioForm.get('IDProvincia')?.enable();
              this.usuarioForm.get('IDProvincia')?.setValue(usuario.IDProvincia);
            });
          }
    
          // Obtener la localidad según la provincia seleccionada
          if (usuario.IDProvincia) {
            this.ubicacionService.getLocalidades(usuario.IDProvincia).subscribe((localidades: Localidad[]) => {
              this.localidades = localidades;
              this.usuarioForm.get('IDLocalidad')?.enable();
              this.usuarioForm.get('IDLocalidad')?.setValue(usuario.IDLocalidad);
            });
          }
        } else {
          console.log("Usuario no encontrado");
        }
      },
      error => {
        console.log(error);
      }
    );
      
    ////////////////////////////////////////////////////////////////verificando cambios
    this.usuarioForm.valueChanges.subscribe(() => {
      this.detectarCambios();
    });
    
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
    this.detectarCambios();
    this.hayCambios = false;
  }
  //////////////////////////////////////////////////////////////////////////////////////////
  onPaisSelected() {
    const paisId = this.usuarioForm.value.IDPais;
    this.usuarioForm.get('IDProvincia')?.setValue('');
    this.usuarioForm.get('IDProvincia')?.enable();
    this.usuarioForm.get('IDLocalidad')?.setValue('');
    this.usuarioForm.get('IDLocalidad')?.disable();
    
    this.provincias = [];

    if (paisId) {
      this.ubicacionService.getProvincias(paisId).subscribe((data: any[]) => {
        this.provincias = data;
        this.usuarioForm.get('IDLocalidad')?.disable();
      }); 
    }
  }

  onProvinciaSelected() {
    const provinciaId = this.usuarioForm.value.IDProvincia;
    this.usuarioForm.get('IDLocalidad')?.setValue('');
    this.usuarioForm.get('IDLocalidad')?.disable();
    this.localidades = [];

    if (provinciaId) {
      this.ubicacionService.getLocalidades(provinciaId).subscribe((data: any[]) => {
        this.localidades = data;
        this.usuarioForm.get('IDLocalidad')?.enable();
      });
    }
  }
  detectarCambios(): void {
    this.hayCambios = !this.sonDatosIguales();
  }
  
  sonDatosIguales(): boolean {
    // Obtener los valores actuales del formulario
    const formularioActual = this.usuarioForm.value;
    console.log('formularioActual:', JSON.stringify(this.usuarioForm.value));
    console.log('usuarioOriginal:', JSON.stringify(this.usuarioOriginal));
    // Comparar los valores actuales con los valores originales
    return JSON.stringify(formularioActual) === JSON.stringify(this.usuarioOriginal);
  }
  
    
}
