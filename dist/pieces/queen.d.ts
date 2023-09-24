import { Game } from '..';
import { Coord } from '../interfaces/Coord';
import { B, b } from './bishop';
import { K, k } from './king';
import { N, n } from './knight';
import { P, p } from './pawn';
import { Piece } from './piece';
import { R, r } from './rook';
export declare class Q extends Piece {
    name: string;
    shape: string;
    game: Game;
    constructor(game: Game, coord: Coord);
    getPossibleCoords: () => Coord[];
}
export declare class q extends Piece {
    name: string;
    shape: string;
    game: Game;
    constructor(game: Game, coord: Coord);
    getPossibleCoords: () => Coord[];
}
export declare function getAllPossibleCoordsQueen(self: P | p | K | k | B | b | N | n | Q | q | R | r | null, isAskForEatenCoords?: boolean): Coord[];
