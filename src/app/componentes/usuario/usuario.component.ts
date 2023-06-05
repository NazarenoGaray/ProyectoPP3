import { Component } from '@angular/core';
import { Usuario } from '../model/usuario.model';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {
  id_usuario!: number;
  usuario!: Usuario;
}
