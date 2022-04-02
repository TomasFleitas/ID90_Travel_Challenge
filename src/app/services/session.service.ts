import { NgRedux } from '@angular-redux/store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IAppState } from '../../store';
import { getAirlines, getAirlinesError, getAirlinesSuccess, login, loginError, loginSuccess, logout } from '../pages/login/redux/actions';


const URL_BASE = environment.urlService;

type login_props = {
  airline: string,
  password: string,
  username: string
  remember_me: boolean
}

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http: HttpClient, private ngRedux: NgRedux<IAppState>) { }

  /**
   * Realizar login
   *
   * @param {{ airline: string, password: string, username: string, remember_me: boolean}} session
   * @returns
   */
  public login(session: login_props) {
    this.ngRedux.dispatch(login())
    return this.http.post<any>(URL_BASE + "session.json", { ...session }).pipe(resp => {
      resp.subscribe({ next: ({ member }) => this.ngRedux.dispatch(loginSuccess({ member, remember: session.remember_me })), error: e => this.ngRedux.dispatch(loginError(e.error?.error)) });
      return resp;
    });
  }

  /**
   * Obtener todas las aerolineas
   *
   * @returns
   */
  public getAirlines() {
    this.ngRedux.dispatch(getAirlines())
    return this.http.get<any>(URL_BASE + "airlines").pipe(resp => {
      resp.subscribe({ next: v => this.ngRedux.dispatch(getAirlinesSuccess(v)), error: e => this.ngRedux.dispatch(getAirlinesError(e.error?.error)) });
      return resp;
    });
  }

  /**
   * Cerrar sesión
   */
  public logout() {
    this.ngRedux.dispatch(logout());
  }
}
