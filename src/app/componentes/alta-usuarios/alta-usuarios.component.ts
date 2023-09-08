import { Component, OnInit,ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatStepper, StepperOrientation } from '@angular/material/stepper';
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
import { Observable } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-alta-usuarios',
  templateUrl: './alta-usuarios.component.html',
  styleUrls: ['./alta-usuarios.component.css']
})
export class AltaUsuariosComponent implements OnInit {

  @ViewChild('stepper') stepper: MatStepper | undefined;

  usuarioForm!: FormGroup;
  usuario!: Usuario;
  roles!: Rol[];
  estados!: estado_usuarios[];
  paises!: Pais[];
  provincias!: Provincia[];
  localidades!: Localidad[];

  isLinear = false; 
  stepperOrientation: Observable<StepperOrientation>;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private rolService: RolService,
    private estadoService: EstadoUsuariosService,
    private ubicacionService: UbicacionService,
    private router: Router,
    breakpointObserver: BreakpointObserver
  ) { 
    this.stepperOrientation = breakpointObserver
    .observe('(min-width: 800px)')
    .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit(): void {
    this.usuarioForm = this.formBuilder.group({

      // FORMULARIO PRIMERA PARTE
      datosPersonales: this.formBuilder.group({
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        telefono: ['', Validators.required],
        idPais: new FormControl( { value: '', disabled: false }, Validators.required),
        idProvincia: new FormControl({ value: '', disabled: true },Validators.required ),
        idLocalidad: new FormControl({ value: '', disabled: true },Validators.required),
        direccion: ['', Validators.required],
      }),

      // FORMULARIO SEGUNDA PARTE
      datosUsuario: this.formBuilder.group({
        correo: [ '',[Validators.required, Validators.email, this.validateCorreo],],
        usuario: ['', Validators.required],
        contraseña: ['', Validators.required],
        idRol: ['', Validators.required],
        idEstadoUsuario: ['', Validators.required],
      }),
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
        console.log(`estados obtenidos: `,this.estados);
    },
      (err: any) => {
        console.log(`Error al obtener los estados del usuario: ${err.message}`);
      }
    );
    ////////////////////////////////////////////////////////////////////////
    this.ubicacionService.obtenerPaises().subscribe((data: Pais[]) => {
      this.paises = data;
      console.log('Paises recuperados:', data);
    });
  }

  validateCorreo(control: AbstractControl): { [key: string]: any } | null {
    if (control.value && control.value.length < 5) {
      return { correoInvalido: true };
    }
    return null;
  }

  onPaisSelected() {
    //const paisId = this.usuarioForm.value.idPais;
    const paisId = this.usuarioForm.get('datosPersonales.idPais')?.value;
    console.log('onPaisSelected() llamado');
    this.usuarioForm.get('datosPersonales.idProvincia')?.setValue('');
    this.usuarioForm.get('datosPersonales.idProvincia')?.disable();
    this.usuarioForm.get('datosPersonales.idLocalidad')?.setValue('');
    this.usuarioForm.get('datosPersonales.idLocalidad')?.disable();
    this.provincias = [];

    if (paisId) {
      this.ubicacionService.obtenerProvinciaPorId(paisId).subscribe((data: Provincia[]) => {
        console.log('provinciadata:', data);
        this.provincias = data;
        this.usuarioForm.get('datosPersonales.idProvincia')?.enable();
      },
        (err: any) => {
          console.log(`Error al agregar el usuario: ${err.message}`);
        });
    }
  }

  onProvinciaSelected() {
    //const provinciaId = this.usuarioForm.value.datosPersonales.idProvincia;
    const provinciaId = this.usuarioForm.get('datosPersonales.idProvincia')?.value;
    console.log('onProvinciaSelected() llamado');
    this.usuarioForm.get('datosPersonales.idLocalidad')?.setValue('');
    this.usuarioForm.get('datosPersonales.idLocalidad')?.disable();
    this.localidades = [];

    if (provinciaId) {
      this.ubicacionService.obtenerLocalidadPorId(provinciaId).subscribe((data: Localidad[]) => {
        this.localidades = data;
        this.usuarioForm.get('datosPersonales.idLocalidad')?.enable();
      });
    }
  }

  crearUsuario() {
    if (this.usuarioForm.invalid) {
      return;
    }
    const datosPersonales = this.usuarioForm.get('datosPersonales')?.value;
    const datosUsuario = this.usuarioForm.get('datosUsuario')?.value;
  
    const datosUsuarioCompleto = {
      ...datosPersonales,
      ...datosUsuario
    };
    console.log("datos enviados: ",datosUsuarioCompleto);
    this.usuarioService.crearUsuario(datosUsuarioCompleto).subscribe(
      (res: any) => {
        
        console.log('Usuario agregado exitosamente', this.usuario);
        console.log('Respuesta del serv', res);
        this.router.navigate(['/listar-usuarios']);
      },
      (err: any) => {
        console.log(`Error al agregar el Usuario: ${err.message}`);
        console.log('error: ',err.message);
      }
    );
  } 


}
