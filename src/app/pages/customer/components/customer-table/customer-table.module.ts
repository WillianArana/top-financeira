import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'src/app/components/button/button.module';
import { InputModule } from 'src/app/components/input/input.module';
import { PaginationModule } from 'src/app/components/pagination/pagination.module';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { CpfPipe } from 'src/app/pipes/cpf.pipe';
import { CustomerTableComponent } from './customer-table.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PaginationModule,
    InputModule,
    ButtonModule,
    DirectivesModule,
  ],
  declarations: [CustomerTableComponent, CpfPipe],
  exports: [CustomerTableComponent],
})
export class CustomerTableModule {}
