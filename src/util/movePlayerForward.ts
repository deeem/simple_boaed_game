import { ITile } from 'store/tileSlice'
import { getLastWaypoint } from './getLastWaypoint'
import { getTileByPlayerId } from './getTileByPlayerId'
import { getTileByWaypoint } from './getTileByWaypoint'
import { getTileIndex } from './getTileIndex'

const movePlayerForward = (playerId: string, origState: ITile[]): ITile[] => {
  const state = [...origState]

  const lastWaypoint = getLastWaypoint(state)

  const playerTile = getTileByPlayerId(playerId, state)

  const playerCurrentWaypoint = playerTile.waypoint || 1

  const destinationWaypoint =
    playerCurrentWaypoint + 1 < lastWaypoint
      ? playerCurrentWaypoint + 1
      : lastWaypoint

  const destinationTile = getTileByWaypoint(destinationWaypoint, state)

  state[getTileIndex(playerTile, state)] = {
    ...playerTile,
    players: playerTile.players?.filter((id) => id !== playerId),
  }

  state[getTileIndex(destinationTile, state)] = {
    ...destinationTile,
    players: [...(destinationTile.players || []), playerId],
  }

  return state
}

export { movePlayerForward }
