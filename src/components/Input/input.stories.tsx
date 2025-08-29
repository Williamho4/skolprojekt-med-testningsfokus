import type { Meta, StoryObj } from '@storybook/react-vite'

import Input from './input'

const meta = {
  tags: ['autodocs'],
  component: Input,
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const TextInput: Story = {
  args: {
    placeholder: 'Search for movies',
    type: 'text',
  },
}

export const DateInput: Story = {
  args: {
    placeholder: 'Select Date',
    type: 'date',
  },
}
