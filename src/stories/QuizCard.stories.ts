import type { Meta, StoryObj } from '@storybook/react';

import { QuizCard } from './QuizCard';
import { fn } from '@storybook/test';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Assembly/QuizCard.WithMarkdown',
  component: QuizCard.WithMarkdown,
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
  args: { onOpen: fn(), onClose: fn(), onPageSelected: fn() },
} satisfies Meta<typeof QuizCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    question: "What is OSI?",
    answer: "The Open Systems Intercommunication  (OSI) model is a reference model from the International Organization for Standardization (ISO) that provides a common basis for the coordination of standards development for the purpose of systems interconnection. In the OSI reference model, the communications between systems are split into seven different abstraction layers: Physical, Data Link, Network, Transport, Session, Presentation, and Application.",
    allQuestions: [
        {
            title: "What is COM?"
        },
        {
            title: "Describe the networking principals.",
            status: "mastered"
        },
        {
            title: "What is OSI?"
        }
    ]
  },
};


export const MermaidDiagram: Story = {
  args: {
    question: "Draw an example of flowchart.",
    answer: `\`\`\`mermaid
flowchart LR
  A --> B
  B --> C
`,
    allQuestions: [
        {
            title: "Draw an example of block flowchart."
        },
    ]
  },
};