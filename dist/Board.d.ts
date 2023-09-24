import { Game } from '.';
import { K, k } from './pieces/king';
import { B, b } from './pieces/bishop';
import { N, n } from './pieces/knight';
import { P, p } from './pieces/pawn';
import { Q, q } from './pieces/queen';
import { R, r } from './pieces/rook';
export declare class Board {
    board: (K | k | B | b | N | n | P | p | Q | q | R | r | null)[][];
    game: Game;
    constructor(game: Game);
}
