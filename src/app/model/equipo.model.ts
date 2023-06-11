export interface Equipo {
  idEquipo: number;
  nombreEquipo: string;
  descripcionEquipo: string;
  marca: string;
  modelo: string;
  numSerie: number;
  fechaAlta: Date;
  fechaBaja: Date;

  estadoEquipo: string;
  puestoEquipo: string;
  tipoEquipo: string;
  descripcionPuesto: string;
  telefono: string;

  ubicacion: string;
  nombreSector: string;
  nombreEstablecimiento: string;

  // idEstadoEquipo: number;
  // idPuesto: string;
  // idTipo: string;
  // idSector: number;
  // idEstablecimiento: number;

}
