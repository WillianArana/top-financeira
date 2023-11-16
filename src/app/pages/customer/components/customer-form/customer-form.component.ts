import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IForm } from 'src/app/interfaces/form.interface';
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

  @Input() removeDisabled = true;
  @Output() remove = new EventEmitter<true>();

  constructor(
    private readonly _customerService: CustomerService,
    private readonly _formBuilder: FormBuilder,
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
      cpf: [dataForm.cpf, [Validators.required, FormValidations.cpf]],
      createdAt: [dataForm.createdAt],
      email: [dataForm.email, [Validators.email]],
      monthlyIncome: [dataForm.monthlyIncome, [Validators.required]],
      name: [dataForm.name, [Validators.required, FormValidations.lastName]],
    });
  }

  public onSubmit(): void {
    this._customerService.formGroupSubmit(
      this.formGroup,
      () => new CustomerDto(this.formGroup.value),
    );
  }

  public returnToCustomers(): void {
    this._customerService.navigateToBack();
  }

  public onRemove(): void {
    this.remove.emit(true);
  }
}
