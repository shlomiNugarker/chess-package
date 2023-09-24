"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPossibleCoordsRook = exports.r = exports.R = void 0;
const piece_1 = require("./piece");
// ROOK_WHITE:
class R extends piece_1.Piece {
    constructor(game, coord) {
        super(coord);
        this.name = 'R';
        this.shape = '♖';
        this.getPossibleCoords = () => getAllPossibleCoordsRook(this);
        this.game = game;
    }
}
exports.R = R;
// ROOK_BLACK:
class r extends piece_1.Piece {
    constructor(game, coord) {
        super(coord);
        this.name = 'r';
        this.shape = '♜';
        this.getPossibleCoords = () => getAllPossibleCoordsRook(this);
        this.game = game;
    }
}
exports.r = r;
function getAllPossibleCoordsRook(self) {
    const res = [];
    if (self) {
        const board = self.game.board.board;
        const pieceCoord = self.coord;
        const possibleDir = [
            { i: -1, j: 0 },
            { i: 1, j: 0 },
            { i: 0, j: 1 },
            { i: 0, j: -1 }, // to left
        ];
        for (let k = 0; k < possibleDir.length; k++) {
            for (let i = 1; i <= 8; i++) {
                const diffI = i * possibleDir[k].i;
                const diffJ = i * possibleDir[k].j;
                const nextCoord = {
                    i: pieceCoord.i + diffI,
                    j: pieceCoord.j + diffJ,
                };
                if (nextCoord.i > 7 ||
                    nextCoord.i < 0 ||
                    nextCoord.j > 7 ||
                    nextCoord.j < 0) {
                    break;
                }
                if (self.game.isEmptyCell(nextCoord)) {
                    res.push(nextCoord);
                }
                else {
                    const piece = board[nextCoord.i][nextCoord.j];
                    if (!self.game.isColorPieceWorthCurrPlayerColor(piece))
                        res.push(nextCoord); //last coord -> eatable
                    else if (self.game.isColorPieceWorthCurrPlayerColor(piece) &&
                        self.game.isOptionToCastling(piece)) {
                        let isCastlingLegal;
                        if (pieceCoord.j === 0) {
                            isCastlingLegal = self.game.isBlackTurn
                                ? self.game.isCastlingLegal.blackLeftSide
                                : self.game.isCastlingLegal.whiteLeftSide;
                        }
                        if (pieceCoord.j === 7) {
                            isCastlingLegal = self.game.isBlackTurn
                                ? self.game.isCastlingLegal.blackRightSide
                                : self.game.isCastlingLegal.whiteRightSide;
                        }
                        let isKingMoveLegal;
                        self.game.isBlackTurn
                            ? (isKingMoveLegal = self.game.isCastlingLegal.blackKing)
                            : (isKingMoveLegal = self.game.isCastlingLegal.whiteKing);
                        isCastlingLegal && isKingMoveLegal && res.push(nextCoord);
                    }
                    break;
                }
            }
        }
    }
    return res;
}
exports.getAllPossibleCoordsRook = getAllPossibleCoordsRook;
//# sourceMappingURL=rook.js.map