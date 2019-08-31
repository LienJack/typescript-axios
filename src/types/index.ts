export type Method = 'get' | 'GET'
|  'delete' | 'Delete'
| 'head' | 'HEAD'
| 'options' | 'OPTIONS'
| 'post' | 'POST'
| 'put' | 'PUT'
| 'patch' | 'PATCH'
export interface AxiosRequestConfig {
  url?: string,
  method?: Method ,
  data ?: any ,
  params ?: any ,
  headers ?: any ,
  responseType ?: XMLHttpRequestResponseType ,
  timeout?: number,
  [propName:string]: any,
}

export interface AxiosResponse {
  data: any,
  status: number,
  statusText: string,
  headers: any ,
  config: AxiosRequestConfig,
  request: any
}

export interface AxiosPromise extends Promise<AxiosResponse>{}

export interface AxiosError extends Error {
  isAxiosError: boolean,
  config: AxiosRequestConfig,
  code?: string | null,
  request?: any,
  response?: AxiosResponse
}
export interface Axios {
  defaults: AxiosRequestConfig ,
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>
    response: AxiosInterceptorManager<AxiosRequestConfig>
  }
  request(config: AxiosRequestConfig): AxiosPromise

  get(url: string, config?: AxiosRequestConfig): AxiosPromise

  delete(url: string, config?: AxiosRequestConfig): AxiosPromise

  head(url: string, config?: AxiosRequestConfig): AxiosPromise

  options(url: string, config?: AxiosRequestConfig): AxiosPromise

  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise

  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise

  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise
}

export interface AxiosInstance extends Axios {
  (config: AxiosRequestConfig): AxiosPromise
  (url:string, config?: AxiosRequestConfig) : AxiosPromise
}

export interface AxiosInterceptorManager<T> {
  use(resolve: ResovledFn<T>,reject: RejectedFn): number
  eject(id: number): void
}

export interface ResovledFn<T> {
  (val: T): T | Promise<T>
}
export interface RejectedFn {
  (error: any): any
}
