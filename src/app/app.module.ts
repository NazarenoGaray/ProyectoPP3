import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importar el módulo de formularios reactivos


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioSesionComponent } from './componentes/inicio-sesion/inicio-sesion.component';
import { ListarUsuariosComponent } from './componentes/listar-usuarios/listar-usuarios.component';
import { AltaUsuariosComponent } from './componentes/alta-usuarios/alta-usuarios.component';
import { NavBarComponent } from './componentes/nav-bar/nav-bar.component';
import { PieComponent } from './componentes/pie/pie.component';
import { BienvenidoComponent } from './componentes/bienvenido/bienvenido.component';
import { ListarEstablecimientosComponent } from './componentes/listar-establecimientos/listar-establecimientos.component';
import { EditarUsuariosComponent } from './componentes/editar-usuarios/editar-usuarios.component';
import { EstablecimientoComponent } from './componentes/establecimiento/establecimiento.component';
import { AltaEstablecimientosComponent } from './componentes/alta-establecimientos/alta-establecimientos.component';
import { EditarEstablecimientosComponent } from './componentes/editar-establecimientos/editar-establecimientos.component';
import { Error404Component } from './componentes/error404/error404.component';
import { IncidenteComponent } from './componentes/incidente/incidente.component';
import { CargarIncidenteComponent } from './componentes/cargar-incidente/cargar-incidente.component';
import { ListarIncidentesComponent } from './componentes/listar-incidentes/listar-incidentes.component';
import { SobreNosotrosComponent } from './componentes/nosotros/sobre-nosotros.component';
import { ContactoComponent } from './componentes/contacto/contacto.component';
import { UsuarioComponent } from './componentes/usuario/usuario.component';
import { PuestoComponent } from './componentes/puesto/puesto.component';
import { SectorComponent } from './componentes/sector/sector.component';
import { EquipoComponent } from './componentes/equipo/equipo.component';
import { AltaSectorComponent } from './componentes/alta-sector/alta-sector.component';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';


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
    Error404Component,
    IncidenteComponent,
    CargarIncidenteComponent,
    ListarIncidentesComponent,
    SobreNosotrosComponent,
    ContactoComponent,
    UsuarioComponent,
    PuestoComponent,
    EquipoComponent,
    SectorComponent,
    AltaSectorComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AutocompleteLibModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
