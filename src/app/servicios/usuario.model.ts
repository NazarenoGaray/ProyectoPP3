export interface Usuario {
    id?: number;
    nombre: string;
    apellido: string;
    direccion: string;
    telefono: string;
    correo: string;
    domicilio: string;
    usuario: string;
    contrasena: string;
    rol: 'administrador' | 'gerencial' | 'mesa de ayuda'| 'tecnico';
  }
  