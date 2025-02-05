import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from '@storybook/test';

import { Input } from './Input';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/Input',
  component: Input,
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
  args: { onChange: fn(), onApply: fn() },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    placeholder: "Input here"
  },
//   play: async ({ canvasElement }) => {
//     const size = 3;

//     const canvas = within(canvasElement);
//     const prevButton = canvas.getByRole('button', { name: /Left/i });
//     await expect(prevButton).toBeInTheDocument();
//     const nextButton = canvas.getByRole('button', { name: /Right/i });
//     await expect(nextButton).toBeInTheDocument();
//     const currentPage = canvas.getByText('1');
//     await expect(currentPage).toBeInTheDocument();

//     for(let i = 0; i < size; i++){
//         await expect(currentPage.textContent).toEqual((i + 1).toString());
//         await userEvent.click(nextButton);
//     }
//     await expect(currentPage.textContent).toEqual(size.toString());

//     for(let i = size - 1; i > 0; i--){
//         await expect(currentPage.textContent).toEqual((i + 1).toString());
//         await userEvent.click(prevButton);
//     }
//     await expect(currentPage.textContent).toEqual('1');
//   },
}

export const CustomValue: Story = {
  args: {
    placeholder: "Input here",
    value: "Value"
  }
};

export const Fill: Story = {
  args: {
    placeholder: "Fill the area",
    fill: true
  }
};

export const Disabled: Story = {
  args: {
    placeholder: "Input here",
    disabled: true
  }
};

export const NoAutoSelect: Story = {
  args: {
    placeholder: "Input here",
    autoSelect: false
  }
};