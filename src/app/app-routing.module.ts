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
import { CargarIncidenteComponent } from './componentes/cargar-incidente/cargar-incidente.component';
import { ListarIncidentesComponent } from './componentes/listar-incidentes/listar-incidentes.component';
import { IncidenteComponent } from './componentes/incidente/incidente.component';
import { EstablecimientoComponent } from './componentes/establecimiento/establecimiento.component';
import { ContactoComponent } from './componentes/contacto/contacto.component';
import { SobreNosotrosComponent } from './componentes/sobre-nosotros/sobre-nosotros.component';

const routes: Routes = [
  { path: '', component: BienvenidoComponent },
  { path: 'bienvenido', component: BienvenidoComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'sobreNosotros', component: SobreNosotrosComponent },
  { path: 'inicio-sesion', component: InicioSesionComponent },
  { path: 'alta-usuario', component: AltaUsuariosComponent },
  { path: 'listar-usuarios', component: ListarUsuariosComponent },
  { path: 'editar-usuario/:id', component: EditarUsuariosComponent },
  { path: 'alta-establecimiento', component: AltaEstablecimientosComponent },
  { path: 'listar-establecimientos', component: ListarEstablecimientosComponent },
  { path: 'editar-establecimiento', component: EditarEstablecimientosComponent },
  { path: 'cargar-incidente', component: CargarIncidenteComponent },
  { path: 'incidente', component: IncidenteComponent },
  { path: 'listar-incidentes', component: ListarIncidentesComponent },
  { path: 'establecimiento/:id', component: EstablecimientoComponent },
  { path: '**', component: Error404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
