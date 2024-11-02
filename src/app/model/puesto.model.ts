import { Equipo } from "./equipo.model";
import { Sector } from "./sector.model";

export class Puesto {
    idPuesto!: number;
    puestoRed!: number;
    telefono!: string;
    descripcion!: string;

    sectores!: Sector;
    equipos!: Equipo[];
    puesto!: Puesto;

    idEstablecimiento!: number;
    idSector!: number;
  mostrarEquipos!: boolean;

}
