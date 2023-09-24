import { Game } from '..';
import { Coord } from '../interfaces/Coord';
import { B, b } from './bishop';
import { N, n } from './knight';
import { P, p } from './pawn';
import { Piece } from './piece';
import { Q, q } from './queen';
import { R, r } from './rook';
export declare class K extends Piece {
    name: string;
    shape: string;
    game: Game;
    constructor(game: Game, coord: Coord);
    getPossibleCoords: () => Coord[];
}
export declare class k extends Piece {
    name: string;
    shape: string;
    game: Game;
    constructor(game: Game, coord: Coord);
    getPossibleCoords: () => Coord[];
}
export declare function getAllPossibleCoordsKing(self: P | p | K | k | B | b | N | n | Q | q | R | r | null): Coord[];
export declare function getAllPossibleKingCoordsToGetEatenPawn(self: P | p | K | k | B | b | N | n | Q | q | R | r | null): {
    i: number;
    j: number;
}[];
