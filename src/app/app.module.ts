import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importar el módulo de formularios reactivos

import { JwtModule } from '@auth0/angular-jwt';

//MATERIAL
import {NgFor, AsyncPipe,NgSwitch, NgSwitchCase,NgIf} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioSesionComponent } from './componentes/inicio-sesion/inicio-sesion.component';
import { ListarUsuariosComponent } from './componentes/usuarios/listar-usuarios/listar-usuarios.component';
import { AltaUsuariosComponent } from './componentes/usuarios/alta-usuarios/alta-usuarios.component';
import { NavBarComponent } from './componentes/globales/nav-bar/nav-bar.component';
import { PieComponent } from './componentes/globales/pie/pie.component';
import { BienvenidoComponent } from './componentes/globales/bienvenido/bienvenido.component';
import { ListarEstablecimientosComponent } from './componentes/establecimientos/listar-establecimientos/listar-establecimientos.component';
import { EditarUsuariosComponent } from './componentes/usuarios/editar-usuarios/editar-usuarios.component';
import { EstablecimientoComponent } from './componentes/establecimientos/establecimiento/establecimiento.component';
import { AltaEstablecimientosComponent } from './componentes/establecimientos/alta-establecimientos/alta-establecimientos.component';
import { EditarEstablecimientosComponent } from './componentes/establecimientos/editar-establecimientos/editar-establecimientos.component';
import { IncidenteComponent } from './componentes/incidentes/incidente/incidente.component';
import { CargarIncidenteComponent } from './componentes/incidentes/cargar-incidente/cargar-incidente.component';
import { ListarIncidentesComponent } from './componentes/incidentes/listar-incidentes/listar-incidentes.component';
import { SobreNosotrosComponent } from './componentes/globales/nosotros/sobre-nosotros.component';
import { ContactoComponent } from './componentes/globales/contacto/contacto.component';
import { UsuarioComponent } from './componentes/usuarios/usuario/usuario.component';
import { PuestoComponent } from './componentes/puestos/puesto/puesto.component';
import { SectorComponent } from './componentes/sectores/sector/sector.component';
import { EquipoComponent } from './componentes/equipos/equipo/equipo.component';
import { AltaSectorComponent } from './componentes/sectores/alta-sector/alta-sector.component';
import { AutocompleteLibModule} from 'angular-ng-autocomplete';
import { VistaTecnicoComponent } from './componentes/vistas/vista-tecnico/vista-tecnico.component';
import { AltaEquiposComponent } from './componentes/equipos/alta-equipos/alta-equipos.component';
import { EditarEquiposComponent } from './componentes/equipos/editar-equipos/editar-equipos.component';
import { GestionComponent } from './componentes/vistas/gestion/gestion.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SpinnerComponent } from './componentes/spinner/spinner.component';
import { VistaGerencialComponent } from './componentes/vista-gerencial/vista-gerencial.component';
import { EditarSectorComponent } from './componentes/sectores/editar-sector/editar-sector.component';
import { EditarPuestoComponent } from './componentes/puestos/editar-puesto/editar-puesto.component';
import { AltaPuestoComponent } from './componentes/puestos/alta-puesto/alta-puesto.component';

import { BadRequestComponent } from './componentes/globales/pagErrores/bad-request/bad-request.component';
import { ForbiddenComponent } from './componentes/globales/pagErrores/forbidden/forbidden.component';
import { GatewayTimeoutComponent } from './componentes/globales/pagErrores/gateway-timeout/gateway-timeout.component';
import { InternalServerErrorComponent } from './componentes/globales/pagErrores/internal-server-error/internal-server-error.component';
import { NotFoundComponent } from './componentes/globales/pagErrores/not-found/not-found.component';
import { NotImplementedComponent } from './componentes/globales/pagErrores/not-implemented/not-implemented.component';
import { UnauthorizedComponent } from './componentes/globales/pagErrores/unauthorized/unauthorized.component';
import { ServiceUnavailableComponent } from './componentes/globales/pagErrores/service-unavailable/service-unavailable.component';

import { AlertComponent } from './componentes/alert/alert.component';
import { MatIconModule } from '@angular/material/icon';
import { ModificarIncidenteComponent } from './componentes/incidentes/modificar-incidente/modificar-incidente.component';
import { ConfirmarDialogComponent } from './componentes/globales/confirmar-dialog/confirmar-dialog.component';
import { ConfirmAltaUsuarioComponent } from './componentes/modal/confirm-alta-usuario/confirm-alta-usuario.component';
import { ExitoAltaUsuarioComponent } from './componentes/modal/exito-alta-usuario/exito-alta-usuario.component';
import { ConfirmAltaEstablecimientoComponent } from './componentes/modal/confirm-alta-establecimiento/confirm-alta-establecimiento.component';
import { ExitoAltaEstablecimientoComponent } from './componentes/modal/exito-alta-establecimiento/exito-alta-establecimiento.component';
import { ConfirmCargarIncidenteComponent } from './componentes/modal/confirm-cargar-incidente/confirm-cargar-incidente.component';
import { ExitoCargarIncidenteComponent } from './componentes/modal/exito-cargar-incidente/exito-cargar-incidente.component';
import { CambiarClaveComponent } from './componentes/usuarios/cambiar-clave/cambiar-clave.component';
import { MatChipsModule } from '@angular/material/chips';
import { TokenService } from './servicios/token/token.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    InicioSesionComponent,
    ListarUsuariosComponent,
    AltaUsuariosComponent,
    NavBarComponent,
    PieComponent,
    BienvenidoComponent,
    ListarEstablecimientosComponent,
    EditarUsuariosComponent,
    EstablecimientoComponent,
    AltaEstablecimientosComponent,
    EditarEstablecimientosComponent,
    IncidenteComponent,
    CargarIncidenteComponent,
    ListarIncidentesComponent,
    SobreNosotrosComponent,
    ContactoComponent,
    UsuarioComponent,
    PuestoComponent,
    EditarPuestoComponent,
    AltaPuestoComponent,
    EquipoComponent,
    SectorComponent,
    AltaSectorComponent,
    VistaTecnicoComponent,
    AltaEquiposComponent,
    EditarEquiposComponent,
    GestionComponent,
    SpinnerComponent,
    VistaGerencialComponent,
    EditarSectorComponent,

    GatewayTimeoutComponent,
    ServiceUnavailableComponent,
    InternalServerErrorComponent,
    ForbiddenComponent,
    UnauthorizedComponent,
    NotFoundComponent,
    NotImplementedComponent,
    BadRequestComponent,
    
    AlertComponent,
    ModificarIncidenteComponent,
    ConfirmarDialogComponent,
    ConfirmAltaUsuarioComponent,
    ExitoAltaUsuarioComponent,
    ConfirmAltaEstablecimientoComponent,
    ExitoAltaEstablecimientoComponent,
    ConfirmCargarIncidenteComponent,
    ExitoCargarIncidenteComponent,
    CambiarClaveComponent,

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AutocompleteLibModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatStepperModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatChipsModule,
    NgFor,
    AsyncPipe,
    
    NgIf,
    NgSwitch,
    NgSwitchCase,
    MatIconModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('access_token'); // Cambia esto según donde tengas almacenado tu token JWT.
        },
        allowedDomains: ['example.com'], // Dominios permitidos para validar el token.
      },
    }),
  ],
  exports: [JwtModule],

  providers: [
    TokenService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
