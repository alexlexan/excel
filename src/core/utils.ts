export function capitalize(string: string): string {
  if (typeof string !== 'string') {
    return ''
  }
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function range(start: number, end: number) {
  if (start > end) {
    // eslint-disable-next-line
    ;[end, start] = [start, end]
  }
  return new Array(end - start + 1).fill('').map((_, index) => start + index)
}
