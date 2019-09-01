import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { parseHeaders } from '../helpers/header'
import { createError } from '../helpers/error'
export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { method = 'get', url, data = null, headers, responseType, timeout } = config
    const request = new XMLHttpRequest()
    if (responseType) {
      request.responseType = responseType
    }
    if (timeout) {
      request.timeout = timeout
    }
    request.open(method.toUpperCase(), url!, true)
    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return
      }
      if (request.status === 0) {
        return
      }
      const responseHeaders = parseHeaders(request.getAllResponseHeaders()) // 以字符串的形式返回所有用 CRLF 分隔的响应头
      const responseData = responseType !== 'text' ? request.response : request.responseText // 响应的body
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      handleResponse(response)
    }
    request.onerror = function handleError() {
      reject(createError('Network Error', config, null, request))
    }
    request.ontimeout = function handleTimeout() {
      reject(createError(`Timeout of ${timeout}ms exceeded`, config, 'ECONNABORTED', request))
    }
    Object.keys(headers).forEach(name => {
      if (data === null && name.toUpperCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })
    request.send(data)

    function handleResponse(response: AxiosResponse): void {
      if (response.status > 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(
          createError(
            `Request failed with status code ${response.status}`,
            config,
            null,
            request,
            response
          )
        )
      }
    }
  })
}
