import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InputModule } from 'src/app/components/input/input.module';
import { CustomerFormComponent } from './customer-form.component';

@NgModule({
  imports: [CommonModule, InputModule],
  declarations: [CustomerFormComponent],
  exports: [CustomerFormComponent],
})
export class CustomerFormModule {}
