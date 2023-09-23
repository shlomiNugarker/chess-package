import { Game } from '..'
import { Coord } from '../interfaces/Coord'
import { Piece } from './piece'

// BISHOP_WHITE:
export class B extends Piece {
  name = 'B'
  shape = '♗'
  constructor(game: Game, coord: Coord) {
    super(coord)
  }
}
// BISHOP_BLACK:
export class b extends Piece {
  name = 'b'
  shape = '♝'
  constructor(game: Game, coord: Coord) {
    super(coord)
  }
}
