import type {
  FC,
  ReactNode,
  Dispatch,
  SetStateAction,
  ChangeEventHandler,
} from 'react'
import { Row } from 'react-table'
import type { PAIR } from '../../types'

type QouteType = 'TMN' | 'USDT'

type AddOrRemoveWatchlistFn = (
  pair: PAIR,
  action: 'ADD' | 'REMOVE',
  update?: Dispatch<SetStateAction<boolean>>,
) => void

export interface PairsSectionProps {
  loadingCard?: ReactNode | FC
  loadingCardSM?: ReactNode | FC
  handleAddOrRemoveWatchlist: AddOrRemoveWatchlistFn
}

export interface WatchlistSectionProps {
  loadingCard?: ReactNode | FC
  loadingCardSM?: ReactNode | FC
  handleAddOrRemoveWatchlist: AddOrRemoveWatchlistFn
}

export interface TableHeaderProps {
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
}

export interface PairsTableHeaderProps extends TableHeaderProps {
  qoutes: Array<string>
  qouteType: QouteType
  changeQoute: Dispatch<SetStateAction<QouteType>>
}

export interface WatchlistTableHeaderProps extends TableHeaderProps {
}

export interface TableRowData {
  row: Row<object>
}