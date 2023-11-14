import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  @Input() isDisabled = false;
  @Input() type = 'submit';
  @Input() name: 'primary' | 'secondary' = 'primary';
  @Input() width: 'content' | 'columms' = 'content';
}
