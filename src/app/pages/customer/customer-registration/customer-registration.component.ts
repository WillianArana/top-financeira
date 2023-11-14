import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, switchMap } from 'rxjs';
import { CustomerService } from '../customer.service';
import { CustomerDataForm } from '../models/customer.data-form';

@Component({
  selector: 'app-customer-registration',
  templateUrl: './customer-registration.component.html',
  styleUrls: ['./customer-registration.component.css'],
})
export class CustomerRegistrationComponent implements OnInit, OnDestroy {
  readonly #subscripton = new Subscription();

  constructor(private readonly _customerService: CustomerService) {}

  public ngOnInit(): void {
    this._customerService.setDataForm(new CustomerDataForm());
    const sub = this._customerService
      .onCreateSubmit()
      .pipe(switchMap((data) => this._customerService.navigatTo(data.id)))
      .subscribe();
    this.#subscripton.add(sub);
  }

  public ngOnDestroy(): void {
    this.#subscripton.unsubscribe();
  }
}
