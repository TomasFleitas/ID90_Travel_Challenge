import { NgRedux } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Unsubscribe } from 'redux';
import { HotelsService } from 'src/app/services/hotels.service';
import { DATE_FORMAT } from 'src/app/utility/utilities';
import { IAppState } from 'src/store';
import { clear } from './redux/actions';
import { HotelsReducerI } from './redux/reducer';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.page.html',
  styleUrls: ['./hotels.page.scss']
})
export class HotelsPage implements OnInit {

  public validateForm!: FormGroup;
  public hotelsStore?: HotelsReducerI;
  public paginator = { size: 10, page: 1 };
  private storeSub: Unsubscribe;
  private auxSearch: any = undefined;

  constructor(private fb: FormBuilder, private hotelsSrv: HotelsService, private ngRedux: NgRedux<IAppState>, private message: NzMessageService) {
    this.storeSub = this.ngRedux.subscribe(() => {
      const { hotels } = this.ngRedux.getState();
      this.hotelsStore = hotels;

      if (this.hotelsStore?.errorMessage) {
        this.message.create("error", this.hotelsStore.errorMessage);
        this.ngRedux.dispatch(clear());
      }
    });
  }

  ngOnDestroy(): void {
    this.storeSub();
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      destination: [null, [Validators.required]],
      date_range: [null, [Validators.required]],
      guests: [null, [Validators.required]],
    });
  }

  pageChange(v: any) {
    this.paginator.page = v;
    this.getData();
  }

  sizeChange(v: any) {
    this.paginator.size = v;
    this.getData();
  }

  private getData() {
    const { destination, date_range: [checkin, checkout], guests } = this.auxSearch;
    const data = {
      currency: "USD",
      rooms: 1,
      sort_criteria: "Overall",
      sort_order: "desc",
      checkin: moment(checkin).format(DATE_FORMAT),
      checkout: moment(checkout).format(DATE_FORMAT),
      guests: [guests],
      destination,
      page: this.paginator.page,
      per_page: this.paginator.size,
    };
    this.hotelsSrv.getHotels(data);
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      this.auxSearch = this.validateForm.value;
      this.getData()
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }


}
