import { IPlayer } from 'store/playerSlice'
import { ITile } from 'store/tileSlice'

export const initialactivePlayerSlice: string = ''

export const initialPlayerSlice: IPlayer[] = [
  { id: 'd79d7512-6fb5-11eb-9439-0242ac130002', name: 'bob' },
  { id: 'eea39748-ff40-40c8-9942-c2f690b43a2c', name: 'mary' },
  { id: '6c4f7868-d6ca-4862-a850-9ee8c813724c', name: 'john' },
]

export const initialTileSlice: ITile[] = [
  {
    waypoint: 1,
    players: [
      'eea39748-ff40-40c8-9942-c2f690b43a2c',
      '6c4f7868-d6ca-4862-a850-9ee8c813724c',
    ],
  },
  { waypoint: 7 },
  { waypoint: 8 },
  { waypoint: 9 },
  { waypoint: 2, players: ['d79d7512-6fb5-11eb-9439-0242ac130002'] },
  { waypoint: 6 },
  {},
  { waypoint: 10 },
  { waypoint: 3 },
  { waypoint: 5 },
  {},
  { waypoint: 11 },
  {},
  { waypoint: 4 },
  {},
  { waypoint: 12 },
]
