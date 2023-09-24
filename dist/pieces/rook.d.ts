import { Game } from '..';
import { Coord } from '../interfaces/Coord';
import { B, b } from './bishop';
import { K, k } from './king';
import { N, n } from './knight';
import { P, p } from './pawn';
import { Piece } from './piece';
import { Q, q } from './queen';
export declare class R extends Piece {
    name: string;
    shape: string;
    game: Game;
    constructor(game: Game, coord: Coord);
    getPossibleCoords: () => Coord[];
}
export declare class r extends Piece {
    name: string;
    shape: string;
    game: Game;
    constructor(game: Game, coord: Coord);
    getPossibleCoords: () => Coord[];
}
export declare function getAllPossibleCoordsRook(self: P | p | K | k | B | b | N | n | Q | q | R | r | null): {
    i: number;
    j: number;
}[];
