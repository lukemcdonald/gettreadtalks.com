import { useState } from 'react'

function useForm(defaults) {
  const [values, setValues] = useState(defaults)

  function updateValue(e) {
    let { name, type, value } = e.target

    if (type === 'number') {
      value = parseInt(value)
    }

    setValues({
      ...values,
      [name]: value,
    })
  }

  return { values, updateValue }
}

export { useForm }
