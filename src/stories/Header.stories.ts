import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Header } from './Header';

const meta = {
  title: 'Components/Header',
  component: Header,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: {
    onLogin: fn(),
    onLogout: fn(),
    onCreateAccount: fn(),
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedIn: Story = {
  args: {
    user: {
      name: 'Jane Doe',
    },
    pages: [
      {
          value: "home",
          text: "Home"
      },
      {
          value: "store",
          text: "Store"
      },
      {
          value: "contacts",
          text: "Contacts"
      }
  ]
  },
};

export const LoggedOut: Story = {};

export const Primary: Story = {
  args: {
    user: undefined,
    primary: true,
    pages: [
      {
          value: "home",
          text: "Home"
      },
      {
          value: "store",
          text: "Store"
      },
      {
          value: "contacts",
          text: "Contacts"
      }
  ]
  }
};

export const Mobile: Story = {
  args: {
    pages: [
      {
          value: "",
          text: "Home"
      },
      {
          value: "q",
          text: "Quizzes"
      },
      {
          value: "n",
          text: "Notes"
      }
    ],
    current: "q",
    style: {
        maxWidth: '375px'
    },
  },
};