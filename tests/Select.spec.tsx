import React from 'react'
import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'
import { page, userEvent } from '@vitest/browser/context'
import Select from '../src/component/Select'
import { SelectOption, SelectValue } from '../src/component/types'

const options: SelectOption[] = [
    { value: '1', label: 'One' },
    { value: '2', label: 'Two' },
    { value: '3', label: 'Three' },
]

const App = () => {
    const [value, setValue] = React.useState<SelectValue>([])
    return <div>
        <h1>Outside</h1>
        <Select label="Vitest" options={options} value={value} onChange={setValue} />
    </div>
}

test('renders input', async () => {
    const { getByPlaceholder } = render(<App />)
    await expect.element(getByPlaceholder('Vitest')).toBeInTheDocument()
})

test('renders options on click', async () => {
    const { getByText, getByPlaceholder } = render(<App />)
    await getByPlaceholder('Vitest').click()
    await expect.element(getByText('One')).toBeVisible()
})

test('hides options on outside click', async () => {
    const { getByText, getByPlaceholder } = render(<App />)
    await getByPlaceholder('Vitest').click()
    await expect.element(getByText('One')).toBeVisible()
    await page.getByText('Outside').click()
    await expect.element(getByText('One')).not.toBeVisible()
})

test('filter search results', async () => {
    const { getByText } = render(<App />)
    await userEvent.fill(page.getByPlaceholder('Vitest'), 'two')
    await expect.element(getByText('One')).not.toBeInTheDocument()
    await expect.element(getByText('Two', { exact: true })).toBeInTheDocument()
    await expect.element(getByText('Three')).not.toBeInTheDocument()
})

test('add new option', async () => {
    const { getByText } = render(<App />)
    await userEvent.fill(page.getByPlaceholder('Vitest'), 'Four')
    await userEvent.keyboard('\n')
    await expect.element(getByText('Four', { exact: true })).toBeInTheDocument()
})

test('renders selected options', async () => {
    const { getByText, getByPlaceholder } = render(<App />)
    await getByPlaceholder('Vitest').click()
    await getByText('One').click()
    await getByText('Three').click()
    await expect.element(getByText('One, Three', { exact: true })).toBeInTheDocument()
})