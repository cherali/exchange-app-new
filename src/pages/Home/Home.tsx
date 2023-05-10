import { useState, useTransition } from 'react'
import Header from 'Layouts/Header/Header'
import { getData, setData } from 'utils/storage'
import { removeItem } from 'utils/objects'
import { LoadingCard, LoadingCardSM } from './HomeComponents'
import PairsSection from './PairsSection'
import WatchlistSection from './WatchlistSection'
import { AddOrRemoveWatchlistFn } from './index.d'

const tabs = ['Pairs', 'Watchlist']

const HomePage = () => {
  const [tabIndex, setTabIndex] = useState<number>(0)
  const [isPending, startTransition] = useTransition()

  const handleAddOrRemoveWatchlist: AddOrRemoveWatchlistFn = (
    pair,
    action,
    update,
  ) => {
    const watchlist = getData()

    if (action === 'ADD') {
      const newWatchlist = { ...watchlist, [pair.name]: pair }
      setData(newWatchlist)
      !!update && update(true)
    } else if (action === 'REMOVE') {
      const newWatchList = removeItem(watchlist, pair.name)
      setData(newWatchList)
      !!update && update(false)
    }
  }

  const changeTabIndex = (index: number) => () => {
    startTransition(() => {
      setTabIndex(index)
    })
  }

  return (
    <>
      <Header />
      <main>
        <section className='max-sm:container lg:container mx-auto'>
          <div className='mb-4 text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700'>
            <ul className='flex flex-wrap -mb-px'>
              {tabs.map((item, index) => (
                <li key={item} className='mr-2'>
                  <button
                    onClick={changeTabIndex(index)}
                    className={
                      index === tabIndex
                        ? 'inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500'
                        : 'inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                    }
                    aria-current={index === tabIndex ? 'page' : undefined}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {!isPending && (
            <>
              {tabIndex === 0 && (
                <PairsSection
                  loadingCard={LoadingCard}
                  loadingCardSM={LoadingCardSM}
                  handleAddOrRemoveWatchlist={handleAddOrRemoveWatchlist}
                />
              )}

              {tabIndex === 1 && (
                <WatchlistSection
                  loadingCard={LoadingCard}
                  loadingCardSM={LoadingCardSM}
                  handleAddOrRemoveWatchlist={handleAddOrRemoveWatchlist}
                />
              )}
            </>
          )}
        </section>
      </main>
    </>
  )
}

export default HomePage
