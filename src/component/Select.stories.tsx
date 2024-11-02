import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Select from './Select'
import { SelectOption, SelectProps, SelectValue } from './types'

const options: SelectOption[] = [
  { value: '1', label: 'One' },
  { value: '2', label: 'Two' },
  { value: '3', label: 'Three' },
]

type StatefulSelectProps = Omit<SelectProps, 'value' | 'onChange'>

const StatefulSelect = ({ ...props }: StatefulSelectProps) => {
  const [value, setValue] = React.useState<SelectValue>([])
  return <Select value={value} onChange={setValue} {...props} />
}

const meta = {
  component: StatefulSelect,
} satisfies Meta<typeof StatefulSelect>

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options,
    label: "label"
  }
}

export const FullWidth: Story = {
  args: {
    options,
    label: "label",
    fullWidth: true,
  }
}