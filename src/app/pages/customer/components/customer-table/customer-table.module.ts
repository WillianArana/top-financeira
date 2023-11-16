import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'src/app/components/button/button.module';
import { InputModule } from 'src/app/components/input/input.module';
import { CpfPipe } from 'src/app/pipes/cpf.pipe';
import { CustomerTableComponent } from './customer-table.component';

@NgModule({
  imports: [CommonModule, InputModule, ButtonModule],
  declarations: [CustomerTableComponent, CpfPipe],
  exports: [CustomerTableComponent],
})
export class CustomerTableModule {}
