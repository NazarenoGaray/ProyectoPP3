import { Usuario } from "./usuario.model";

export class comentarios_incidente {
    idComentario!: number;
    comentario!: string;
    fechaHora!: Date;
    idUsuario!: number;
    idIncidente!: number;
    idTipoComentario!: number;
    usuario!: Usuario;

}