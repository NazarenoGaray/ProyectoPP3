import { Establecimiento } from "./establecimientos.model";
import { estado_equipo } from "./estado_equipo.model";
import { Puesto } from "./puesto.model";
import { Sector } from "./sector.model";
import { tipo_equipo } from "./tipo_equipo.model";
import { Incidente } from "./incidente.model";
import { Usuario } from "../model/usuario.model";

export interface Equipo {
  idEquipo: number;
  nombre: string;
  descripcion: string;
  marca: string;
  modelo: string;
  numeroSerie: number;
  fechaAlta: Date;
  fechaBaja: Date;

  tipo_equipo: tipo_equipo,
  estado_equipo: estado_equipo,
  puestos: Puesto,
  sectores: Sector,
  incidente: Incidente,
  usuario: Usuario;

  idSector: number;
  nombreSector: string;
  ubicacionSector: string;

  idPuesto: number;
  puestoRed: string;
  puestoDescripcion: string;
  puestoTelefono: string;

  
  idIncidente: number;
  titulo_incidente: string;
  comentario: string;
  fechaComentario: Date;
  nombreUsuario:  string;
  apellidoUsuario:  string;

  estadoEquipo:  string;

  tipoEquipo: string;

  idEstablecimiento: number;
  establecimientoNombre: string;



}
