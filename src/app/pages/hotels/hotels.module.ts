import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelsPageRoutingModule } from './hotels-routing.module';
import { HotelsPage } from './hotels.page';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    HotelsPageRoutingModule,
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    NzCheckboxModule,
    ReactiveFormsModule,
    NzSelectModule,
    NzTableModule,
    NzDatePickerModule,
    NzInputNumberModule,
    ComponentsModule
  ],
  declarations: [HotelsPage]
})
export class HotelsPageModule { }
