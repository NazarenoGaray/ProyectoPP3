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
import { SobreNosotrosComponent } from './componentes/nosotros/sobre-nosotros.component';
import { UsuarioComponent } from './componentes/usuario/usuario.component';
import { SectorComponent } from './componentes/sector/sector.component';
import { EquipoComponent } from './componentes/equipo/equipo.component';
import { AltaSectorComponent } from './componentes/alta-sector/alta-sector.component';
import { TokenGuard } from './guards/token.guard';
import { VistaTecnicoComponent } from './componentes/vista-tecnico/vista-tecnico.component';
import { EditarIncidentesComponent } from './componentes/editar-incidentes/editar-incidentes.component';
import { AltaEquiposComponent } from './componentes/alta-equipos/alta-equipos.component';
import { EditarEquiposComponent } from './componentes/editar-equipos/editar-equipos.component';
import { GestionComponent } from './componentes/vistas/gestion/gestion.component';


const routes: Routes = [
  { path: '', component: BienvenidoComponent },
  { path: 'bienvenido', component: BienvenidoComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'nosotros', component: SobreNosotrosComponent },
  { path: 'inicio-sesion', component: InicioSesionComponent },
  { path: 'alta-usuario', component: AltaUsuariosComponent , canActivate:[TokenGuard]},
  { path: 'listar-usuarios', component: ListarUsuariosComponent , canActivate:[TokenGuard]},
  { path: 'editar-usuario/:id', component: EditarUsuariosComponent , canActivate:[TokenGuard]},
  { path: 'usuario/:idUsuario', component: UsuarioComponent , canActivate:[TokenGuard]},
  { path: 'alta-establecimiento', component: AltaEstablecimientosComponent , canActivate:[TokenGuard]},
  { path: 'listar-establecimientos', component: ListarEstablecimientosComponent , canActivate:[TokenGuard]},
  { path: 'editar-establecimiento/:idEstablecimiento', component: EditarEstablecimientosComponent , canActivate:[TokenGuard]},
  { path: 'establecimiento/:idEstablecimiento', component: EstablecimientoComponent , canActivate:[TokenGuard]},
  { path: 'sector/:id', component: SectorComponent , canActivate:[TokenGuard]},
  { path: 'equipo/:idEquipo', component: EquipoComponent , canActivate:[TokenGuard]},
  { path: 'cargar-incidente', component: CargarIncidenteComponent , canActivate:[TokenGuard]},
  { path: 'listar-incidentes',component: ListarIncidentesComponent, canActivate:[TokenGuard],
    children: [{ path: ':idEstablecimiento', component: ListarIncidentesComponent }]},
  { path: 'incidente/:idIncidente', component: IncidenteComponent , canActivate:[TokenGuard]},
  { path: 'alta-sector', component: AltaSectorComponent , canActivate:[TokenGuard]},
  { path: 'alta-sector/:idEstablecimiento', component: AltaSectorComponent , canActivate:[TokenGuard]},

  { path: 'vista-tecnico/:idUsuario', component: VistaTecnicoComponent , canActivate:[TokenGuard]},
  { path: 'editar-incidente/:idIncidente', component: EditarIncidentesComponent , canActivate:[TokenGuard]},

  { path: 'alta-equipo', component: AltaEquiposComponent , canActivate:[TokenGuard]},
  { path: 'editar-equipo/:idEquipo', component: EditarEquiposComponent , canActivate:[TokenGuard]},

  { path: 'gestion', component: GestionComponent , canActivate:[TokenGuard]},


  { path: '**', component: Error404Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }