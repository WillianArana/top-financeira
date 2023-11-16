import type { Meta, StoryObj } from '@storybook/angular';

import { action } from '@storybook/addon-actions';
import { argsToTemplate } from '@storybook/angular';
import { PaginationComponent } from './pagination.component';

export const actionsData = {
  page: action('page'),
};

const meta: Meta<PaginationComponent> = {
  title: 'Pagination',
  component: PaginationComponent,
  excludeStories: /.*Data$/,
  tags: ['autodocs'],
  render: (args: PaginationComponent) => ({
    props: {
      ...args,
      page: actionsData.page,
    },
    template: `<app-pagination ${argsToTemplate(args)}></app-pagination>`,
  }),
};

export default meta;
type Story = StoryObj<PaginationComponent>;

export const Default: Story = {
  args: {
    data: {
      last: 5,
    },
  },
};
