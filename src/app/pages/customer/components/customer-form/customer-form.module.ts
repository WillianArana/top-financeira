import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'src/app/components/button/button.module';
import { FormDebugComponent } from 'src/app/components/form-debug/form-debug.component';
import { InputModule } from 'src/app/components/input/input.module';
import { CpfMaskDirective } from 'src/app/directives/cpf-mask.directive';
import { CurrencyMaskDirective } from 'src/app/directives/currency-mask.directive';
import { DateMaskDirective } from 'src/app/directives/date-mask.directive';
import { CustomerFormComponent } from './customer-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputModule,
    ButtonModule,
  ],
  declarations: [
    CustomerFormComponent,
    CurrencyMaskDirective,
    CpfMaskDirective,
    DateMaskDirective,
    FormDebugComponent,
  ],
  exports: [CustomerFormComponent],
})
export class CustomerFormModule {}
