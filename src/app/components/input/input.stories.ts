
import type { Meta, StoryObj } from '@storybook/angular';

import { argsToTemplate } from '@storybook/angular';
import { InputComponent } from './input.component';



const meta: Meta<InputComponent> = {
  title: 'Input',
  component: InputComponent,
  excludeStories: /.*Data$/,
  tags: ['autodocs'],
  render: (args: InputComponent) => ({
    props: {
      ...args,
    },
    template: `<app-input ${argsToTemplate(args)}></app-input>`,
  }),
};

export default meta;
type Story = StoryObj<InputComponent>;

export const Default: Story = {
  args: {
    label: 'some text label:'
  },
};
