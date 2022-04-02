import { NgRedux } from '@angular-redux/store';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IAppState } from 'src/store';
import { getHotels, getHotelsError, getHotelsSuccess } from '../pages/hotels/redux/actions';

const URL_BASE = environment.urlService + "api/v1/";

@Injectable({
  providedIn: 'root'
})
export class HotelsService {

  constructor(private http: HttpClient, private ngRedux: NgRedux<IAppState>) { }


  /**
   * Obtener todas los hoteles
   *
   * @param {{}} params
   * @returns
   */
  public getHotels(params: any) {
    this.ngRedux.dispatch(getHotels())
    const { guests, ...rest } = params;
    let queryParams = new HttpParams();

    for (let k = 0; k < guests.length; k++) {
      queryParams = queryParams.append('guests[]', guests[k]);
    }

    return this.http.get<any>(URL_BASE + `hotels.json?${queryParams.toString()}`, { params: rest }).pipe(resp => {
      resp.subscribe({ next: (v) => this.ngRedux.dispatch(getHotelsSuccess(v)), error: e => this.ngRedux.dispatch(getHotelsError(e.error?.error)) });
      return resp;
    });
  }

}
