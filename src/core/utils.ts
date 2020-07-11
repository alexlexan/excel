import {IndexableString} from '@/type'

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

export function storage(key: string, data: object | null = null) {
  if (!data) {
    return JSON.parse(localStorage.getItem(key))
  }
  localStorage.setItem(key, JSON.stringify(data))
}

export function isEqual(a: any, b: any) {
  if (typeof a === 'object' && typeof b === 'object') {
    return JSON.stringify(a) === JSON.stringify(b)
  }
  return a === b
}

export function camelToDashCase(str: string) {
  return str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`)
}

export function toInlineStyles(styles: IndexableString = {}) {
  return Object.keys(styles)
    .map((key) => `${camelToDashCase(key)}: ${styles[key]}`)
    .join(';')
}

export function toObjectStyles(styles: string) {
  const r = /(?<=^|;)\s*([^:]+)\s*:\s*([^;]+)\s*/g
  const o: IndexableString = {}
  styles.replace(
    r,
    (m, p, v) =>
      (o[p.replace(/-(.)/g, (s: string, p: string) => p.toUpperCase())] = v)
  )
  return o
}

export function debounce(fn: Function, wait: number) {
  let timeout: ReturnType<typeof setTimeout>
  return function (...args: any) {
    const later = () => {
      clearTimeout(timeout)
      // eslint-disable-next-line
      fn.apply(this, args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export function isEmpty(obj: object) {
  // eslint-disable-next-line guard-for-in
  for (const key in obj) {
    return false
  }
  return true
}

export function clone(obj: object) {
  return JSON.parse(JSON.stringify(obj))
}
