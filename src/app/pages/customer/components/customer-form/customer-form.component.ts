import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IForm } from 'src/app/interfaces/form.interface';
import { FormService } from 'src/app/services/form.service';
import { FormValidations } from '../../../../form.validation';
import { CustomerService } from '../../customer.service';
import { CustomerDto } from '../../models/customer.dto';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css'],
})
export class CustomerFormComponent implements OnInit, IForm {
  formGroup!: FormGroup;

  @Input() cpfDisabled = false;

  constructor(
    private readonly _customerService: CustomerService,
    private readonly _formBuilder: FormBuilder,
    private readonly _formService: FormService,
  ) {}

  public ngOnInit(): void {
    this.buildFormGroup();
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
      cpf: [
        {
          value: dataForm.cpf,
          disabled: this.cpfDisabled,
        },
        [Validators.required, FormValidations.cpf],
      ],
      createdAt: [
        {
          value: dataForm.createdAt,
          disabled: true,
        },
      ],
      email: [dataForm.email, [Validators.email]],
      monthlyIncome: [dataForm.monthlyIncome, [Validators.required]],
      name: [dataForm.name, [Validators.required, FormValidations.lastName]],
    });
  }

  public onSubmit(): void {
    this._formService.onSubmit(this.formGroup, this.submit.bind(this));
  }

  private submit(): void {
    const dto = new CustomerDto(this.formGroup.value);
    this._customerService.submit$.next(dto);
  }
}
