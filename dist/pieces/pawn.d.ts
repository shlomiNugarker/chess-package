import { Game } from '..';
import { Coord } from '../interfaces/Coord';
import { B, b } from './bishop';
import { K, k } from './king';
import { N, n } from './knight';
import { Piece } from './piece';
import { Q, q } from './queen';
import { R, r } from './rook';
export declare class P extends Piece {
    name: string;
    shape: string;
    game: Game;
    constructor(game: Game, coord: Coord);
    getPossibleCoords: () => Coord[];
}
export declare class p extends Piece {
    name: string;
    shape: string;
    game: Game;
    constructor(game: Game, coord: Coord);
    getPossibleCoords: () => Coord[];
}
export declare function getAllPossibleCoordsPawn(self: P | p | K | k | B | b | N | n | Q | q | R | r | null): Coord[];
