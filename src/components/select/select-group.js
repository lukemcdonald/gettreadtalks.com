import React from 'react'

import { ConditionalWrapper } from '~/components/conditional-wrapper'

function SelectGroup({ label, options }) {
  return (
    <ConditionalWrapper
      condition={label}
      wrapper={(children) => <optgroup label={label}>{children}</optgroup>}
    >
      {options.map(({ label: text, value, separator, index }) =>
        separator ? (
          <option key={`${separator}-${index}`} disabled>
            {typeof separator === 'boolean' ? `─` : separator}
          </option>
        ) : (
          <option key={`${value}`} value={value}>
            {text}
          </option>
        ),
      )}
    </ConditionalWrapper>
  )
}

export default SelectGroup
