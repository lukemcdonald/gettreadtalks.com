import SelectGroupOptions from './select-group-options'
import type { SelectOption } from './select'

interface Props {
  label?: string
  options: SelectOption[]
}

function SelectGroup({ label, options }: Props) {
  return label ? (
    <optgroup label={label}>
      <SelectGroupOptions options={options} />
    </optgroup>
  ) : (
    <SelectGroupOptions options={options} />
  )
}

export default SelectGroup
