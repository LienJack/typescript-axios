import { AxiosRequestConfig, AxiosPromise } from './types'
import xhr from './xhr'
import { buildURL } from './helpers/url'
import { transformRequest } from './helpers/data'
import { processHeaders } from './helpers/header'
function axios(config:AxiosRequestConfig): AxiosPromise {
  // todo
  processConfig(config)
  return xhr(config)
}

function processConfig(config:AxiosRequestConfig): void {
  config.url = transformRequestURL(config)
  config.headers = transformRequsetHeaders(config)
  config.data = transformRequestData(config)
}
function transformRequestURL (config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}

function transformRequestData (config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

function transformRequsetHeaders (config: AxiosRequestConfig): any {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}
export default axios
