"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPossibleKingCoordsToGetEatenPawn = exports.getAllPossibleCoordsKing = exports.k = exports.K = void 0;
const piece_1 = require("./piece");
// KING_WHITE:
class K extends piece_1.Piece {
    constructor(game, coord) {
        super(coord);
        this.name = 'K';
        this.shape = '♔';
        this.getPossibleCoords = () => getAllPossibleCoordsKing(this);
        this.game = game;
    }
}
exports.K = K;
// KING_BLACK:
class k extends piece_1.Piece {
    constructor(game, coord) {
        super(coord);
        this.name = 'k';
        this.shape = '♚';
        this.getPossibleCoords = () => getAllPossibleCoordsKing(this);
        this.game = game;
    }
}
exports.k = k;
function getAllPossibleCoordsKing(self) {
    const possibleCoords = [];
    if (self) {
        const { i: pieceI, j: pieceJ } = self.coord;
        const possibleSteps = [
            { i: -1, j: 0 },
            { i: 0, j: 1 },
            { i: -1, j: 1 },
            { i: -1, j: -1 },
            { i: 0, j: -1 },
            { i: 1, j: 0 },
            { i: 1, j: -1 },
            { i: 1, j: 1 },
        ];
        for (const step of possibleSteps) {
            const nextCoord = {
                i: pieceI + step.i,
                j: pieceJ + step.j,
            };
            if (nextCoord.i >= 0 &&
                nextCoord.i < 8 &&
                nextCoord.j >= 0 &&
                nextCoord.j < 8) {
                if (self.game.isEmptyCell(nextCoord)) {
                    possibleCoords.push(nextCoord);
                }
                else {
                    const piece = self.game.board.board[nextCoord.i][nextCoord.j];
                    if (!self.game.isColorPieceWorthCurrPlayerColor(piece)) {
                        possibleCoords.push(nextCoord); // push eatable coord
                    }
                }
            }
        }
        // Castling Coord:
        const castlingCoord = self.game.isBlackTurn
            ? { i: 0, j: 4 }
            : { i: 7, j: 4 };
        if (self.game.isCastlingLegal[self.game.isBlackTurn ? 'blackKing' : 'whiteKing']) {
            for (const direction of [1, -1]) {
                const targetColumn = direction === 1 ? 7 : 0;
                if (self.game.isEmptyCell({ i: castlingCoord.i, j: targetColumn })) {
                    const rookColumn = direction === 1 ? 7 : 0;
                    const coordForCastle = { i: castlingCoord.i, j: rookColumn };
                    if (self.game.isColorPieceWorthCurrPlayerColor(self.game.board.board[coordForCastle.i][coordForCastle.j])) {
                        possibleCoords.push(coordForCastle);
                    }
                }
            }
        }
    }
    return possibleCoords;
}
exports.getAllPossibleCoordsKing = getAllPossibleCoordsKing;
function getAllPossibleKingCoordsToGetEatenPawn(self) {
    const res = [];
    if (self) {
        const { isBlackTurn } = self.game;
        let kingCoord = self.coord;
        const possibleSteps = [
            {
                i: isBlackTurn ? kingCoord.i + 1 : kingCoord.i - 1,
                j: isBlackTurn ? kingCoord.j - 1 : kingCoord.j - 1,
            },
            {
                i: isBlackTurn ? kingCoord.i + 1 : kingCoord.i - 1,
                j: isBlackTurn ? kingCoord.j + 1 : kingCoord.j + 1,
            },
        ];
        for (let k = 0; k < possibleSteps.length; k++) {
            if (possibleSteps[k].i >= 0 &&
                possibleSteps[k].i < 8 &&
                possibleSteps[k].j >= 0 &&
                possibleSteps[k].j < 8) {
                res.push(possibleSteps[k]);
            }
        }
    }
    return res;
}
exports.getAllPossibleKingCoordsToGetEatenPawn = getAllPossibleKingCoordsToGetEatenPawn;
//# sourceMappingURL=king.js.map