import React, { useEffect } from 'react'
import { Layout } from 'components/Layout'
import { PlayersBar } from 'components/playersBar/PlayersBar'
import { useDispatch, useSelector } from 'react-redux'
import { getFirstPlayer, getNextPlayer } from 'store/configureStore'
import activePlayerSlice from 'store/activePlayerSlice'

function App() {
  const firstPlayer = useSelector(getFirstPlayer)
  const nextPlayer = useSelector(getNextPlayer)
  const dispatch = useDispatch()

  console.log('first', firstPlayer.name)
  console.log('next', nextPlayer.name)

  useEffect(() => {
    dispatch(activePlayerSlice.actions.setActive(firstPlayer))

    console.log('--->', firstPlayer)
  }, [])

  return (
    <>
      <Layout />
      <PlayersBar />
    </>
  )
}

export default App
