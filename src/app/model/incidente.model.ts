import { Time } from "@angular/common";

import { Establecimiento } from "./establecimientos.model";

import { categoria_incidente, estado_incidente, prioridad_incidente } from "./categoria_incidente.model";

import { Equipo } from "./equipo.model";

import { Sector } from "./sector.model";

import { comentarios_incidente } from "./comentarios_incidente.model";

import { incidenteAgenda } from "./incidente_agenda.model";
import { Usuario } from "./usuario.model";



export class Incidente {
 
  idIncidente!: number;

  titulo!: string;

  titulo_incidente!: string;

  tarea!: string;

  descripcion!: string;

  fechaInicio!: Date;

  fechaCierre!: Date;



  fechaAgenda!: Date;

  horaInicioAgenda!: Time;

  horaFinAgenda!: Time;



  establecimientos!: Establecimiento;

  estado_incidente!: estado_incidente;

  categoria_incidente!: categoria_incidente;

  prioridad_incidente!: prioridad_incidente;

  equipos!: Equipo;
  usuarios!: Usuario;

  sectores!: Sector;

  comentarios_incidente!: comentarios_incidente;

  incidente!: Incidente;

  incidente_agenda!: incidenteAgenda



  comentarioIncidente!: string;

  tipoComentario!: string;

  idUsuarios!: number[];
  idEquipos!: number[];
  idEstablecimiento!: number;
  idSector!: number;
}