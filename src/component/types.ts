export type SelectOption = {
    label: string
    value: string
}

export type SelectValue = string[]

export type SelectProps = {
    value: SelectValue
    onChange: React.Dispatch<React.SetStateAction<SelectValue>>
    options: SelectOption[]
    label: string
    fullWidth?: boolean
    width?: number
}
