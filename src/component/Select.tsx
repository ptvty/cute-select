import React from 'react'
import { SelectOption, SelectProps } from './types'
import Option from './Option'
import useClickOutside from '../hooks/useClickOutside'
import IconChevronDown from '../icons/chevron-down'
import classes from './Select.module.scss'

enum KeyboardKeys {
  Enter = 'Enter'
}

const typePrompt = 'Type to add / search...'

const addPrompt = (query: string) => `Press Enter to add "${query}"`

function MultiSelect({
  value,
  onChange: setValue,
  options,
  label,
  width = 300,
  fullWidth = false,
}: SelectProps) {

  const inputRef = React.useRef<HTMLInputElement>(null)

  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const [query, setQuery] = React.useState<string>('')
  const [addedOptions, setAddedOptions] = React.useState<SelectOption[]>([])

  const { ref: dropdownRef } = useClickOutside(() => setIsOpen(false))

  const allOptions = React.useMemo(() => [...addedOptions, ...options], [options, addedOptions])

  const filteredOptions = React.useMemo(() => query === ''
    ? allOptions
    : allOptions.filter(o => o.label.toLowerCase().includes(query.toLocaleLowerCase()))
    , [allOptions, query])

  const valueOptions = React.useMemo(() => value.flatMap(v => allOptions.find(o => o.value === v) ?? []), [value])

  const dropdownClass = React.useMemo(() => `${classes.dropdown} ${isOpen ? classes.open : ''}`, [isOpen])

  const addOption = React.useMemo(() => {
    if (!query) return
    if (allOptions.find(o => o.value === query)) return
    return { label: addPrompt(query), value: query }
  }, [allOptions, query])

  React.useEffect(() => {
    if (!isOpen) return
    inputRef.current?.focus()
  }, [isOpen])

  function handleAddOption(): void {
    const newOption = { value: query, label: query }
    setAddedOptions(s => [newOption, ...s])
    setQuery('')
    inputRef.current?.focus()
  }

  function handleInputClick() {
    setIsOpen(s => !s)
  }

  function handleOptionClick(value: string): void {
    setValue(s => {
      return s.includes(value)
        ? s.filter(v => v !== value)
        : [...s, value]
    })
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setQuery(event.target.value)
    if (event.target.value) setIsOpen(true)
  }

  function handleEnterKey(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (!addOption) return
    if (event.key !== KeyboardKeys.Enter) return
    handleAddOption()
  }

  return (
    <div className={classes.container} ref={dropdownRef} style={fullWidth ? { width: '100%' } : { width }}>
      <div className={isOpen ? `${classes.open} ${classes.input}` : classes.input} onMouseDown={handleInputClick}>
        <div className={classes.label}>
          {valueOptions.length
            ? valueOptions.map(o => o.label).join(', ')
            : <input
              value={query}
              ref={inputRef}
              autoFocus={isOpen}
              placeholder={isOpen ? typePrompt : label}
              onChange={handleInputChange}
              onKeyDown={handleEnterKey}
              onFocus={() => setIsOpen(true)}
            />
          }
        </div>
        <div className={classes.arrow}>
          <IconChevronDown />
        </div>
      </div>

      <ul className={dropdownClass} >
        {addOption ? <Option option={addOption} onClick={handleAddOption} isChecked={false} /> : null}
        {filteredOptions.map(o => <Option option={o} key={o.value} onClick={handleOptionClick} isChecked={value.includes(o.value)} />)}
      </ul>

    </div>
  )
}

export default MultiSelect
