import { estado_usuarios } from "./estado_usuarios.model";
import { Incidente } from "./incidente.model";
import { incidente_usuario } from "./incidente_usuario.model";
import { Localidad } from "./localidad.model";
import { Pais } from "./pais.model";
import { Provincia } from "./provincia.model";
import { Rol } from "./roles.model";

export class Usuario {
  incidentes!: Incidente[];

  idUsuario!: number;
  nombre!: string;

  apellido!: string;
  direccion!: string;
  telefono!: string;
  correo!: string;
  contrasena!: string;
  rol!: Rol;
  pais!: Pais;
  provincia!: Provincia;
  localidad!: Localidad;
  estado_usuario!: estado_usuarios;
  incidente_usuario!: incidente_usuario;
  usuario!: Usuario;
  esObservador!: number;
  // nombreUsuario: string;
  // apellidoUsuario: string;
  // rolUsuario: string;

  observadorIncidente!: number;

  idRol!: number;
  idPais!: number;
  idProvincia!: number;
  idLocalidad!: number;
  idEstadoUsuario!: number;

  message!: any;

}

