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
import { assign, createMachine, interpret } from 'xstate'
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

const machine = createMachine<MachineContext, MachineEvents>(
  {
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
        entry: ['setNextPlayerActive', 'assingNextPlayerActive'],
        on: {
          player_move_input_recieved: {
            actions: assingMovesLeft,
            target: 'player_move_forward',
          },
        },
      },
      player_move_forward: {
        entry: ['log', 'movePlayerForward', 'assignMovePlayerForward'],
        always: 'checkLastWaypont',
        exit: assign({ movesLeft: (context) => context.movesLeft - 1 }),
      },
      checkLastWaypont: {
        always: [
          {
            target: 'gameOver',
            cond: (context) => {
              return (
                getTileByPlayerId(context.activePlayer, context.tiles)
                  .waypoint === getLastWaypoint(context.tiles)
              )
            },
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
            cond: (context) => context.movesLeft > 0,
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
  },
  {
    actions: {
      setNextPlayerActive: () => {
        game.setNextActivePlayer()
      },
      assingNextPlayerActive: assign({
        activePlayer: (context) =>
          getNextPlayer(context.activePlayer, context.players).id,
      }),
      movePlayerForward: () => {
        game.movePlayerForward()
      },
      assignMovePlayerForward: assign({
        tiles: (context, event) =>
          movePlayerForward(context.activePlayer, context.tiles),
      }),
      log: (_, event) => {
        console.log('in log', event)
      },
    },
  },
)

const gameService = interpret(machine)

export { gameService }

gameService.onTransition((state) => {
  console.log('machine state', state)
})

/*
  context: {
    activePlayer: IPlayer
    movesLeft: 

  }


  WAIT_INPUT_PHASE

  * entry -> setNextActivePlayer[event] -> setNextActivePlayer[adapter] -> activePlayerSlice.set[store]

  * on : 'player_start_move_rolling' -> open modal with dice
  * on:  'player_end_move_rolling' => close modal; transit to 'move_phase
  
  MOVE_PLAYER_PHASE




*/

/*

  context: {
    players: IPlayer[],
    activePlayer: IPlayer,
    tiles: ITile[]

  }

  INITIAL_PHASE

  on: 'start_game' -> transit to 'player_tunr_start'


  PLAYER_TURN_STARTS | WAIT PLAYER MOVE ROLL RESULTS

  entry: setActivePlayer ()

  ui: on 'move button click' -> 'open moval'; when dice rolled - service.send('move', 1)


  MOVE_PLAYER



*/

/*

    states: {
      initial_phase: {
        on: {
          start_game: {
            target: 'wait_input_phase',
          },
        },
      },
      wait_input_phase: {
        entry: 'setNextPlayerActive',
        on: {
          always: [{ target: 'move_phase' }],
        },
      },
      move_phase: {
        entry: 'log',
      },
    },
*/
