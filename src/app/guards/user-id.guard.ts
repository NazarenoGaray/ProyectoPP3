import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, CanMatch, Route, RouterStateSnapshot, UrlSegment, UrlTree ,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../servicios/token/token.service';



@Injectable({
  providedIn: 'root'
})
export class UserIdGuard implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad, CanMatch {
  constructor(private tokenService: TokenService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const requestedUserId = next.paramMap.get('idUsuario'); // Obtiene el ID de usuario solicitado desde la URL.
    const authenticatedUser = this.tokenService.getAuthenticatedUser(); // Obtiene el ID de usuario autenticado desde tu servicio de autenticación.
    const authenticatedUserId = authenticatedUser.idUsuario;
    console.log("requestedUserId:",requestedUserId);
    //console.log("authenticatedUserId:",authenticatedUserId);
    if (requestedUserId == authenticatedUserId) {
      return true; // Permite el acceso si el ID de usuario coincide con el autenticado.
    } else {
      // Redirige a una página de error en caso contrario.
      return this.router.createUrlTree(['/401']); // Ajusta la ruta de error según tu configuración.
    }
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canMatch(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
}
