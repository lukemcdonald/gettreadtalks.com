interface CallBack<Params extends unknown[]> {
  (...args: Params): void
}

// prettier-ignore
export const callAll = <Params extends unknown[]>(
	...fns: Array<CallBack<Params> | undefined>
) => (...args: Params) => fns.forEach((fn) => typeof fn === 'function' && fn(...args))

export const trimText = (text: string, limit: number) => {
  if (text.length > limit) {
    return `${text.slice(0, limit).trim()}...`
  }

  return text
}

export function arrayShuffle<T>(array: T): T[] {
  if (!Array.isArray(array)) {
    return []
  }

  const shuffled = array
    .map((a) => [Math.random(), a])
    .sort((a, b) => a[0] - b[0])
    .map((a) => a[1])

  return shuffled
}

export const sanitizeHTMLTag = (tagname = '', whitelist: string[] = []) => {
  const sanitized = tagname ? tagname.toLowerCase() : ''
  const tags = whitelist || [tagname]
  return tags.includes(sanitized) ? sanitized : whitelist[0]
}

export const maybePluralize = (count: number, noun: string, args = {}) => {
  const defaults = {
    suffix: 's',
    showCount: true,
    formatSmallNumbers: false,
  }

  const options = { ...defaults, ...args }

  const smallNumbers = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']

  let displayCount: number | string = count

  if (options.formatSmallNumbers && smallNumbers[count + 1]) {
    displayCount = smallNumbers[count + 1]
  }

  if (!options.showCount) {
    displayCount = ''
  }

  return `${displayCount} ${noun}${count <= 1 ? '' : options.suffix}`
}
