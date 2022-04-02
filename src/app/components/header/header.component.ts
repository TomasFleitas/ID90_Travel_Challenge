import { NgRedux } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Unsubscribe } from 'redux';
import { SessionService } from 'src/app/services/session.service';
import { IAppState } from 'src/store';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private storeSub: Unsubscribe;
  public currentUser: any;

  constructor(private ngRedux: NgRedux<IAppState>, private router: Router, private sessionSrv: SessionService) {
    this.storeSub = this.ngRedux.subscribe(() => {
      this.updateState();
      if (!this.currentUser) {
        this.router.navigate(["/"], { replaceUrl: true });
      }
    });
  }

  ngOnInit(): void {
    this.updateState();
  }

  ngOnDestroy(): void {
    this.storeSub();
  }

  public logout() {
    this.sessionSrv.logout();
  }

  private updateState() {
    const { session: { currentUser } } = this.ngRedux.getState();
    this.currentUser = currentUser;
  }
}
