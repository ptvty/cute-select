import { SelectOption } from './types'
import IconCheck2 from '../icons/check2'
import classes from './Select.module.scss'

function Option({ option, onClick, isChecked }: { option: SelectOption, onClick: (value: string) => void, isChecked: boolean }) {
    return (
        <li
            key={option.value}
            className={isChecked ? classes.checked : ''}
            onClick={() => onClick(option.value)}
        >
            <div className={classes.label}>
                {option.label}
            </div>
            <div className={classes.checkMark}>
                <IconCheck2 />
            </div>
        </li>
    )
}

export default Option
