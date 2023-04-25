import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioSesionComponent } from './componentes/inicio-sesion/inicio-sesion.component';
import { ListarUsuariosComponent } from './componentes/listar-usuarios/listar-usuarios.component';
import { AltaUsuariosComponent } from './componentes/alta-usuarios/alta-usuarios.component';
import { ListarEstablecimientosComponent } from './componentes/listar-establecimientos/listar-establecimientos.component';
import { EditarUsuariosComponent } from './componentes/editar-usuarios/editar-usuarios.component';
import { BienvenidoComponent } from './componentes/bienvenido/bienvenido.component';
import { AltaEstablecimientosComponent } from './componentes/alta-establecimientos/alta-establecimientos.component';
import { EditarEstablecimientosComponent } from './componentes/editar-establecimientos/editar-establecimientos.component';
import { Error404Component } from './componentes/error404/error404.component';

const routes: Routes = [
  { path: '', component: InicioSesionComponent },
  { path: 'bienvenido', component: BienvenidoComponent },
  { path: 'alta-usuario', component : AltaUsuariosComponent},
  { path: 'listar-usuarios', component : ListarUsuariosComponent},
  { path: 'editar-usuarios', component : EditarUsuariosComponent},
  { path: 'alta-establecimiento', component: AltaEstablecimientosComponent},
  { path: 'listar-establecimientos', component : ListarEstablecimientosComponent},
  { path: 'editar-establecimiento', component : EditarEstablecimientosComponent},
  { path: '**', component : Error404Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
