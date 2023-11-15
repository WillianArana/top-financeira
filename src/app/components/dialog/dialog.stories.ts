import type { Meta, StoryObj } from '@storybook/angular';

import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';
import { ButtonModule } from '../button/button.module';
import { DialogModule } from './dialog.module';
import { DialogService } from './dialog.service';

@Component({
  selector: 'app-launcher',
  template: ` <app-button (click)="show()">Dialog</app-button> `,
})
class LaunchDialogComponent {
  @Input() textButtonOk = '';
  @Input() textButtonCancel = '';
  @Input() message = '';
  @Input() method = '';

  constructor(private _dialogService: DialogService) {}

  public showPositiveFeedback(): void {
    this._dialogService.showPositiveFeedback({
      message: this.message,
      textButton: this.textButtonOk,
    });
  }

  public showNegativeFeedback(): void {
    this._dialogService.showNegativeFeedback({
      message: this.message,
      textButton: this.textButtonOk,
    });
  }

  public showQuestion(): void {
    this._dialogService.showQuestion({
      message: this.message,
      textButtonOk: this.textButtonOk,
      textButtonCancel: this.textButtonCancel,
    });
  }

  public show(): void {
    if (this.method === 'showPositiveFeedback') {
      this.showPositiveFeedback();
    }

    if (this.method === 'showNegativeFeedback') {
      this.showNegativeFeedback();
    }

    if (this.method === 'showQuestion') {
      this.showQuestion();
    }
  }
}

const meta: Meta<LaunchDialogComponent> = {
  title: 'Dialog',
  component: LaunchDialogComponent,
  excludeStories: /.*Data$/,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule, DialogModule, ButtonModule],
    }),
  ],
  render: (args: LaunchDialogComponent) => ({
    props: {
      ...args,
    },
    template: `
        <app-dialog></app-dialog>
        <app-launcher ${argsToTemplate(args)}></app-launcher>
    `,
  }),
};

export default meta;
type Story = StoryObj<LaunchDialogComponent>;

export const DialogPositiveFeedback: Story = {
  args: {
    textButtonOk: 'OK',
    message: 'some positive feedback',
    method: 'showPositiveFeedback',
  },
};

export const DialogNegativeFeedback: Story = {
  args: {
    textButtonOk: 'OK',
    message: 'some negative feedback',
    method: 'showNegativeFeedback',
  },
};

export const DialogQuestion: Story = {
  args: {
    textButtonOk: 'OK',
    textButtonCancel: 'Cancel',
    message: 'some question?',
    method: 'showQuestion',
  },
};
