import type { Meta, StoryObj } from '@storybook/react-vite'

import Button from './button'

const meta = {
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
  args: {
    children: <p>Hello</p>,
  },
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'Primary',
    size: 'md',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'Secondary',
    size: 'md',
  },
}
