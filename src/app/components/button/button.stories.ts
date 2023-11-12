import type { Meta, StoryObj } from '@storybook/angular';

import { argsToTemplate } from '@storybook/angular';
import { ButtonComponent } from './button.component';

const meta: Meta<ButtonComponent> = {
  title: 'Button',
  component: ButtonComponent,
  excludeStories: /.*Data$/,
  tags: ['autodocs'],
  render: (args: ButtonComponent) => ({
    props: {
      ...args,
    },
    template: `<app-button ${argsToTemplate(args)}>Lorem Ipsum</app-button>`,
  }),
};

export default meta;
type Story = StoryObj<ButtonComponent>;

export const PrimaryDefaultColumms: Story = {
  args: {
    isDisabled: false,
    width: 'columms',
  },
};

export const PrimaryDefaultContent: Story = {
  args: {
    isDisabled: false,
    width: 'content',
    type: 'button',
  },
};
