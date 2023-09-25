"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPossibleCoordsPawn = exports.p = exports.P = void 0;
const piece_1 = require("./piece");
// PAWN_WHITE:
class P extends piece_1.Piece {
    constructor(game, coord) {
        super(coord);
        this.name = 'P';
        this.shape = '♙';
        this.getPossibleCoords = () => getAllPossibleCoordsPawn(this);
        this.game = game;
    }
}
exports.P = P;
// PAWN_BLACK:
class p extends piece_1.Piece {
    constructor(game, coord) {
        super(coord);
        this.name = 'p';
        this.shape = '♟';
        this.getPossibleCoords = () => getAllPossibleCoordsPawn(this);
        this.game = game;
    }
}
exports.p = p;
function getAllPossibleCoordsPawn(self) {
    const res = [];
    if (self) {
        const board = self.game.board.board;
        const isBlackPiece = self.game.isBlackPiece(self);
        const pieceCoord = self.coord;
        // Regular steps
        let diff = isBlackPiece ? 1 : -1;
        let nextCoord = { i: pieceCoord.i + diff, j: pieceCoord.j };
        if (self.game.isEmptyCell(nextCoord)) {
            res.push(nextCoord);
            if ((pieceCoord.i === 1 && isBlackPiece) ||
                (pieceCoord.i === 6 && !isBlackPiece)) {
                diff *= 2;
                nextCoord = { i: pieceCoord.i + diff, j: pieceCoord.j };
                if (self.game.isEmptyCell(nextCoord))
                    res.push(nextCoord);
            }
        }
        // eatable cells:
        if (!isBlackPiece) {
            const nextLeftCoord = { i: pieceCoord.i - 1, j: pieceCoord.j - 1 };
            const nextRightCoord = { i: pieceCoord.i - 1, j: pieceCoord.j + 1 };
            if (board[nextLeftCoord.i][nextLeftCoord.j] &&
                !self.game.isColorPieceWorthCurrPlayerColor(board[nextLeftCoord.i][nextLeftCoord.j])) {
                res.push(nextLeftCoord);
            }
            if (board[nextRightCoord.i][nextRightCoord.j] &&
                !self.game.isColorPieceWorthCurrPlayerColor(board[nextRightCoord.i][nextRightCoord.j])) {
                res.push(nextRightCoord);
            }
        }
        if (isBlackPiece) {
            const nextLeftCoord = { i: pieceCoord.i + 1, j: pieceCoord.j - 1 };
            const nextRightCoord = { i: pieceCoord.i + 1, j: pieceCoord.j + 1 };
            if (board[nextLeftCoord.i][nextLeftCoord.j] &&
                !self.game.isColorPieceWorthCurrPlayerColor(board[nextLeftCoord.i][nextLeftCoord.j])) {
                res.push(nextLeftCoord);
            }
            if (board[nextRightCoord.i][nextRightCoord.j] &&
                !self.game.isColorPieceWorthCurrPlayerColor(board[nextRightCoord.i][nextRightCoord.j])) {
                res.push(nextRightCoord);
            }
        }
        // Check if can eat cell after 2 steps of pawn:
        if (self.game.eatableCellAfterTwoStepsPawnWhite &&
            self.game.isBlackTurn &&
            pieceCoord.i === 4) {
            const eatableCell = Object.assign({}, self.game.eatableCellAfterTwoStepsPawnWhite);
            eatableCell.i = eatableCell.i + 1;
            res.push(eatableCell);
        }
        else if (self.game.eatableCellAfterTwoStepsPawnBlack &&
            !self.game.isBlackTurn &&
            pieceCoord.i === 3) {
            const eatableCell = Object.assign({}, self.game.eatableCellAfterTwoStepsPawnBlack);
            eatableCell.i = eatableCell.i - 1;
            res.push(eatableCell);
        }
    }
    return res;
}
exports.getAllPossibleCoordsPawn = getAllPossibleCoordsPawn;
//# sourceMappingURL=pawn.js.map