import { Coord } from '../interfaces/Coord'
import { Piece } from './piece'

// PAWN_WHITE:
export class P extends Piece {
  name = 'P'
  shape = '♙'
  constructor(coord: Coord) {
    super(coord)
  }
}
// PAWN_BLACK:
export class p extends Piece {
  name = 'p'
  shape = '♟'
  constructor(coord: Coord) {
    super(coord)
  }
}
