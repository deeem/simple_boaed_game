import React, { useEffect } from 'react'
import { Layout } from 'components/Layout'
import { PlayersBar } from 'components/playersBar/PlayersBar'
import { gameService } from 'gameService'

function App() {
  useEffect(() => {
    gameService.send('start_game')
  }, [])

  return (
    <>
      <Layout />
      <PlayersBar />
    </>
  )
}

export default App
