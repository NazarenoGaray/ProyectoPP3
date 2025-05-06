import { RouterModule, Routes } from "@angular/router";
import { BienvenidoComponent } from "./componentes/globales/bienvenido/bienvenido.component";
import { ContactoComponent } from "./componentes/globales/contacto/contacto.component";
import { SobreNosotrosComponent } from "./componentes/globales/nosotros/sobre-nosotros.component";
import { InicioSesionComponent } from "./componentes/inicio-sesion/inicio-sesion.component";
import { AltaUsuariosComponent } from "./componentes/usuarios/alta-usuarios/alta-usuarios.component";
import { ListarUsuariosComponent } from "./componentes/usuarios/listar-usuarios/listar-usuarios.component";
import { EditarUsuariosComponent } from "./componentes/usuarios/editar-usuarios/editar-usuarios.component";
import { UsuarioComponent } from "./componentes/usuarios/usuario/usuario.component";
import { TokenGuard } from "./guards/token.guard";
import { AltaEstablecimientosComponent } from "./componentes/establecimientos/alta-establecimientos/alta-establecimientos.component";
import { ListarEstablecimientosComponent } from "./componentes/establecimientos/listar-establecimientos/listar-establecimientos.component";
import { EditarEstablecimientosComponent } from "./componentes/establecimientos/editar-establecimientos/editar-establecimientos.component";
import { EstablecimientoComponent } from "./componentes/establecimientos/establecimiento/establecimiento.component";
import { AltaSectorComponent } from "./componentes/sectores/alta-sector/alta-sector.component";
import { SectorComponent } from "./componentes/sectores/sector/sector.component";
import { CargarIncidenteComponent } from "./componentes/incidentes/cargar-incidente/cargar-incidente.component";
import { VistaGerencialComponent } from "./componentes/vista-gerencial/vista-gerencial.component";
import { PuestoComponent } from "./componentes/puestos/puesto/puesto.component";
import { UserIdGuard } from "./guards/user-id.guard";
import { GestionComponent } from "./componentes/vistas/gestion/gestion.component";
import { VistaTecnicoComponent } from "./componentes/vistas/vista-tecnico/vista-tecnico.component";
import { EditarEquiposComponent } from "./componentes/equipos/editar-equipos/editar-equipos.component";
import { AltaEquiposComponent } from "./componentes/equipos/alta-equipos/alta-equipos.component";
import { EquipoComponent } from "./componentes/equipos/equipo/equipo.component";
import { IncidenteComponent } from "./componentes/incidentes/incidente/incidente.component";
import { ListarIncidentesComponent } from "./componentes/incidentes/listar-incidentes/listar-incidentes.component";
import { NgModule } from "@angular/core";
import { GatewayTimeoutComponent } from "./componentes/globales/pagErrores/gateway-timeout/gateway-timeout.component";
import { ServiceUnavailableComponent } from "./componentes/globales/pagErrores/service-unavailable/service-unavailable.component";
import { InternalServerErrorComponent } from "./componentes/globales/pagErrores/internal-server-error/internal-server-error.component";
import { ForbiddenComponent } from "./componentes/globales/pagErrores/forbidden/forbidden.component";
import { UnauthorizedComponent } from "./componentes/globales/pagErrores/unauthorized/unauthorized.component";
import { NotFoundComponent } from "./componentes/globales/pagErrores/not-found/not-found.component";
import { NotImplementedComponent } from "./componentes/globales/pagErrores/not-implemented/not-implemented.component";
import { BadRequestComponent } from "./componentes/globales/pagErrores/bad-request/bad-request.component";
import { EditarSectorComponent } from "./componentes/sectores/editar-sector/editar-sector.component";
import { ModificarIncidenteComponent } from "./componentes/incidentes/modificar-incidente/modificar-incidente.component";
import { AltaPuestoComponent } from "./componentes/puestos/alta-puesto/alta-puesto.component";
import { RoleGuard } from "./guards/role.guard";
import { CambiarClaveComponent } from "./componentes/usuarios/cambiar-clave/cambiar-clave.component";



const routes: Routes = [
  { path: '', component: BienvenidoComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'nosotros', component: SobreNosotrosComponent },
  
  { path: 'inicio-sesion', component: InicioSesionComponent },
  { path: 'alta-usuario', component: AltaUsuariosComponent , canActivate:[TokenGuard, RoleGuard], data: { roles: [1] } },
  { path: 'listar-usuarios', component: ListarUsuariosComponent, canActivate: [TokenGuard, RoleGuard], data: { roles: [1, 2] } },
  { path: 'cambiar-clave', component: CambiarClaveComponent , canActivate:[TokenGuard]},
  { path: 'editar-usuario/:id', component: EditarUsuariosComponent, canActivate: [TokenGuard, RoleGuard], data: { roles: [1] } },
  { path: 'usuario/:idUsuario', component: UsuarioComponent , canActivate:[TokenGuard, RoleGuard], data: { roles: [1, 2] } },
  
  { path: 'listar-establecimientos', component: ListarEstablecimientosComponent , canActivate:[TokenGuard, RoleGuard], data: { roles: [1, 2, 3, 4] }},
  { path: 'alta-establecimiento', component: AltaEstablecimientosComponent , canActivate:[TokenGuard, RoleGuard], data: { roles: [1, 3] } },
  { path: 'editar-establecimiento/:idEstablecimiento', component: EditarEstablecimientosComponent , canActivate:[TokenGuard, RoleGuard], data: { roles: [1, 3] }},
  { path: 'establecimiento/:idEstablecimiento', component: EstablecimientoComponent , canActivate:[TokenGuard, RoleGuard], data: { roles: [1, 3] }},
  
  { path: 'alta-sector', component: AltaSectorComponent , canActivate:[TokenGuard, RoleGuard], data: { roles: [1, 3] }},
  { path: 'alta-sector/:idEstablecimiento', component: AltaSectorComponent , canActivate:[TokenGuard, RoleGuard], data: { roles: [1, 3] }},
  { path: 'sector/:idSector', component: SectorComponent, canActivate: [TokenGuard, RoleGuard], data: { roles: [1, 2, 3] } },
  { path: 'editar-sector/:idSector', component: EditarSectorComponent, canActivate: [TokenGuard, RoleGuard], data: { roles: [1, 3] } },
  
  { path: 'listar-incidentes', canActivate: [TokenGuard, RoleGuard], 
    data: { roles: [1, 2, 3, 4] }, 
    children: [
      { path: '', component: ListarIncidentesComponent }, // Sin parámetro, muestra todos
      { path: ':idEstablecimiento', component: ListarIncidentesComponent }
    ]
  },
  { path: 'incidente/:idIncidente', component: IncidenteComponent , canActivate:[TokenGuard, RoleGuard], data: { roles: [1, 2, 3,4] }},
  { path: 'cargar-incidente', component: CargarIncidenteComponent, canActivate: [TokenGuard, RoleGuard], data: { roles: [1, 3, 4] } },
  { path: 'actualizar-incidente/:idIncidente', component: ModificarIncidenteComponent , canActivate:[TokenGuard, RoleGuard], data: { roles: [1, 3, 4] }},
  
  { path: 'equipo/:idEquipo', component: EquipoComponent , canActivate:[TokenGuard, RoleGuard], data: { roles: [1, 2, 3, 4] }},
  { path: 'alta-equipo', component: AltaEquiposComponent , canActivate:[TokenGuard, RoleGuard], data: { roles: [1, 3] }},
  { path: 'editar-equipo/:idEquipo', component: EditarEquiposComponent , canActivate:[TokenGuard, RoleGuard], data: { roles: [1, 3] }},
  { path: 'alta-equipo/:idPuesto', component: AltaEquiposComponent, canActivate: [TokenGuard, RoleGuard], data: { roles: [1, 3] } },
  { path: 'editar-equipo/:idEquipo', component: EditarEquiposComponent, canActivate: [TokenGuard, RoleGuard], data: { roles: [1, 3] } },
  
  { path: 'alta-puesto/:idSector', component: AltaPuestoComponent, canActivate: [TokenGuard, RoleGuard], data: { roles: [1, 3] } },
  { path: 'puesto/:idPuesto', component: PuestoComponent, canActivate: [TokenGuard, RoleGuard], data: { roles: [1, 2, 3, 4] } },
  
  { path: 'vista-tecnico/:idUsuario', component: VistaTecnicoComponent, canActivate: [TokenGuard, RoleGuard, UserIdGuard], data: { roles: [4] } },
  //{ path: 'gestion', component: GestionComponent, canActivate: [TokenGuard] },
  
  
  { path: 'vista-gerencial/:idUsuario', component: VistaGerencialComponent, canActivate: [TokenGuard, RoleGuard, UserIdGuard], data: { roles: [2] } },

  { path: '400', component: BadRequestComponent  },
  { path: '401', component: UnauthorizedComponent },
  { path: '403', component: ForbiddenComponent },
  { path: '404', component: NotFoundComponent},
  { path: '501', component: NotImplementedComponent },
  { path: '500', component:  InternalServerErrorComponent},
  { path: '503', component: ServiceUnavailableComponent },
  { path: '504', component: GatewayTimeoutComponent },
  { path: '**', component: NotFoundComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }