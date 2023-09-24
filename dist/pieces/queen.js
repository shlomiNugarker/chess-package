"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPossibleCoordsQueen = exports.q = exports.Q = void 0;
const piece_1 = require("./piece");
// QUEEN_WHITE:
class Q extends piece_1.Piece {
    constructor(game, coord) {
        super(coord);
        this.name = 'Q';
        this.shape = '♕';
        this.getPossibleCoords = () => getAllPossibleCoordsQueen(this);
        this.game = game;
    }
}
exports.Q = Q;
// QUEEN_BLACK:
class q extends piece_1.Piece {
    constructor(game, coord) {
        super(coord);
        this.name = 'q';
        this.shape = '♛';
        this.getPossibleCoords = () => getAllPossibleCoordsQueen(this);
        this.game = game;
    }
}
exports.q = q;
function getAllPossibleCoordsQueen(self, isAskForEatenCoords = false) {
    const res = [];
    if (self) {
        const board = self.game.board.board;
        const pieceCoord = self.coord;
        const possibleDir = [
            // Bishop:
            { i: 1, j: -1 },
            { i: 1, j: 1 },
            { i: -1, j: -1 },
            { i: -1, j: 1 },
            // Rook:
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
                    j: pieceCoord.j - diffJ,
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
                    if (!isAskForEatenCoords &&
                        !self.game.isColorPieceWorthCurrPlayerColor(piece)) {
                        res.push(nextCoord);
                    }
                    else if (isAskForEatenCoords) {
                        res.push(nextCoord);
                    }
                    break;
                }
            }
        }
    }
    return res;
}
exports.getAllPossibleCoordsQueen = getAllPossibleCoordsQueen;
//# sourceMappingURL=queen.js.map