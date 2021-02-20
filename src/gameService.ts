import { Game } from 'Game'
import {
  initialactivePlayerSlice,
  initialPlayerSlice,
  initialTileSlice,
} from 'initialValues'
import { getNextPlayer } from 'util/getNextPlayer'
import { assign, createMachine, interpret } from 'xstate'

const game = new Game()

const machine = createMachine(
  {
    context: {
      tiles: initialTileSlice,
      players: initialPlayerSlice,
      activePlayer: initialactivePlayerSlice,
    },
    initial: 'initial_phase',
    states: {
      initial_phase: {
        on: {
          start_game: {
            target: 'player_turn_start_phase',
          },
        },
      },
      player_turn_start_phase: {
        entry: ['setNextPlayerActive', 'assingNextPlayerActive'],
        on: {
          player_move_input_recieved: {
            target: 'move_phase',
          },
        },
      },
      move_phase: {
        entry: 'log',
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
