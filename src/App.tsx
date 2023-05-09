import { useGetPairsQuery } from 'App.services'
import Header from 'Layouts/Header/Header'

function App() {
  const { data: pairList } = useGetPairsQuery('')

  return (
    <>
      <Header />
      <main>
        <p>hello world</p>
      </main>
    </>
  )
}

export default App
