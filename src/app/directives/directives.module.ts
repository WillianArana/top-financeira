import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CpfMaskDirective } from './cpf-mask.directive';
import { CurrencyMaskDirective } from './currency-mask.directive';
import { DateMaskDirective } from './date-mask.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [CurrencyMaskDirective, CpfMaskDirective, DateMaskDirective],
  exports: [CurrencyMaskDirective, CpfMaskDirective, DateMaskDirective],
})
export class DirectivesModule {}
