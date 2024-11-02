import { Equipo } from "./equipo.model";
import { Establecimiento } from "./establecimientos.model";
import { Puesto } from "./puesto.model";

export class Sector {
  idSector!: number;
  nombre!: string;
  ubicacion!: string;

  puestos!: Puesto[];
  equipos!: Equipo[];
  
  establecimiento!: Establecimiento;

}
