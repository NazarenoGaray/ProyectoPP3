import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
  selector: 'app-alta-usuarios',
  templateUrl: './alta-usuarios.component.html',
  styleUrls: ['./alta-usuarios.component.css']
})
export class AltaUsuariosComponent implements OnInit {

  usuarioForm!: FormGroup;
  usuario!: Usuario;
  roles: Rol[] = [];
  estados: estado_usuarios[] = [];
  paises: Pais[] = [];
  provincias: Provincia[] = [];
  localidades: Localidad[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private rolService: RolService,
    private estadoService: EstadoUsuariosService,
    private ubicacionService: UbicacionService,
    private router: Router
  ) { }

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
      pais: new FormControl({ value: '', disabled: false }, Validators.required),
      provincia: new FormControl({ value: '', disabled: true }, Validators.required),
      localidad: new FormControl({ value: '', disabled: true }, Validators.required),
      id_estado_usuario: ['', Validators.required]
      
    });
    
    //////////////////////////////////////////////////////////////////////////
    this.rolService.obtenerRoles().subscribe(
      (res: Rol[]) => {
        this.roles = res;
      },
      (err: any) => {
        console.log(`Error al obtener los roles: ${err.message}`);
      }
    );
    //////////////////////////////////////////////////////////////////////////
    this.estadoService.obtenerEstadosUsuarios().subscribe(
      (res: estado_usuarios[]) => {
        this.estados = res;
      },
      (err: any) => {
        console.log(`Error al obtener los estados: ${err.message}`);
      }
    );
    ////////////////////////////////////////////////////////////////////////
    this.ubicacionService.getPaises().subscribe((data: any[]) => {
      this.paises = data;
    });
    //this.getPaises();
  }

  validateCorreo(control: AbstractControl): { [key: string]: any } | null {
    if (control.value && control.value.length < 5) {
      return { correoInvalido: true };
    }
    return null;
  }
  onPaisSelected() {
    const paisId = this.usuarioForm.value.pais;
    this.usuarioForm.get('provincia')?.setValue('');
    this.usuarioForm.get('provincia')?.disable();
    this.usuarioForm.get('localidad')?.setValue('');
    this.usuarioForm.get('localidad')?.disable();
    this.provincias = [];

    if (paisId) {
      this.ubicacionService.getProvincias(paisId).subscribe((data: any[]) => {
        this.provincias = data;
        this.usuarioForm.get('provincia')?.enable();
      });
    }
  }

  onProvinciaSelected() {
    const provinciaId = this.usuarioForm.value.provincia;
    this.usuarioForm.get('localidad')?.setValue('');
    this.usuarioForm.get('localidad')?.disable();
    this.localidades = [];

    if (provinciaId) {
      this.ubicacionService.getLocalidades(provinciaId).subscribe((data: any[]) => {
        this.localidades = data;
        this.usuarioForm.get('localidad')?.enable();
      });
    }
  }
  onSubmit(): void {
    if (this.usuarioForm.invalid) {
      return;
    }

    this.usuario = this.usuarioForm.value;
    this.usuarioService.crearUsuario(this.usuario).subscribe(
      (res: any) => {
        console.log('Usuario agregado exitosamente');
        this.router.navigate(['/listar-usuarios']);
      },
      (err: any) => {
        console.log(`Error al agregar el usuario: ${err.message}`);
      }
    );
  }

}
