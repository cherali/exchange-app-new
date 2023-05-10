import { useMemo, FC, useState, ChangeEvent } from 'react'
import type { Column, Row } from 'react-table'
import clsx from 'clsx'
import type { PAIR } from 'types'
import Table from 'components/Table'
import { getData } from 'utils/storage'
import {
  PairsTableHeader,
  getChangeArrowclassName,
  getChangeColorclassName,
  getPairBaseAssetImg,
  renderCell,
  renderCellSM,
} from './HomeComponents'
import { useGetPairsQuery } from './Home.services'
import type { PairsSectionProps, QouteType } from './index.d'

const qoutes = ['USDT', 'TMN']

const PairsSection: FC<PairsSectionProps> = ({
  loadingCard,
  loadingCardSM,
  handleAddOrRemoveWatchlist,
}) => {
  const { data: pairList, isFetching } = useGetPairsQuery('')

  const [search, setSearch] = useState<string>('')
  const [qouteType, setQouteType] = useState<QouteType>('USDT')

  const watchlist = getData()

  const columns = useMemo(
    (): Column<PAIR>[] => [
      {
        accessor: 'name',
        Header: 'Pair',
        Cell: ({ value, row }) => {
          return (
            <span className='inline-flex gap-2 items-center'>
              <span className='w-8 h-8'>
                <img
                  src={getPairBaseAssetImg(
                    row.original.imageUrl,
                    row.original.name,
                  )}
                  alt={value}
                />{' '}
              </span>
              <span className='font-bold'>{value}</span>
            </span>
          )
        },
      },
      {
        accessor: 'lastPrice',
        Header: 'Price',
        defaultCanSort: true,
        sortType: (rowA: Row<PAIR>, rowB: Row<PAIR>) =>
          Number(rowA.original.lastPrice) - Number(rowB.original.lastPrice),
        Cell: ({ value, row }) => (
          <>
            {value.toLocaleString('en-US', {
              maximumFractionDigits: 16,
              minimumFractionDigits: row.original.priceDecimals,
            })}
          </>
        ),
      },
      {
        accessor: 'vol24',
        Header: 'Valume',
        defaultCanSort: true,
        sortType: (rowA: Row<PAIR>, rowB: Row<PAIR>) =>
          Number(rowA.original.vol24) - Number(rowB.original.vol24),
        Cell: ({ value, row }) => (
          <>
            {Number(value).toLocaleString('en-US', {
              maximumFractionDigits: 16,
              minimumFractionDigits: row.original.priceDecimals,
            })}
          </>
        ),
      },
      {
        accessor: 'change24Percentage',
        Header: '24h Change',
        defaultCanSort: true,
        sortType: (rowA: Row<PAIR>, rowB: Row<PAIR>) =>
          Number(rowA.original.change24Percentage) -
          Number(rowB.original.change24Percentage),
        Cell: ({ value }) => (
          <span
            className={clsx(
              getChangeColorclassName(value),
              'flex items-center gap-1',
            )}
          >
            <span
              className={clsx(
                'scale-75 h-0 w-0 border-x-8 border-x-transparent',
                getChangeArrowclassName(value),
              )}
            ></span>
            {value} %
          </span>
        ),
      },
      {
        //
        accessor: 'vol24Base',
        Header: 'Trade',
        Cell: () => (
          <a
            href=''
            className={clsx(
              'px-5 py-2 max-sm:flex-1 max-sm:py-1 whitespace-nowrap',
              'hover:text-black text-yellow-500 border hover:border-yellow-400 hover:bg-yellow-400 focus:ring-2 focus:outline-none focus:ring-yellow-300 rounded-lg text-center dark:border-gray-700 dark:text-yellow-300 dark:hover:text-black dark:hover:bg-yellow-400 dark:focus:ring-yellow-900',
            )}
          >
            Buy / Sell
          </a>
        ),
      },

      {
        accessor: 'active',
        Header: 'Watchlist',
        Cell: ({ row }) => {
          const [isWatchlist, setIsWatchlist] = useState(
            Boolean(watchlist[row.original.name]),
          )

          const handleClick = () => {
            handleAddOrRemoveWatchlist(
              row.original,
              isWatchlist ? 'REMOVE' : 'ADD',
              setIsWatchlist,
            )
          }

          return (
            <button
              type='button'
              onClick={handleClick}
              className={clsx(
                'px-5 py-2 max-sm:flex-1 max-sm:py-1',
                'hover:text-white text-blue-700 border hover:border-blue-400 hover:bg-blue-400 focus:ring-2 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:border-gray-700 dark:text-blue-300 dark:hover:text-black dark:hover:bg-blue-400 dark:focus:ring-blue-900',
              )}
            >
              {isWatchlist ? 'Remove' : 'Add'}
            </button>
          )
        },
      },
    ],
    [qouteType],
  )

  const handleSearch = (evt: ChangeEvent<HTMLInputElement>) => {
    setSearch(evt.target.value)
  }

  const getPairs = () => {
    const searchValue = search.toLowerCase()
    return pairList?.filter(
      r =>
        (r.name.toLowerCase().includes(searchValue) ||
          r.localeName.toLowerCase().includes(searchValue) ||
          r.name.toLowerCase().includes(searchValue)) &&
        r.name.slice(1).includes(qouteType),
    )
  }

  return (
    <Table
      data={getPairs()?.slice(0, 6) ?? []}
      columns={columns}
      loading={isFetching}
      lodingCard={loadingCard}
      lodingCardSM={loadingCardSM}
      loadingCardCount={5}
      renderCell={renderCell}
      renderCellSM={renderCellSM}
      theadClasses='max-sm:hidden'
      theadSMClasses='hidden max-sm:block sticky top-14 z-50'
      header={
        <PairsTableHeader
          value={search}
          onChange={handleSearch}
          qoutes={qoutes}
          qouteType={qouteType}
          changeQoute={setQouteType}
        />
      }
    />
  )
}

export default PairsSection
