export const callAll =
  (...fns) =>
  (...args) =>
    fns.forEach((fn) => fn?.(...args))

export const trimText = (text, limit) => {
  if (text.length > limit) {
    return `${text.slice(0, limit).trim()}...`
  }

  return text
}

export function arrayShuffle(array = []) {
  if (!Array.isArray(array)) {
    throw new Error(`Got a parameter of type ${typeof array} instead of an array`)
  }

  return array
    .map((a) => [Math.random(), a])
    .sort((a, b) => a[0] - b[0])
    .map((a) => a[1])
}

export const sanitizeHTMLTag = (tagname = '', whitelist = []) => {
  const sanitized = tagname ? tagname.toLowerCase() : ''
  const tags = whitelist || [tagname]
  return tags.includes(sanitized) ? sanitized : whitelist[0]
}

export const maybePluralize = (count, noun, args = {}) => {
  const defaults = {
    suffix: 's',
    showCount: true,
    formatSmallNumbers: false,
  }

  const options = { ...defaults, ...args }

  const smallNumbers = {
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five',
    6: 'six',
    7: 'seven',
    8: 'eight',
    9: 'nine',
  }

  let displayCount = count

  if (options.formatSmallNumbers && smallNumbers[count]) {
    displayCount = smallNumbers[count]
  }

  if (!options.showCount) {
    displayCount = ''
  }

  return `${displayCount} ${noun}${count <= 1 ? '' : options.suffix}`
}
