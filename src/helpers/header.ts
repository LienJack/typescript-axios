import { isPlainObject } from './util'
function normalizeHeaderName (headers:any, normalizedName: string): void {
  if (!headers) return
  Object.keys(headers).forEach(name => {
    if(name!== normalizedName && name.toLowerCase()=== normalizedName.toLowerCase()) {
      headers[normalizedName]= headers[name]
      delete headers[name]
    }
  })
}
export function processHeaders (headers: any, data:any):any {
  normalizeHeaderName(headers, 'Content-Type')
  if(headers && !headers['Content-Types']) {
    headers['Content-Type'] = 'application/json;charset=utf-8'
  }
  return headers
}
