import type { Meta, StoryObj } from '@storybook/angular';

import { action } from '@storybook/addon-actions';
import { argsToTemplate } from '@storybook/angular';
import { HamburgerButtonComponent } from './hamburger-button.component';

export const actionsData = {
  toggle: action('toggle'),
};

const meta: Meta<HamburgerButtonComponent> = {
  title: 'Hamburger Button',
  component: HamburgerButtonComponent,
  excludeStories: /.*Data$/,
  tags: ['autodocs'],
  render: (args: HamburgerButtonComponent) => ({
    props: {
      ...args,
      toggle: actionsData.toggle,
    },
    template: `<div style="position: relative;background-color: var(--color-brand-primary-darkest);height: 55px;width:75px"><app-hamburger-button ${argsToTemplate(
      args,
    )}></app-hamburger-button></div>`,
  }),
};

export default meta;
type Story = StoryObj<HamburgerButtonComponent>;

export const Default: Story = {
  args: {},
};
