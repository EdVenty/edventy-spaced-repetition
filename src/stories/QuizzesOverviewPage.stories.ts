import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';

import { QuizzesOverviewPage } from './QuizzesOverviewPage';

const meta = {
  title: 'Pages/QuizzesOverviewPage',
  component: QuizzesOverviewPage,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof QuizzesOverviewPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

