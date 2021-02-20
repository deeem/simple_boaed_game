import { Game } from 'Game'
import { createMachine, interpret } from 'xstate'

const game = new Game()

const machine = createMachine(
  {
    initial: 'initial_phase',
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
  },
  {
    actions: {
      setNextPlayerActive: (context, event) => {
        game.setNextActivePlayer()
      },
      log: (context, event) => {
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
