import { estado_equipo } from "./estado_equipo.model";
import { Puesto } from "./puesto.model";
import { Sector } from "./sector.model";
import { tipo_equipo } from "./tipo_equipo.model";

export interface Equipo {
  idEquipo: number;
  nombre: string;
  descripcionEquipo: string;
  marca: string;
  modelo: string;
  numeroSerie: number;
  fechaAlta: Date;
  fechaBaja: Date;

  tipo_equipo: tipo_equipo,
  estado_equipo: estado_equipo,
  puestos: Puesto,
  // estadoEquipo: string;
  // tipoEquipo: string;
  puestoEquipo: string;
  descripcionPuesto: string;
  telefono: string;

  ubicacion: string;
  nombreSector: string;
  nombreEstablecimiento: string;

  // idEstadoEquipo: number;
  // idPuesto: string;
  // idTipo: string;

  //equipo.component.html
  idIncidente: number;
  fechaInicio: Date;
  tarea: string;
  descripcion: string;
  ultimaModificacion: Date;
  nombreUsuario: string;
  apellidoUsuario: string;

  informeTecnico: string;

  // idEstablecimiento: number;
  // idSector: number;


}
