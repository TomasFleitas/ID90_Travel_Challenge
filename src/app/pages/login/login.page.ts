import { NgRedux } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Unsubscribe } from 'redux';
import { SessionService } from 'src/app/services/session.service';
import { IAppState } from 'src/store';
import { clear } from './redux/actions';
import { SessionReducerI } from './redux/reducer';

@Component({
  selector: 'page-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {

  public form!: FormGroup;
  public sessionStore?: SessionReducerI;
  private storeSub: Unsubscribe;
  public title: string = "ID90 Travel - Challenge";

  constructor(private fb: FormBuilder, private sessionSrv: SessionService, private ngRedux: NgRedux<IAppState>, private router: Router, private message: NzMessageService) {
    this.storeSub = this.ngRedux.subscribe(() => {
      const { session } = this.ngRedux.getState();
      this.sessionStore = session;
      if (!this.sessionStore.loading && this.sessionStore.currentUser) {
        this.router.navigate(['/hotels']);
      }

      if (this.sessionStore?.errorMessage) {
        this.message.create("error", this.sessionStore.errorMessage);
        this.ngRedux.dispatch(clear());
      }
    });
  }

  ngOnDestroy(): void {
    this.storeSub();
  }

  ngAfterContentInit(): void {
    this.sessionSrv.getAirlines();
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      airline: [null, [Validators.required]],
      remember_me: [true]
    });
  }

  submitForm(): void {
    if (this.form.valid) {
      this.sessionSrv.login(this.form.value);
    } else {
      Object.values(this.form.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
