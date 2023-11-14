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

  showForm = true;

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _customerService: CustomerService,
  ) {}

  public ngOnInit(): void {
    this._customerService.initForm();
    const customerId = +(this._route.snapshot.paramMap.get('id') as string);
    this._customerService.getById(customerId).subscribe((data) => {
      this._customerService.updateDataForm(
        CustomerDataForm.fromCustomer(data).disableCpf(),
      );
      this.setUpdate(customerId);
      this.setRemove(customerId);
      this.reloadForm();
    });
  }

  private setUpdate(id: number): void {
    const sub = this._customerService.onUpdate(id).subscribe();
    this.#subscripton.add(sub);
  }

  private setRemove(id: number): void {
    const sub = this._customerService.onRemove(id).subscribe();
    this.#subscripton.add(sub);
  }

  private reloadForm(): void {
    this.showForm = false;
    setTimeout(() => {
      this.showForm = true;
    });
  }

  public ngOnDestroy(): void {
    this.#subscripton.unsubscribe();
  }
}
