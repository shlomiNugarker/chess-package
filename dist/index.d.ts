import { Board } from './Board';
import { Coord } from './interfaces/Coord';
import { B, b } from './pieces/bishop';
import { K, k } from './pieces/king';
import { N, n } from './pieces/knight';
import { P, p } from './pieces/pawn';
import { Q, q } from './pieces/queen';
import { R, r } from './pieces/rook';
export declare class Game {
    isOnline: boolean;
    board: Board;
    selectedCellCoord: Coord | null;
    isWhiteKingThreatened: boolean;
    isBlackKingThreatened: boolean;
    isBlackTurn: boolean;
    eatableCellAfterTwoStepsPawnWhite: Coord | null;
    eatableCellAfterTwoStepsPawnBlack: Coord | null;
    kingPos: {
        black: Coord;
        white: Coord;
    };
    eatenPieces: {
        black: any[];
        white: any[];
    };
    players: {
        white: string;
        black: string;
    };
    isCastlingLegal: {
        whiteLeftSide: boolean;
        whiteRightSide: boolean;
        whiteKing: boolean;
        blackLeftSide: boolean;
        blackRightSide: boolean;
        blackKing: boolean;
    };
    constructor(isOnline?: boolean);
    isEmptyCell(coord: Coord): boolean;
    isColorPieceWorthCurrPlayerColor(piece: any): boolean;
    isBlackPiece(piece: P | p | K | k | B | b | N | n | Q | q | R | r | null): boolean | undefined;
    isOptionToCastling(pieceToCastling: any): boolean;
    isPawnStepsEnd(piece: P | p): boolean;
    updateKingPos(toCoord: Coord, piece: P | p | K | k | B | b | N | n | Q | q | R | r | null): this;
    movePiece(toCellCoord: Coord): this | undefined;
    checkIfKingThreatened(isFakeCheck?: boolean, coordToCheck?: {
        i: number;
        j: number;
    }): {
        isThreatened: boolean;
    };
    isCastleThreatened(fromCoord: Coord, toCoord: Coord): boolean;
    doCastling(toCoord: Coord): {
        isCastleLegal: boolean;
    } | undefined;
    isNextStepLegal(toCoord: Coord): {
        isMoveLegal: boolean;
    };
    isPlayerWin(): boolean | undefined;
    cloneDeep<T>(state: T): T;
    addPieceInsteadPawn(coordsToFill: Coord, pieceToAdd: P | p | K | k | B | b | N | n | Q | q | R | r): this;
    getBoard(): (string | null)[][];
}
