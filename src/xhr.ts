import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from "./types"
export default function xhr(config:AxiosRequestConfig) :AxiosPromise {
  return new Promise((resolve , reject) => {
    const { method = "get", url , data = null, headers, responseType } = config
    const request = new XMLHttpRequest()
    if(responseType) {
      request.responseType = responseType
    }
    request.open(method.toUpperCase(), url, true)
    request.onreadystatechange = function handleLoad() {
      if(request.readyState !==4) {
        return
      }
      const responseHeaders = request.getAllResponseHeaders() // 以字符串的形式返回所有用 CRLF 分隔的响应头
      const responseData = responseType !== "text"? request.response: request.responseText // 响应的body
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request,
      }
      resolve(response)
    }
    Object.keys(headers).forEach((name)=> {
      if (data === null && name.toUpperCase()==="content-type") {
        delete headers[name]
      } else {
        request.setRequestHeader(name , headers[name])
      }
    })
    request.send(data)
  })
}
