import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DialogService } from 'src/app/components/dialog/dialog.service';
import { TableService } from 'src/app/services/table.service';
import { CustomerService } from '../../customer.service';
import { ICustomer } from '../../models/interfaces/customer.interface';

@Component({
  selector: 'app-customer-table',
  templateUrl: './customer-table.component.html',
  styleUrls: ['./customer-table.component.css'],
})
export class CustomerTableComponent implements OnInit, OnDestroy {
  customers: ICustomer[] = [];

  readonly #subscription = new Subscription();

  #subscriptionRemove = new Subscription();

  constructor(
    private readonly _customerService: CustomerService,
    private readonly _dialogService: DialogService,
    private readonly _formBuilder: FormBuilder,
    private readonly _tableService: TableService<ICustomer>,
  ) {}

  public ngOnInit(): void {
    const apiPath = this._customerService.apiPath;
    const sub = this._tableService.search(apiPath).subscribe((data) => {
      this.customers = data;
    });
    this.#subscription.add(sub);
    this._tableService.submit('');
  }

  public remove(id: number): void {
    this.#subscriptionRemove.unsubscribe();
    this.#subscriptionRemove = this._customerService
      .remove(id)
      .subscribe(() => {
        this._tableService.submit('');
      });
  }

  public navigateToEdit(id: number): void {
    this._customerService.navigateTo('clientes', id);
  }

  public ngOnDestroy(): void {
    this.#subscription.unsubscribe();
  }
}
