import { Fragment } from 'react'
import type { SelectOption } from './select'

interface Props {
  options: SelectOption[]
}

function getSeparatorLabel(separator: SelectOption['separator']) {
  return typeof separator === 'boolean' ? '─' : separator
}

function SelectGroupOptions({ options }: Props) {
  return (
    <>
      {options?.map((option: Partial<SelectOption>) => (
        <Fragment key={`${option.value}-${option.label}`}>
          {option.separator ? (
            <option disabled>{getSeparatorLabel(option.separator)}</option>
          ) : null}
          {!option.separator ? <option value={option.value}>{option.label}</option> : null}
        </Fragment>
      ))}
    </>
  )
}

export default SelectGroupOptions
