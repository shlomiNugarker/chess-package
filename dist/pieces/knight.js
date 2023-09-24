"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPossibleCoordsKnight = exports.n = exports.N = void 0;
const piece_1 = require("./piece");
// KNIGHT_WHITE:
class N extends piece_1.Piece {
    constructor(game, coord) {
        super(coord);
        this.name = 'N';
        this.shape = '♘';
        this.getPossibleCoords = () => getAllPossibleCoordsKnight(this);
        this.game = game;
    }
}
exports.N = N;
// KNIGHT_BLACK:
class n extends piece_1.Piece {
    constructor(game, coord) {
        super(coord);
        this.name = 'n';
        this.shape = '♞';
        this.getPossibleCoords = () => getAllPossibleCoordsKnight(this);
        this.game = game;
    }
}
exports.n = n;
function getAllPossibleCoordsKnight(self) {
    const board = self === null || self === void 0 ? void 0 : self.game.board.board;
    const pieceCoord = self === null || self === void 0 ? void 0 : self.coord;
    const res = [];
    const possibleSteps = [
        { i: -2, j: -1 },
        { i: -2, j: 1 },
        { i: -1, j: 2 },
        { i: -1, j: -2 },
        { i: 1, j: -2 },
        { i: 1, j: 2 },
        { i: 2, j: 1 },
        { i: 2, j: -1 },
    ];
    for (let k = 0; k < possibleSteps.length; k++) {
        if (pieceCoord) {
            const diffI = possibleSteps[k].i;
            const diffJ = possibleSteps[k].j;
            const nextCoord = { i: pieceCoord.i + diffI, j: pieceCoord.j + diffJ };
            if (nextCoord.i >= 0 &&
                nextCoord.i < 8 &&
                nextCoord.j >= 0 &&
                nextCoord.j < 8 &&
                board) {
                if (self === null || self === void 0 ? void 0 : self.game.isEmptyCell(nextCoord))
                    res.push(nextCoord);
                else {
                    const piece = board[nextCoord.i][nextCoord.j];
                    if (!(self === null || self === void 0 ? void 0 : self.game.isColorPieceWorthCurrPlayerColor(piece)))
                        res.push(nextCoord); //-> eatable  coord
                }
            }
        }
    }
    return res;
}
exports.getAllPossibleCoordsKnight = getAllPossibleCoordsKnight;
//# sourceMappingURL=knight.js.map