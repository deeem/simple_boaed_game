import { Game } from 'Game'
import {
  initialactivePlayerSlice,
  initialPlayerSlice,
  initialTileSlice,
} from 'initialValues'
import { IPlayer } from 'store/playerSlice'
import { ITile } from 'store/tileSlice'
import { getLastWaypoint } from 'util/getLastWaypoint'
import { getNextPlayer } from 'util/getNextPlayer'
import { getTileByPlayerId } from 'util/getTileByPlayerId'
import { movePlayerForward } from 'util/movePlayerForward'
import { createMachine, interpret } from 'xstate'
import { createModel } from 'xstate/lib/model' // opt-in, not part of main build

const game = new Game()

interface MachineContext {
  tiles: ITile[]
  players: IPlayer[]
  activePlayer: string
  movesLeft: number
}

type MachineEvents =
  | { type: 'start_game' }
  | { type: 'player_move_input_recieved'; value: number }

const machineModel = createModel<MachineContext, MachineEvents>({
  tiles: initialTileSlice,
  players: initialPlayerSlice,
  activePlayer: initialactivePlayerSlice,
  movesLeft: 0,
})

const assingMovesLeft = machineModel.assign(
  {
    movesLeft: (_, event) => +event.value,
  },
  'player_move_input_recieved',
)

const decreaseMovesLeft = machineModel.assign({
  movesLeft: (context) => context.movesLeft - 1,
})

const checkLastWaypont = (context: MachineContext) =>
  getTileByPlayerId(context.activePlayer, context.tiles).waypoint ===
  getLastWaypoint(context.tiles)

const log = (context: MachineContext, event: MachineEvents) => {
  console.log('in log', event)
}

const setNextPlayerActive = () => {
  game.setNextActivePlayer()
}

const assingNextPlayerActive = machineModel.assign({
  activePlayer: (context) =>
    getNextPlayer(context.activePlayer, context.players).id,
})

const movePlayerForwardAction = () => {
  game.movePlayerForward()
}

const assignMovePlayerForward = machineModel.assign({
  tiles: (context) => movePlayerForward(context.activePlayer, context.tiles),
})

const checkMovesLeft = (context: MachineContext) => context.movesLeft > 0

const machine = createMachine<MachineContext, MachineEvents>({
  context: machineModel.initialContext,
  initial: 'initial_phase',
  states: {
    initial_phase: {
      on: {
        start_game: {
          target: 'player_wait_move_input',
        },
      },
    },
    player_wait_move_input: {
      entry: [setNextPlayerActive, assingNextPlayerActive],
      on: {
        player_move_input_recieved: {
          actions: assingMovesLeft,
          target: 'player_move_forward',
        },
      },
    },
    player_move_forward: {
      entry: [log, movePlayerForwardAction, assignMovePlayerForward],
      always: 'checkLastWaypont',
      exit: decreaseMovesLeft,
    },
    checkLastWaypont: {
      always: [
        {
          target: 'gameOver',
          cond: checkLastWaypont,
        },
        {
          target: 'checkMovesLeft',
        },
      ],
    },
    checkMovesLeft: {
      always: [
        {
          target: 'player_move_forward',
          cond: checkMovesLeft,
        },
        {
          target: 'player_wait_move_input',
        },
      ],
    },
    gameOver: {
      type: 'final',
    },
  },
})

const gameService = interpret(machine)

export { gameService }

gameService.onTransition((state) => {
  console.log('machine state', state)
})
