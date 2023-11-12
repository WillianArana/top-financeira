import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'src/app/components/button/button.module';
import { InputModule } from 'src/app/components/input/input.module';
import { CustomerTableComponent } from './customer-table.component';

@NgModule({
  imports: [CommonModule, InputModule, ButtonModule],
  declarations: [CustomerTableComponent],
  exports: [CustomerTableComponent],
})
export class CustomerTableModule {}
