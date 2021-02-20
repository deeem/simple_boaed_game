import activePlayerSlice from 'store/activePlayerSlice'
import { getNextPlayer, RootState, store } from 'store/configureStore'

class Game {
  //   state: RootState

  //   constructor() {
  //     this.state = store.getState()
  //   }

  setNextActivePlayer() {
    const rootState = store.getState()
    const nextPlayer = getNextPlayer(rootState)
    store.dispatch(activePlayerSlice.actions.setActive(nextPlayer.id))
  }
}

export { Game }

//
