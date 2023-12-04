import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DialogService } from 'src/app/components/dialog/dialog.service';
import { CustomerService } from '../customer.service';
import { CustomerDataForm } from '../models/customer.data-form';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css'],
})
export class CustomerEditComponent implements OnInit, OnDestroy {
  readonly #subscripton = new Subscription();

  customerId = 0;
  showForm = true;

  constructor(
    private readonly _customerService: CustomerService,
    private readonly _dialogService: DialogService,
    private readonly _route: ActivatedRoute,
  ) {}

  public ngOnInit(): void {
    this._customerService.initForm();
    const customerId = +(this._route.snapshot.paramMap.get('id') as string);
    this._customerService.getById(customerId).subscribe({
      next: (data) => {
        this._customerService.updateDataForm(
          CustomerDataForm.fromCustomer(data).disableCpf(),
        );
        this.setUpdate(customerId);
        this.reloadForm();
        this.customerId = customerId;
      },
      error: (error) => {
        if (error.status === 404) {
          const sub = this._dialogService
            .showNegativeFeedback({
              message: 'Cliente não encontrado!',
              textButton: 'OK',
            })
            .subscribe(() => {
              this._customerService.navigateToBack();
            });
          this.#subscripton.add(sub);
        }
      },
    });
  }

  private setUpdate(id: number): void {
    const sub = this._customerService.onUpdate(id).subscribe();
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
