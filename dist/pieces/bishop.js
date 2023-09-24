"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPossibleCoordsBishop = exports.b = exports.B = void 0;
const piece_1 = require("./piece");
// BISHOP_WHITE:
class B extends piece_1.Piece {
    constructor(game, coord) {
        super(coord);
        this.name = 'B';
        this.shape = '♗';
        this.getPossibleCoords = () => getAllPossibleCoordsBishop(this);
        this.game = game;
    }
}
exports.B = B;
// BISHOP_BLACK:
class b extends piece_1.Piece {
    constructor(game, coord) {
        super(coord);
        this.name = 'b';
        this.shape = '♝';
        this.getPossibleCoords = () => getAllPossibleCoordsBishop(this);
        this.game = game;
    }
}
exports.b = b;
function getAllPossibleCoordsBishop(self) {
    const possibleCoords = [];
    if (self) {
        const board = self.game.board.board;
        const pieceCoord = self.coord;
        const possibleDirections = [
            { i: 1, j: -1 },
            { i: 1, j: 1 },
            { i: -1, j: -1 },
            { i: -1, j: 1 }, // topRight
        ];
        for (const direction of possibleDirections) {
            for (let distance = 1; distance <= 8; distance++) {
                const diffI = distance * direction.i;
                const diffJ = distance * direction.j;
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
                    possibleCoords.push(nextCoord);
                }
                else {
                    const piece = board[nextCoord.i][nextCoord.j];
                    if (!self.game.isColorPieceWorthCurrPlayerColor(piece)) {
                        possibleCoords.push(nextCoord); // last coord -> eatable
                    }
                    break;
                }
            }
        }
    }
    return possibleCoords;
}
exports.getAllPossibleCoordsBishop = getAllPossibleCoordsBishop;
//# sourceMappingURL=bishop.js.map