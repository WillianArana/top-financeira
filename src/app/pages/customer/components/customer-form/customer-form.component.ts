import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IForm } from 'src/app/interfaces/form.interface';
import { FormService } from 'src/app/services/form.service';
import { FormValidations } from '../../../../form.validation';
import { CustomerService } from '../../customer.service';
import { CustomerDto } from '../../models/customer.dto';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css'],
  providers: [FormService],
})
export class CustomerFormComponent implements OnInit, OnDestroy, IForm {
  readonly #subscripton = new Subscription();

  #id = 0;
  isRemoveButtoDisable = true;

  formGroup!: FormGroup;

  @Input() set id(value: number) {
    this.#id = value;
    this.isRemoveButtoDisable = !(value > 0);
  }

  constructor(
    private readonly _customerService: CustomerService,
    private readonly _formService: FormService<CustomerDto>,
    private readonly _formBuilder: FormBuilder,
  ) {}

  public ngOnInit(): void {
    this.setOnSubmit();
    this.buildFormGroup();
  }

  private setOnSubmit(): void {
    const sub = this._formService.submit$.subscribe((data) =>
      this._customerService.submit(data),
    );
    this.#subscripton.add(sub);
  }

  private buildFormGroup(): void {
    const dataForm = this._customerService.dataForm;
    this.formGroup = this._formBuilder.group({
      birthDate: [
        dataForm.birthDate,
        [
          Validators.required,
          FormValidations.date,
          FormValidations.minAge(18),
          FormValidations.maxAge(60),
        ],
      ],
      cpf: [dataForm.cpf, [Validators.required, FormValidations.cpf]],
      createdAt: [dataForm.createdAt],
      email: [dataForm.email, [Validators.email]],
      monthlyIncome: [dataForm.monthlyIncome, [Validators.required]],
      name: [dataForm.name, [Validators.required, FormValidations.lastName]],
    });
  }

  public onSubmit(): void {
    this._formService.formGroupSubmit(
      this.formGroup,
      () => new CustomerDto(this.formGroup.value),
    );
  }

  public returnToCustomers(): void {
    this._customerService.navigateToBack();
  }

  public onRemove(): void {
    const sub = this._customerService.remove(this.#id).subscribe(() => {
      this._customerService.navigateToBack();
    });
    this.#subscripton.add(sub);
  }

  public ngOnDestroy(): void {
    this.#subscripton.unsubscribe();
  }
}
