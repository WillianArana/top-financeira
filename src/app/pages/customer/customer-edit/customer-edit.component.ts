import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CustomerService } from '../customer.service';
import { CustomerDataForm } from '../models/customer.data-form';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css'],
})
export class CustomerEditComponent implements OnInit, OnDestroy {
  readonly #subscripton = new Subscription();

  showForm = false;

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _customerService: CustomerService,
  ) {}

  public ngOnInit(): void {
    const customerId = this._route.snapshot.paramMap.get('id') as string;
    this._customerService.getById(customerId).subscribe((data) => {
      this._customerService.setDataForm(
        Object.assign(new CustomerDataForm(), data),
      );
      const sub = this._customerService.onUpdateSubmit(+customerId).subscribe();
      this.#subscripton.add(sub);
      this.showForm = true;
    });
  }

  public ngOnDestroy(): void {
    this.#subscripton.unsubscribe();
  }
}
