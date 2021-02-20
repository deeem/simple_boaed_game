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
