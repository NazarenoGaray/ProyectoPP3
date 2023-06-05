import { Time } from "@angular/common";

export interface Establecimiento {
  idEstablecimiento: number;
  nombreEstablecimiento: string;
  IDPais: number;
  IDProvincia: number;
  IDLocalidad: number;
  calle: string;
  altura: string;
  horario_entrada: Time;
  horario_salida: Time;
  correo: string;
  telefono: string;
}
