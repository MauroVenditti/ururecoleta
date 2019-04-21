import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private _ls: LoginService,
    private router: Router
  ) { }

  // canActivate(): boolean{
  //  return this._ls.estaLogeado();
  // }

  canActivate() { // route: ActivatedRouteSnapshot, state: RouterStateSnapshot
    if (this._ls.estaLogeado()) {
      return true;
    } else {
      this.router.navigate(['/registro']);
      return false;
    }
  }

}
