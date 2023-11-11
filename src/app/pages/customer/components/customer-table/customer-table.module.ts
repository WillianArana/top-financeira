import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InputModule } from 'src/app/components/input/input.module';
import { CustomerTableComponent } from './customer-table.component';

@NgModule({
  imports: [CommonModule, InputModule],
  declarations: [CustomerTableComponent],
  exports: [CustomerTableComponent],
})
export class CustomerTableModule {}
