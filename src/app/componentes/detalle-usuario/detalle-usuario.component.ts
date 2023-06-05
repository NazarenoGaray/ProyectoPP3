import { Component } from '@angular/core';
import { Usuario } from 'src/app/servicios/usuario.model';

@Component({
  selector: 'app-detalle-usuario',
  templateUrl: './detalle-usuario.component.html',
  styleUrls: ['./detalle-usuario.component.css']
})
export class DetalleUsuarioComponent {
  id_usuario!: number;
  usuario!: Usuario;
}
