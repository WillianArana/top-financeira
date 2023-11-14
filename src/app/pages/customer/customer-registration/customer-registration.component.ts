import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, switchMap } from 'rxjs';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-registration',
  templateUrl: './customer-registration.component.html',
  styleUrls: ['./customer-registration.component.css'],
})
export class CustomerRegistrationComponent implements OnInit, OnDestroy {
  readonly #subscripton = new Subscription();

  constructor(private readonly _customerService: CustomerService) {}

  public ngOnInit(): void {
    this._customerService.initForm();
    this.setCreate();
  }

  private setCreate(): void {
    const sub = this._customerService
      .onCreate()
      .pipe(switchMap((data) => this._customerService.navigateTo(data.id)))
      .subscribe();
    this.#subscripton.add(sub);
  }

  public ngOnDestroy(): void {
    this.#subscripton.unsubscribe();
  }
}
