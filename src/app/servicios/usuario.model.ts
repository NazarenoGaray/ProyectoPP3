export class Usuario {
  constructor(
    public id_usuario: number,
    public nombre: string,
    public apellido: string,
    public direccion: string,
    public telefono: string,
    public correo: string,
    public usuario: string,
    public contrasena: string,
    public id_rol: number,
    public IDPais: number,
    public IDProvincia: number,
    public IDLocalidad: number,
    public id_estado_usuario: number,

  ) {}
}
