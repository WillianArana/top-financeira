import { HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FormValidations } from 'src/app/form.validation';
import { convertToDate } from 'src/app/helper/date.helper';
import { JsonServerPagination } from 'src/app/json-server/json-server.pagination';
import { sortAt } from 'src/app/json-server/json-server.sort';
import { TableService } from 'src/app/services/table.service';
import { CustomerService } from '../../customer.service';
import { ICustomer } from '../../models/interfaces/customer.interface';

@Component({
  selector: 'app-customer-table',
  templateUrl: './customer-table.component.html',
  styleUrls: ['./customer-table.component.css'],
})
export class CustomerTableComponent implements OnInit, OnDestroy {
  formGroup!: FormGroup;
  customers: ICustomer[] = [];

  #subscription = new Subscription();
  #params = new HttpParams();

  readonly identify = (_: number, customer: ICustomer) => customer.id;

  showPagination = true;

  pagination: JsonServerPagination = {
    last: 0,
  };

  sort = {
    name: {
      default: 'asc',
      order: '',
    },
    cpf: {
      default: 'asc',
      order: '',
    },
    createdAt: {
      default: 'desc',
      order: 'asc',
    },
    monthlyIncome: {
      default: 'desc',
      order: '',
    },
  };

  constructor(
    private readonly _customerService: CustomerService,
    private readonly _formBuilder: FormBuilder,
    private readonly _tableService: TableService<ICustomer, HttpParams>,
  ) {}

  public ngOnInit(): void {
    this.buildFormGroup();
    const apiPath = this._customerService.apiPath;
    const sub = this._tableService.search(apiPath).subscribe((response) => {
      this.customers = response.body as ICustomer[];
      this.pagination = new JsonServerPagination(
        response.headers.get('link') as string,
      );
    });
    this.#subscription.add(sub);

    let params = new HttpParams();
    params = params.append('_page', 1);
    this.#params = params;
    this.submit();
  }

  private buildFormGroup(): void {
    this.formGroup = this._formBuilder.group({
      birthDate: ['', [FormValidations.date]],
      cpf: ['', [FormValidations.cpf]],
      name: ['', [FormValidations.lastName]],
    });
  }

  public submit(data?: { page?: number }): void {
    if (data?.page) {
      this.#params = this.#params.set('_page', data.page);
    }
    this._tableService.submit(this.#params);
  }

  public remove(id: number): void {
    const sub = this._customerService.remove(id).subscribe(() => {
      this.submit();
      sub.unsubscribe();
    });
    this.#subscription.add(sub);
  }

  public sortAt(key: string): void {
    const data = sortAt(key, this.sort);
    this.#params = this.#params.set('_sort', data.sort);
    this.#params = this.#params.set('_order', data.order);
    this.submit();
  }

  public navigateToCustomerRegistration(): void {
    this._customerService.navigateTo('clientes', 'cliente');
  }

  public navigateToCustomerEdit(id: number): void {
    this._customerService.navigateTo('clientes', id);
  }

  public onSubmit(): void {
    if (this.formGroup.valid) {
      const values = this.formGroup.value;

      const dto = {
        name: values.name.trim(),
        cpf: values.cpf.trim().replace(/\D/g, ''),
        birthDate: values.birthDate
          ? convertToDate(values.birthDate).toISOString()
          : '',
      };

      Object.entries(dto).forEach(([key, value]) => {
        if (value) {
          this.#params = this.#params.set(key, value as string);
        } else {
          this.#params = this.#params.delete(key);
        }
      });

      this.submit({ page: 1 });
    }
  }

  public ngOnDestroy(): void {
    this.#subscription.unsubscribe();
  }
}
