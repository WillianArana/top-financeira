import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HamburgerButtonComponent } from './hamburger-button.component';

@NgModule({
  imports: [CommonModule],
  declarations: [HamburgerButtonComponent],
  exports: [HamburgerButtonComponent],
})
export class HamburgerButtonModule {}
