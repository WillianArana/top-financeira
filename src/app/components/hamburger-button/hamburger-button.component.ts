import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-hamburger-button',
  templateUrl: './hamburger-button.component.html',
  styleUrls: ['./hamburger-button.component.css'],
})
export class HamburgerButtonComponent {
  @Output() toggle = new EventEmitter<boolean>();

  state = false;

  public toggleState() {
    this.state = !this.state;
    this.toggle.emit(this.state);
  }
}
