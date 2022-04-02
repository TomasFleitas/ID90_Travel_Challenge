import { NgRedux } from '@angular-redux/store';
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { IAppState } from 'src/store';
import { SessionService } from './services/session.service';

declare var gtag: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {

  constructor(private ngRedux: NgRedux<IAppState>, private sessionSrv: SessionService, private router: Router) {

    /* Check remember */
    const { session } = this.ngRedux.getState();
    if (!session.remember && sessionStorage.getItem("remember") !== "1") {
      this.sessionSrv.logout();
      this.router.navigate(["/"], { replaceUrl: true });
    }

    /* Tracking router to GA */
    const navEndEvents$ = this.router.events.pipe(filter(event => event instanceof NavigationEnd));
    navEndEvents$.subscribe((event: any) => {
      gtag("config", "G-6EJ9WQKRHD", {
        "page_path": event.urlAfterRedirects
      });
    });

  }

}
