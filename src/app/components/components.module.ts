import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { NzButtonModule } from 'ng-zorro-antd/button';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    NzButtonModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class ComponentsModule { }
