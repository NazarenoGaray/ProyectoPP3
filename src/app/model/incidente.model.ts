export interface Incidente {
  idIncidente: number;
  tarea: string;
  descripcionIncidente: string;
  fechaInicio: Date;
  fechaCierre: Date;
  nombreUsuario: string;
  nombreSector: string;

  estadoIncidente: string;
  prioridad: string;
  categoria: string;
  informe: string;
  nombreEstablecimiento: string;
}
