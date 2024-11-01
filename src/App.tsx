import React from 'react'
import { SelectOption, SelectValue } from './component/types'
import MultiSelect from './component/Select'
import './App.css'

const options: SelectOption[] = [
  { value: '1', label: 'Education🎓' },
  { value: '2', label: 'Yeeeah, science!⚗️' },
  { value: '3', label: 'Art🎭' },
  { value: '4', label: 'Sport⚽' },
  { value: '5', label: 'Games🎮' },
  { value: '6', label: 'Health🏥' },
  { value: '7', label: 'Hiking🥾' },
  { value: '8', label: 'Creating🚀' },
  { value: '9', label: 'Jogging🏃🏻' },
  { value: '10', label: 'Cooking🍳' },
  { value: '11', label: 'Eating!🍕' },
]

function App() {
  const [value, setValue] = React.useState<SelectValue>([])

  return (<div className='arimo-font demo'>
    <MultiSelect
      value={value}
      onChange={setValue}
      fullWidth
      label='Favorite activities'
      options={options}
    />
    <div style={{marginTop: '24rem'}}>
      <p>Value</p>
      <pre>
        {JSON.stringify(value)}
      </pre>
    </div>
  </div>)
}

export default App
