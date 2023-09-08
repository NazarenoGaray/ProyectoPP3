import { Equipo } from "./equipo.model";
import { Sector } from "./sector.model";

export class Puesto {
    idPuesto!: number;
    puestoRed!: number;
    telefono!: string;
    descripcion!: string;
    idSector!: number;

    sector!: Sector;
    equipos!: Equipo[];
    sectores!: Sector[];

}
