import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';

import { QuizPage } from './QuizPage';

const meta = {
  title: 'Pages/QuizPage',
  component: QuizPage,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof QuizPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AnswerHidden: Story = {};

// More on component testing: https://storybook.js.org/docs/writing-tests/component-testing
export const AnswerShown: Story = {
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      const showButton = canvas.getByRole('button', { name: /Show answer/i });
      await expect(showButton).toBeInTheDocument();
      await userEvent.click(showButton);
  
      const answerText = canvas.getByTestId('quiz-answer-text');
      await expect(answerText).toBeInTheDocument();
    },
  };
  
