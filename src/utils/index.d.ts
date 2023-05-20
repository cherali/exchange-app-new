import type { AxiosRequestConfig } from 'axios'

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
