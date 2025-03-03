import { Usuario } from "../model/usuario.model";

export class comentarios_incidente {
    idComentario!: number;
    comentario!: string;
    fechaHora!: Date;
    idUsuario!: number;
    idIncidente!: number;
    idTipoComentario!: number;
    usuario!: Usuario;


    nombreUsuario!: string;
    apellidoUsuario!: string;
    comentarioIncidente!: string;
    tipoComentario!: string;
    rolUsuario!: string;
    fechaComentario!: Date;


}