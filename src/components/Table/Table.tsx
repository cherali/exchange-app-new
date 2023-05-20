import type { FC } from 'react'
import clsx from 'clsx'
import {
  useBlockLayout,
  useColumnOrder,
  useSortBy,
  useTable,
} from 'react-table'
import { useMediaQuery } from 'hooks/useMediaQuery'
import { IRenderCellFn, ITableProps } from './index.d'

const getRenderCell: IRenderCellFn = (size, { renderCell, renderCellSM }) => {
  if (size === 'sm') {
    return renderCellSM
  }

  return renderCell
}

const Table: FC<ITableProps<any>> = ({
  columns,
  data,
  loading,
  loadingCard: LoadingCard,
  loadingCardSM: LoadingCardSM,
  loadingCardCount = 5,
  renderCell,
  renderCellSM,
  footer: Footer,
  header: Header,
  theadClasses,
  theadSMClasses,
}) => {
  const { getTableProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
    },
    useSortBy,
    useBlockLayout,
    useColumnOrder,
  )

  const size = useMediaQuery()

  const Cell = getRenderCell(size, {
    renderCell,
    renderCellSM,
  })

  const LoadingCell = getRenderCell(size, {
    renderCell: LoadingCard,
    renderCellSM: LoadingCardSM,
  })

  return (
    <div className='flex flex-col flex-wrap'>
      {Header}
      <table
        {...getTableProps()}
        className='w-full text-sm text-left text-gray-500 dark:text-gray-400 flex flex-col'
      >
        <thead
          className={clsx(
            'text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400 sticky top-14 z-50',
            theadClasses,
          )}
        >
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()} className='flex px-6'>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps(
                    column.defaultCanSort
                      ? column.getSortByToggleProps()
                      : undefined,
                  )}
                  scope='col'
                  className='py-3 flex-1'
                >
                  {column.render('Header')}

                  <span className='relative top-[-2px] left-2'>
                    {column.defaultCanSort ? (
                      <button className=''>
                        {column.isSortedDesc === undefined ? (
                          <span className='relative'>
                            <span className='absolute h-0 w-0 border-x-4 border-x-transparent border-t-[8px] border-t-gray-400'></span>

                            <span className='absolute bottom-1.5  h-0 w-0 border-x-4 border-x-transparent border-b-[8px] border-b-gray-400'></span>
                          </span>
                        ) : column.isSortedDesc ? (
                          <span className='relative top-5 h-0 w-0 border-x-4 border-x-transparent border-t-[8px] border-t-blue-600'></span>
                        ) : (
                          <span className='relative bottom-4  h-0 w-0 border-x-4 border-x-transparent border-b-[8px] border-b-blue-600'></span>
                        )}
                      </button>
                    ) : null}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <thead
          className={clsx(
            'text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400',
            theadSMClasses,
          )}
        >
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()} className='flex px-6'>
              {headerGroup.headers
                .filter(r => r.defaultCanSort)
                .map(column => (
                  <th
                    {...column.getHeaderProps(
                      column.defaultCanSort
                        ? column.getSortByToggleProps()
                        : undefined,
                    )}
                    scope='col'
                    className='py-3 flex-1'
                  >
                    {column.render('Header')}

                    <span className='relative top-[-2px] left-2'>
                      {column.defaultCanSort ? (
                        <button className=''>
                          {column.isSortedDesc === undefined ? (
                            <span className='relative'>
                              <span className='absolute h-0 w-0 border-x-4 border-x-transparent border-t-[8px] border-t-gray-400'></span>

                              <span className='absolute bottom-1.5  h-0 w-0 border-x-4 border-x-transparent border-b-[8px] border-b-gray-400'></span>
                            </span>
                          ) : column.isSortedDesc ? (
                            <span className='relative top-5 h-0 w-0 border-x-4 border-x-transparent border-t-[8px] border-t-blue-600'></span>
                          ) : (
                            <span className='relative bottom-4  h-0 w-0 border-x-4 border-x-transparent border-b-[8px] border-b-blue-600'></span>
                          )}
                        </button>
                      ) : null}
                    </span>
                  </th>
                ))}
            </tr>
          ))}
        </thead>

        {loading && (
          <tbody className='bg-white border-b dark:bg-gray-900 dark:border-gray-700'>
            {Array(loadingCardCount)
              .fill('')
              .map((_, i) => (
                <tr key={i} className='w-full flex'>
                  <td>
                    <LoadingCell />
                  </td>
                </tr>
              ))}
          </tbody>
        )}

        {!loading && data.length === 0 && (
          <tbody>
            <tr className='inline-flex'>
              <td className='text-center h-16 w-full items-center justify-center'>
                <span className='font-bold'>No Record.</span>
              </td>
            </tr>
          </tbody>
        )}

        {!loading && data.length !== 0 && (
          <tbody className='bg-white border-b dark:bg-gray-900 dark:border-gray-700'>
            {rows.map(row => {
              prepareRow(row)
              return <Cell key={row.getRowProps().key} row={row} />
            })}
          </tbody>
        )}
      </table>
      {Footer && <Footer />}
    </div>
  )
}

export default Table
