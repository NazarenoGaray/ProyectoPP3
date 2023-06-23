export interface Incidente {
  idIncidente: number;
  tarea: string;
  descripcionIncidente: string;
  fechaInicio: Date;
  fechaCierre: Date;
  nombreUsuario: string;
  apellidoUsuario: string;
  nombreSector: string;

  estadoIncidente: string;
  prioridad: string;
  categoria: string;
  informeTecnico: string;
  nombreEstablecimiento: string;
}
