import { Time } from "@angular/common";
import { Establecimiento } from "./establecimientos.model";
import { categoria_incidente } from "./categoria_incidente.model";
import { Equipo } from "./equipo.model";
import { Sector } from "./sector.model";
import { comentarios_incidente } from "./comentarios_incidente.model";
import { Usuario } from "./usuario.model";

export class Incidente {
  idIncidente!: number;
  titulo!: string;
  tarea!: string;
  descripcionIncidente!: string;
  fechaInicio!: Date;
  fechaCierre!: Date;

  fechaAgenda!: Date;
  horaInicioAgenda!: Time;
  horaFinAgenda!: Time;

  establecimientos!: Establecimiento;
  estado_incidente!: categoria_incidente;
  categoria_incidente!: categoria_incidente;
  prioridad_incidente!: categoria_incidente;
  equipos: Equipo[]=[];
  usuarios: Usuario[]=[];
  idEquipos: number[]=[];
  idUsuarios: number[]=[];
  sectores!: Sector;
  comentarios_incidente!: comentarios_incidente;

  nombreUsuario!: string;
  apellidoUsuario!: string;
  rolUsuario!: string;

  idSector!: number;
  nombreSector!: string;

  estadoIncidente!: string;
  prioridad!: string;
  categoria!: string;
  informeTecnico!: string;

  idEstablecimiento!: number;
  nombreEstablecimiento!: string;
  calle!: string;
  altura!: string;

  ultimaModificacion!: Date;
  rolUsuarioModificacion!: string;
}
