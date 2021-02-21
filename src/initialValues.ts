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
    id: 1,
    waypoint: 1,
    players: [
      'eea39748-ff40-40c8-9942-c2f690b43a2c',
      '6c4f7868-d6ca-4862-a850-9ee8c813724c',
    ],
  },
  { id: 2, waypoint: 7 },
  { id: 3, waypoint: 8 },
  { id: 4, waypoint: 9 },
  { id: 5, waypoint: 2, players: ['d79d7512-6fb5-11eb-9439-0242ac130002'] },
  { id: 6, waypoint: 6 },
  { id: 7 },
  { id: 8, waypoint: 10 },
  { id: 9, waypoint: 3 },
  { id: 10, waypoint: 5 },
  { id: 11 },
  { id: 12, waypoint: 11 },
  { id: 13 },
  { id: 14, waypoint: 4 },
  { id: 15 },
  { id: 16, waypoint: 12 },
]
