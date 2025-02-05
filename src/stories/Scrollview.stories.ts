import type { Meta, StoryObj } from '@storybook/react';

import { Scrollview } from './Scrollview';
import { mockSpacingContentHorizontal, mockSpacingContentVertical } from './mock';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/Scrollview',
  component: Scrollview,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: { },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { },
} satisfies Meta<typeof Scrollview>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Vertical: Story = {
  args: {
    children: mockSpacingContentVertical,
    style: {
        height: 30
    }
  },
}

export const Horizontal: Story = {
    args: {
      children: mockSpacingContentHorizontal,
      direction: 'horizontal',
      style: {
          width: 100
      }
    },
  }