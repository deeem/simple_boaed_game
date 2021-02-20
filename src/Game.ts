import activePlayerSlice from 'store/activePlayerSlice'
import { store } from 'store/configureStore'
import { selectNextPlayer } from 'store/selectors'
import tileSlice from 'store/tileSlice'
import { gameService } from './gameService'
class Game {
  //   state: RootState

  //   constructor() {
  //     this.state = store.getState()
  //   }

  setNextActivePlayer() {
    const rootState = store.getState()
    const nextPlayer = selectNextPlayer(rootState)
    store.dispatch(activePlayerSlice.actions.setActive(nextPlayer.id))
  }

  movePlayer(activePlayer: string) {
    store.dispatch(
      tileSlice.actions.movePlayer({
        id: activePlayer,
        value: 1,
      }),
    )
  }
}

export { Game }
