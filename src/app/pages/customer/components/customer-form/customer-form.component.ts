import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IForm } from 'src/app/interfaces/form.interface';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css'],
})
export class CustomerFormComponent implements OnInit, IForm {
  formGroup!: FormGroup;

  @Input() data = {
    birthDate: {
      value: '',
      disabled: false,
    },
    cpf: {
      value: '',
      disabled: false,
    },
    createAt: {
      value: null,
      disabled: true,
    },
    email: {
      value: '',
      disabled: false,
    },
    monthlyIncome: {
      value: null,
      disabled: false,
    },
    name: {
      value: '',
      disabled: false,
    },
  };

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _formService: FormService,
  ) {}

  public ngOnInit(): void {
    this.buildFormGroup();
  }

  private buildFormGroup(): void {
    this.formGroup = this._formBuilder.group({
      birthDate: [this.data.birthDate, [Validators.required]],
      cpf: [this.data.cpf, [Validators.required]],
      createAt: [this.data.createAt],
      email: [
        this.data.email,
        [
          Validators.pattern(
            '[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}',
          ),
        ],
      ],
      monthlyIncome: [
        this.data.monthlyIncome,
        [Validators.required, Validators.min(0)],
      ],
      name: [this.data.name, [Validators.required, Validators.minLength(3)]],
    });
  }

  public onSubmit(): void {
    this._formService.onSubmit(this.formGroup, this.submit.bind(this));
  }

  private submit(): void {
    throw new Error('method not implemented');
  }
}
