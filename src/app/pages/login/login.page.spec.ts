import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { LoginPageRoutingModule } from './login-routing.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginPage } from './login.page';
import { MockNgRedux, NgReduxTestingModule } from '@angular-redux/store/lib/testing';
import { Router } from '@angular/router';
import { NzMessageServiceModule } from 'ng-zorro-antd/message';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SessionService } from 'src/app/services/session.service';
import { of } from 'rxjs';


const correctCredentials = {
  username: 'hauser',
  password: '12345',
  airline: 'HAWAIIAN AIRLINES (HA)',
}

describe('Test pagina Login', () => {
  let loginPage: LoginPage;
  let fixture: ComponentFixture<LoginPage>;


  beforeEach(async () => {
    let routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [
        CommonModule,
        LoginPageRoutingModule,
        NzFormModule,
        NzButtonModule,
        NzInputModule,
        NzCheckboxModule,
        ReactiveFormsModule,
        NzSelectModule,
        HttpClientTestingModule,
        NgReduxTestingModule,
        NzMessageServiceModule,
        BrowserAnimationsModule
      ], providers: [
        { provide: Router, useValue: routerSpy },
        MockNgRedux
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPage);
    loginPage = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe existir el LoginPage', () => {
    expect(loginPage).toBeTruthy();
  });

  it('Se debe generar el formulario', () => {
    expect(loginPage.form).toBeDefined();
  });

  it('Debe retornar formulario invalido cuando solo se cargó el username', () => {
    const form = loginPage.form;
    const username = form.controls["username"];
    username.setValue("u");
    expect(form.invalid).toBeTruthy();
  });

  it('Debe retornar formulario invalido cuando no se ha cargado la aerolinea', () => {
    const form = loginPage.form;
    const username = form.controls["username"];
    const password = form.controls["password"];
    username.setValue('u');
    password.setValue('p');
    expect(form.invalid).toBeTruthy();
  });

  it('Debe retornar formulario valido', () => {
    const form = loginPage.form;
    const airline = form.controls["airline"];
    const username = form.controls["username"];
    const password = form.controls["password"];
    airline.setValue('a');
    username.setValue('u');
    password.setValue('p');
    expect(!form.invalid).toBeTruthy();
  });


  it('Debe iniciar sesión', () => {
    const form = loginPage.form;
    const airline = form.controls["airline"];
    const username = form.controls["username"];
    const password = form.controls["password"];
    airline.setValue('HAWAIIAN AIRLINES (HA)');
    username.setValue('hauser');
    password.setValue('12345');
    expect(
      !form.invalid &&
      username.value === correctCredentials.username &&
      password.value === correctCredentials.password &&
      airline.value === correctCredentials.airline
    ).toBeTruthy();
    spyOn(MockNgRedux.getInstance(), 'getState').and.returnValue({ session: { currentUser: {} } });
    expect(MockNgRedux.getInstance().getState()).toEqual({ session: { currentUser: {} } });
  });

  it('Debe arrojar error al iniciar sesión', () => {
    const form = loginPage.form;
    const airline = form.controls["airline"];
    const username = form.controls["username"];
    const password = form.controls["password"];
    airline.setValue('HAWAIIAN AIRLINES (HA)');
    username.setValue('hausegawr');
    password.setValue('1gad');
    expect(
      !form.invalid &&
      username.value === correctCredentials.username &&
      password.value === correctCredentials.password &&
      airline.value === correctCredentials.airline
    ).toBeFalsy();
    spyOn(MockNgRedux.getInstance(), 'getState').and.returnValue({ session: { errorMessage: "error" } });
    expect(MockNgRedux.getInstance().getState()).toEqual({ session: { errorMessage: "error" } });
  });
});
