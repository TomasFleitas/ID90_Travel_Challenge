import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { IAppState } from 'src/store';
import { SessionService } from '../services/session.service';

@Injectable({
  providedIn: 'root'
})
export class AllowBackGuard implements CanActivate {

  constructor(private ngRedux: NgRedux<IAppState>, private route: Router, private sessionSrv: SessionService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const { session } = this.ngRedux.getState()

    //VER BIEN ESTO MAÑANA
    if (!!session.currentUser) return this.route.parseUrl('/hotels');
    return !!!session.currentUser;
  }

}
