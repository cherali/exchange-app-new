import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { homeApis } from 'App.services'

export const store = configureStore({
  reducer: {
    [homeApis.reducerPath]: homeApis.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      homeApis.middleware,
    ),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>


// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

