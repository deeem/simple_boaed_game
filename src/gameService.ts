import { createMachine, interpret } from 'xstate'

const machine = createMachine({
  initial: 'wait_input_phase',
  states: {
    wait_input_phase: {},
    move_phase: {},
  },
})

const gameService = interpret(machine)

export { gameService }

gameService.onTransition((state) => {
  console.log('machine state', state)
})
