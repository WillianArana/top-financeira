import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'src/app/components/button/button.module';
import { InputModule } from 'src/app/components/input/input.module';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { CustomerFormComponent } from './customer-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputModule,
    ButtonModule,
    DirectivesModule,
  ],
  declarations: [CustomerFormComponent],
  exports: [CustomerFormComponent],
})
export class CustomerFormModule {}
