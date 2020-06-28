export function parse(value: string = '') {
  if (value.startsWith('=')) {
    try {
      return eval(value.slice(1))
    } catch (e) {
      return value
    }
  }
  return value
}
