import type { FC } from 'react'
import clsx from 'clsx'
import type {
  PairsTableHeaderProps,
  QouteType,
  TableHeaderProps,
  TableRowData,
  WatchlistTableHeaderProps,
} from './index.d'

const TableHeader = ({ value, onChange }: TableHeaderProps) => (
  <>
    <label htmlFor='search' className='sr-only'>
      Search
    </label>
    <div className='relative w-1/2 max-sm:w-full'>
      <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
        <svg
          aria-hidden='true'
          className='w-5 h-5 text-gray-500 dark:text-gray-400'
          fill='currentColor'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
            clipRule='evenodd'
          ></path>
        </svg>
      </div>
      <input
        type='text'
        id='search'
        className='outline-blue-500 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        placeholder='Search'
        value={value}
        onChange={onChange}
      />
    </div>
  </>
)

export const WatchlistTableHeader = ({
  value,
  onChange,
}: WatchlistTableHeaderProps) => (
  <div className='w-full bg-gray-300 dark:bg-gray-600 py-3 px-6 flex gap-4'>
    <TableHeader value={value} onChange={onChange} />
  </div>
)

export const PairsTableHeader = ({
  value,
  onChange,
  qoutes,
  qouteType,
  changeQoute,
}: PairsTableHeaderProps) => (
  <div className='w-full bg-gray-300 dark:bg-gray-600 py-3 px-6 flex gap-4'>
    <TableHeader value={value} onChange={onChange} />

    <div className='w-1/2 text-end max-sm:w-auto'>
      <div className='inline-flex rounded-md shadow-sm' role='group'>
        {qoutes.map((item, index) => (
          <button
            key={index}
            type='button'
            onClick={() => changeQoute(item as QouteType)}
            className={clsx(
              item === qouteType
                ? 'bg-blue-500 hover:bg-blue-400  dark:bg-blue-500 dark:hover:bg-blue-400 text-gray-50'
                : 'bg-white hover:bg-gray-100 dark:hover:bg-gray-500 text-gray-900 dark:bg-gray-700',
              index === 0
                ? 'px-4 py-2 text-sm font-medium border border-gray-200 rounded-l-lg dark:border-gray-600 dark:text-white dark:hover:text-white dark:focus:ring-blue-500 dark:focus:text-white'
                : 'px-4 py-2 text-sm font-medium border border-gray-200 rounded-r-md  dark:border-gray-600 dark:text-white dark:hover:text-white dark:focus:ring-blue-500 dark:focus:text-white',
            )}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  </div>
)

export const getPairBaseAssetImg = (imgUrl: string, pair: string) => {
  const qoute = pair.split('/')?.[1]

  return imgUrl.replace(`-${qoute}`, '')
}

export const getChangeColorclassName = (value: number) => {
  if (value > 0) {
    return 'text-green-600'
  } else if (value < 0) {
    return 'text-red-500'
  }

  return ''
}

export const getChangeArrowclassName = (value: number) => {
  if (value > 0) {
    return 'border-b-[16px] border-b-green-600'
  } else if (value < 0) {
    return 'border-t-[16px] border-t-red-500'
  }

  return ''
}

export const renderCell: FC<TableRowData> = ({ row }) => {
  const rowProps = { ...row.getRowProps(), key: undefined }

  return (
    <tr
      {...rowProps}
      className='px-6 py-3 bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 hover:cursor-pointer dark:hover:bg-gray-600 items-center'
    >
      {row.cells.map(cell => (
        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
      ))}
    </tr>
  )
}

export const renderCellSM: FC<TableRowData> = ({ row }) => {
  const rowProps = { ...row.getRowProps(), key: undefined }

  return (
    <tr
      {...rowProps}
      className='px-3 py-3 bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 hover:cursor-pointer dark:hover:bg-gray-600 items-between flex-col'
    >
      {row.cells.map(cell => {
        const tdProps = {
          ...cell.getCellProps(),
          style: { ...cell.getCellProps().style, width: '100%' },
        }

        const headerName = cell.column.Header?.toString()

        return headerName !== 'Trade' && headerName !== 'Watchlist' ? (
          <td {...tdProps} className='flex justify-between basis-auto'>
            <>
              <span className='font-bold text-base'>{headerName}</span>
              {headerName === 'Pair' ? (
                cell.render('Cell')
              ) : (
                <span>{cell.render('Cell')}</span>
              )}
            </>
          </td>
        ) : (
          <td
            {...tdProps}
            className={clsx(
              'mt-3 whitespace-nowrap',
              headerName === 'Watchlist' && 'border-solid',
            )}
          >
            <span className='flex-1 flex justify-between gap-8 items-center'>
              {headerName !== 'Trade' && (
                <span className='font-bold text-base'>{headerName} &nbsp;</span>
              )}
              {cell.render('Cell')}
            </span>
          </td>
        )
      })}
    </tr>
  )
}

export const LoadingCard = () => (
  <span className='w-full px-6 py-2 bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 hover:cursor-pointer dark:hover:bg-gray-600'>
    <span className='animate-pulse flex items-center justify-between'>
      <span className='flex flex-1 items-center'>
        <span className='rounded-full bg-slate-300 dark:bg-slate-700 h-10 w-10'></span>
        <span className='ms-3 rounded bg-slate-300 dark:bg-slate-700 h-6 w-20'></span>
      </span>

      <span className='inline-flex flex-1'>
        <span className='rounded bg-slate-300 dark:bg-slate-700 h-6 w-20'></span>
      </span>
      <span className='inline-flex flex-1'>
        <span className='rounded bg-slate-300 dark:bg-slate-700 h-6 w-20'></span>
      </span>
      <span className='inline-flex flex-1'>
        <span className='rounded bg-slate-300 dark:bg-slate-700 h-6 w-20'></span>
      </span>
      <span className='inline-flex flex-1'>
        <span className='rounded bg-slate-300 dark:bg-slate-700 h-6 w-20'></span>
      </span>
      <span className='inline-flex flex-1'>
        <span className='rounded bg-slate-300 dark:bg-slate-700 h-6 w-20'></span>
      </span>
    </span>
  </span>
)

export const LoadingCardSM = () => (
  <span className='w-full px-2 py-2 bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 hover:cursor-pointer dark:hover:bg-gray-600'>
    <span className='animate-pulse flex items-center justify-between flex-wrap me-3 gap-1 ms-2'>
      <span className='flex justify-between items-center w-full'>
        <span className='rounded bg-slate-300 dark:bg-slate-700 h-6 w-16'></span>
        <span className='inline-flex justify-center items-center'>
          <span className='rounded-full bg-slate-300 dark:bg-slate-700 h-10 w-10'></span>
          <span className='ms-2 rounded bg-slate-300 dark:bg-slate-700 h-6 w-16'></span>
        </span>
      </span>

      <span className='inline-flex w-full justify-between items-center'>
        <span className='rounded bg-slate-300 dark:bg-slate-700 h-6 w-16'></span>
        <span className='rounded bg-slate-300 dark:bg-slate-700 h-6 w-16'></span>
      </span>

      <span className='inline-flex w-full justify-between items-center'>
        <span className='rounded bg-slate-300 dark:bg-slate-700 h-6 w-16'></span>
        <span className='rounded bg-slate-300 dark:bg-slate-700 h-6 w-16'></span>
      </span>

      <span className='inline-flex w-full justify-between items-center'>
        <span className='rounded bg-slate-300 dark:bg-slate-700 h-6 w-16'></span>
        <span className='rounded bg-slate-300 dark:bg-slate-700 h-6 w-16'></span>
      </span>

      <span className='inline-flex w-full justify-between items-center'>
        <span className='rounded bg-slate-300 dark:bg-slate-700 h-6 w-16'></span>
        <span className='rounded bg-slate-300 dark:bg-slate-700 h-6 w-16'></span>
      </span>

      <span className='inline-flex w-full justify-between items-center'>
        <span className='rounded bg-slate-300 dark:bg-slate-700 h-6 w-16'></span>
        <span className='rounded bg-slate-300 dark:bg-slate-700 h-6 w-16'></span>
      </span>
    </span>
  </span>
)
