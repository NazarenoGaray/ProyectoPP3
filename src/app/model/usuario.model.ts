export class Usuario {
  constructor(
    public idUsuario: number,
    public nombre: string,
    public apellido: string,
    public direccion: string,
    public telefono: string,
    public correo: string,
    public usuario: string,
    public contrasena: string,
    public idRol: number,
    public idPais: number,
    public idProvincia: number,
    public idLocalidad: number,
    public idEstadoUsuario: number,
    public rol: string,
    public pais: string,
    public provincia: string,
    public localidad: string,
    public estado: string,

  ) {}
}
