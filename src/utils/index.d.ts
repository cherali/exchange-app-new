import type { AxiosRequestConfig } from 'axios'
import type { IncomingHttpHeaders } from 'http2'

export interface QueryProps {
  url: string
  method: AxiosRequestConfig['method']
  data?: AxiosRequestConfig['data']
}

export interface AxiosBaseQueryError {
  isSuccessful?: boolean;
  message?: string;
  status?: number;
}
