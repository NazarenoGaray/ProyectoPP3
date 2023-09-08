import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { estado_usuarios } from 'src/app/model/estado_usuarios.model';
import { Rol } from 'src/app/model/roles.model';
import { Usuario } from 'src/app/model/usuario.model';
import { LoadingService } from 'src/app/servicios/loading.service';
import { EstadoUsuariosService } from 'src/app/servicios/usuarios/estado-usuarios.service';
import { RolService } from 'src/app/servicios/usuarios/roles.service';
import { UsuarioService } from 'src/app/servicios/usuarios/usuario.service';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  usuariosOriginales: Usuario[] = [];
  roles: Rol[] = [];
  rol!: Rol;
  estados: estado_usuarios[] = [];
  usuarioForm!: FormGroup;
  
  filtroId: string = '';
  filtroNombre: string = '';
  filtroApellido: string = '';
  filtroCorreo: string = '';
  filtroRol: string = '';
  filtroEstado: string = '';

  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private router: Router,
    private formBuilder: FormBuilder,
    private loadingService: LoadingService,
    private rolService: RolService,
    private estadoService: EstadoUsuariosService,
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.fetchData();
    // this.route.paramMap.subscribe(params => {
    //   const idEstablecimiento = params.get('idEstablecimiento');
    //   if (idEstablecimiento) {
    //     this.obtenerIncidentesPorEstablecimiento(Number(idEstablecimiento));
    //   } 
    // });
    
  }
  initializeForm(): void {
    this.usuarioForm = this.formBuilder.group({
      id: [''],
      nombre: [''],
      apellido: [''],
      correo: [''],
      rol: [''],
      estado: [''],
    });
  }
  obtenerUsuarios() {
    this.loadingService.show();
    this.usuarioService.obtenerUsuarios().subscribe(
      (response) => {
        this.loadingService.hide()
        this.usuarios = Object.values(response);
        this.usuariosOriginales=this.usuarios;
        console.log("usuario obtenido:",this.usuarios);
        console.log("usuarioOrigin obtenido:",this.usuariosOriginales);
      },
      (error) => {
        this.loadingService.hide()
        console.error(error);
      }
    );
  }
  getEstado(){
    return this.loadingService.getEstado();
  } 
  detallesUsuario(idUsuario: number) {
    this.router.navigate(['/usuario',idUsuario]);
  }
  fetchData():void {
    this.rolService.obtenerRoles().subscribe((data: Rol[]) => {
      console.log("roles",data);
      this.roles = data;
    });
    this.estadoService.obtenerEstadosUsuarios().subscribe((data: estado_usuarios[]) => {
      console.log("estados:",data);
      this.estados = data;
    });
  }
  onSubmit(): void {
    this.loadingService.show();
    if (this.usuarioForm.invalid) {
    console.log("datos enviados del usuario:", this.usuarioForm.value);
      return;
    }

    const usuario: any = this.usuarioForm.value;

    console.log("datos enviados del usuario:", this.usuarioForm.value);
    console.log("datos enviados del usuario:", usuario);
     this.usuarioService.obtenerUsuariosFiltro(usuario).subscribe(
       (data: Usuario[]) => {
        this.loadingService.hide();
         console.log('Busqueda exitosa:',data); 
         this.usuarios=data;      
       },
       (error: any) => {
        this.loadingService.hide();
         console.log(`Error al buscar el/los usuario/s: ${error.message}`);
       }
    );
  }
}
