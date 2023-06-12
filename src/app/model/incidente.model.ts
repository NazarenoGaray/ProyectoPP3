export interface Incidente {
  idIncidente: number;
  tarea: string;
  descripcionIncidente: string;
  fechaInicio: Date;
  fechaCierre: Date;
  nombreUsuario: string;

  estadoIncidente: string;
  categoria: string;
  informe: string;
  nombreEstablecimiento: string;
}