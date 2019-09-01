import { AxiosRequestConfig } from './types'
const defaluts: AxiosRequestConfig = {
  method: 'get',

  timeout: 0,

  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  }
}

const methodsNoData = ['delete', 'get', 'head', 'options']

methodsNoData.forEach(method => {
  defaluts.headers[method] = {}
})

const mehtodWithData = ['post', 'put', 'patch']

mehtodWithData.forEach(method => {
  defaluts.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})
export default defaluts
