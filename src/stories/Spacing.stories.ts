import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Spacing } from './Spacing';
import { Divider } from './Divider';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/Spacing',
  component: Spacing,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {  },
} satisfies Meta<typeof Spacing>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    children: [
        "One",
        "Two",
        "Three"
    ]
  },
};

export const Divided: Story = {
    args: {
        children: [
            "One",
            "Two",
            "Three"
        ],
        divider: Divider({direction: 'vertical'})
    },
};

export const Vertical: Story = {
    args: {
      children: [
          "One",
          "Two",
          "Three"
      ],
      direction: 'vertical'
    },
  };
  
  export const VerticalDivided: Story = {
    args: {
      children: [
          "One",
          "Two",
          "Three"
      ],
      direction: 'vertical',
      divider: Divider({direction: 'horizontal'})
    },
  };

