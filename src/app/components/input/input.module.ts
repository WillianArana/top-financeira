import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GetErrorMessagePipe } from './get-error-message.pipe';
import { InputComponent } from './input.component';

@NgModule({
  imports: [CommonModule],
  declarations: [InputComponent, GetErrorMessagePipe],
  exports: [InputComponent],
})
export class InputModule {}
