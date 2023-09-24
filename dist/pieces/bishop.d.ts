import { Game } from '..';
import { Coord } from '../interfaces/Coord';
import { K, k } from './king';
import { N, n } from './knight';
import { P, p } from './pawn';
import { Piece } from './piece';
import { Q, q } from './queen';
import { R, r } from './rook';
export declare class B extends Piece {
    name: string;
    shape: string;
    game: Game;
    constructor(game: Game, coord: Coord);
    getPossibleCoords: () => Coord[];
}
export declare class b extends Piece {
    name: string;
    shape: string;
    game: Game;
    constructor(game: Game, coord: Coord);
    getPossibleCoords: () => Coord[];
}
export declare function getAllPossibleCoordsBishop(self: P | p | K | k | B | b | N | n | Q | q | R | r | null): {
    i: number;
    j: number;
}[];
