import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from '@storybook/test';

import { Card } from './Card';
import { mockCardSidebar, mockCardContent, mockCardSidebarDivided } from './mock';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {

  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    children: [
      mockCardContent
    ]
  },
};

export const WithSidebar: Story = {
  args: {
    children: [
      mockCardContent,
      mockCardSidebar
    ]
  },
};

export const Subdivided: Story = {
  args: {
    children: [
      mockCardContent,
      mockCardSidebarDivided
    ]
  },
};

export const Primary: Story = {
  args: {
    children: [
      mockCardContent
    ],

    variant: "primary"
  }
};

export const Secondary: Story = {
  args: {
    children: [
      mockCardContent
    ],

    variant: "secondary"
  }
};