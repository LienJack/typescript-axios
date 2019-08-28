import { isDate , isObject, isPlainObject } from './util'
// 处理url编码
function encode(val:string) : string {
  return encodeURIComponent(val)
  .replace(/%40/g, '@')
  .replace(/%3A/gi, ':')
  .replace(/%24/g, '$')
  .replace(/%2C/gi, ',')
  .replace(/%20/g, '+')
  .replace(/%5B/gi, '[')
  .replace(/%5D/gi, ']')
}
export function buildURL(url: string, params?: any): string {
  if(!params) {
    return url
  }
  const parts: string[] = []

  Object.keys(params).forEach((key) => {
    const val = params[key]
    // 处理值为空
    if(val === null || typeof val ==="undefined") {
      return
    }
    // 处理数组
    let values = []
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }
    values.forEach((val) => {
      // 处理日期
      if(isDate(val)) {
        val = val.toISOString()
      } else if (isPlainObject(val)) {
        val = JSON.stringify(val)
      }
      // 字符串拼接
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })

  let serializedParams = parts.join("&")
  if (serializedParams) {
    const markIndex = url.indexOf('#')
    // 处理hash
    if(markIndex !== -1) {
      url = url.slice(0, markIndex)
    }
    // 处理原来的参数
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }
  return url
}
