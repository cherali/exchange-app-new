import { FC, useState, useMemo, ChangeEvent } from 'react'
import type { Column, Row } from 'react-table'
import clsx from 'clsx'
import type { PAIR } from 'types'
import { getData } from 'utils/storage'
import { removeItem } from 'utils/objects'
import Table from 'components/Table/Table'
import {
  WatchlistTableHeader,
  getChangeArrowclassName,
  getChangeColorclassName,
  getPairBaseAssetImg,
  renderCell,
  renderCellSM,
} from './HomeComponents'
import { WatchlistSectionProps } from './index.d'

const WatchlistSection: FC<WatchlistSectionProps> = ({
  loadingCard,
  loadingCardSM,
  handleAddOrRemoveWatchlist,
}) => {
  const [search, setSearch] = useState<string>('')

  const [watchlist, setWatchlist] = useState(getData())

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
          const handleClick = () => {
            handleAddOrRemoveWatchlist(row.original, 'REMOVE')
            setWatchlist(removeItem(watchlist, row.original.name))
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
              Remove
            </button>
          )
        },
      },
    ],
    [watchlist],
  )

  const handleSearch = (evt: ChangeEvent<HTMLInputElement>) => {
    setSearch(evt.target.value)
  }

  // use to return pairs
  // most check if watchlist pair exist in pair list
  const getPairs = () => {
    const searchValue = search.toLowerCase()
    return Object.values<PAIR>(watchlist).filter(
      r =>
        r.name.toLowerCase().includes(searchValue) ||
        r.localeName.toLowerCase().includes(searchValue) ||
        r.name.toLowerCase().includes(searchValue),
    )
  }

  return (
    <Table
      data={getPairs()}
      columns={columns}
      lodingCard={loadingCard}
      lodingCardSM={loadingCardSM}
      loadingCardCount={5}
      renderCell={renderCell}
      renderCellSM={renderCellSM}
      theadClasses='max-sm:hidden'
      theadSMClasses='hidden max-sm:block sticky top-14 z-50'
      header={<WatchlistTableHeader value={search} onChange={handleSearch} />}
    />
  )
}

export default WatchlistSection
