import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageModule } from './login/login.module';
import { HotelsPageModule } from './hotels/hotels.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    LoginPageModule,
    HotelsPageModule
  ]
})
export class PagesModule { }
