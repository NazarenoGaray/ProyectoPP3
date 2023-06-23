import { Time } from "@angular/common";
import { Sector } from "./sector.model";

export interface Establecimiento {
  idEstablecimiento: number;
  nombre: string;
  calle: string;
  altura: string;
  idLocalidad: number;
  idProvincia: number;
  idPais: number;
  horaEntrada: Time;
  horaSalida: Time;
  correo: string;
  telefono: string;

  nombreEstablecimiento: string;
  localidad: string;
  provincia: string;
  pais: string;
  sectores: Sector[];

  cuit:string;
}
