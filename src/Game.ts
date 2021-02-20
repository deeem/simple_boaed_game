import activePlayerSlice from 'store/activePlayerSlice'
import { store } from 'store/configureStore'
import { selectNextPlayer } from 'store/selectors'

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
}

export { Game }

//
