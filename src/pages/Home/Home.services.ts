import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from 'utils/apiUtil'
import { pairsUrl } from 'constants/urls'
import type { PAIR } from 'types'

type PairsData = Array<PAIR>

export const homeApis = createApi({
  reducerPath: 'assets',
  baseQuery: axiosBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: (build) => ({
    getPairs: build.query<PairsData, string>({
      query: () => ({
        url: pairsUrl,
        method: 'get',
      }),

    }),
  })
})

export const { useGetPairsQuery } = homeApis