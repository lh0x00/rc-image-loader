export function handleError(...arg) {
  console.error('[rc-image-loader]', ...arg) // eslint-disable-line no-console
}

export function handleWarning(...arg) {
  console.warn('[rc-image-loader]', ...arg) // eslint-disable-line no-console
}

export function isFunction(fn: any): boolean {
  return fn && typeof fn === 'function'
}

export function isString(str: any): boolean {
  return str && typeof str === 'string'
}
