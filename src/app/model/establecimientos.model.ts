import { Time } from "@angular/common";
import { Sector } from "./sector.model";
import { Pais } from "./pais.model";
import { Provincia } from "./provincia.model";
import { Localidad } from "./localidad.model";
import { Estadisticas } from "./estadisticas.model";

export class Establecimiento {
  idEstablecimiento!: number;
  nombre!: string;
  calle!: string;
  altura!: string;
  telefono!: string;
  correo!: string;
  cuit!: string;
  descripcion!: string;
  sitioweb!: string;
  idPais!: number;
  idLocalidad!: number;
  idProvincia!: number;
  horaEntrada!: Time;
  horaSalida!: Time;

  nombreEstablecimiento!: string;

  pais!: Pais;
  provincia!: Provincia;
  localidad!: Localidad;

  sectores!: Sector[];
  estadisticas!: Estadisticas;

  totalIncidentes!: number;


  paisEstablecimiento!: string;
  provinciaEstablecimiento!: string;
  localidadEstablecimiento!: string;


  
}
