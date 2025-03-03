import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../servicios/token/token.service';


@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private tokenService: TokenService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const authenticatedUser = this.tokenService.getAuthenticatedUser();

    if (!authenticatedUser || !authenticatedUser.rol || !authenticatedUser.rol.idRol) {
      return this.router.createUrlTree(['/401']); // No tiene rol o no está autenticado
    }

    const userRoleId = authenticatedUser.rol.idRol; // ID del rol del usuario autenticado
    const requiredRoles: number[] = route.data['roles']; // Roles permitidos en la ruta

    if (requiredRoles.includes(userRoleId)) {
      return true; // El usuario tiene el rol permitido
    } else {
      return this.router.createUrlTree(['/403']); // No autorizado
    }
  }
}

