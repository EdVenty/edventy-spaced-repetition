import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from '@storybook/test';

import { Button } from './Button';
import { mockIcon } from './mock';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
    color: { control: 'color' }
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    label: 'Button',
  },
  // play: async ({ canvasElement, mount }) => {
  //   await mount();

  //   const canvas = within(canvasElement);
  //   const button = canvas.getByRole('button');

  //   await userEvent.click(button);
  //   await expect(button.).
  // }
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    label: 'Button',
  },
};

export const Simple: Story = {
  args: {
    label: "Simple",
    variant: "primary",
    simple: true,
    color: "#C2ACF2"
  }
};

export const Icon: Story = {
  args: {
    icon: mockIcon,
    label: "Icon"
  }
};


export const Green: Story = {
  args: {
    label: 'Agree',
    variant: 'green'
  },
};

export const Red: Story = {
  args: {
    label: 'Discard',
    variant: 'red'
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    label: 'Button',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    label: 'Button',
  },
};

export const Custom: Story = {
  args: {
    label: "Custom color",
    variant: "outlined",
    size: "medium",
    backgroundColor: "#382fdb",
    color: "#ffffff"
  }
};


