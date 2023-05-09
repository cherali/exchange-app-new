import { useGetPairsQuery } from 'App.services'

function App() {
  const { data: pairList } = useGetPairsQuery('')

  return (
    <div>
      <p>hello world</p>
    </div>
  )
}

export default App
