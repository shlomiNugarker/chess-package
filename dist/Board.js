"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = void 0;
const king_1 = require("./pieces/king");
const bishop_1 = require("./pieces/bishop");
const knight_1 = require("./pieces/knight");
const pawn_1 = require("./pieces/pawn");
const queen_1 = require("./pieces/queen");
const rook_1 = require("./pieces/rook");
class Board {
    constructor(game) {
        this.board = [];
        this.game = game;
        for (let i = 0; i < 8; i++) {
            this.board[i] = [];
            for (let j = 0; j < 8; j++) {
                let piece = null;
                const position = { i, j };
                if (i === 1) {
                    piece = new pawn_1.p(this.game, position);
                }
                else if (i === 6) {
                    piece = new pawn_1.P(this.game, position);
                }
                this.board[i][j] = piece;
            }
        }
        // BLACK
        this.board[0][0] = new rook_1.r(this.game, { i: 0, j: 0 });
        this.board[0][7] = new rook_1.r(this.game, { i: 0, j: 7 });
        this.board[0][1] = new knight_1.n(this.game, { i: 0, j: 1 });
        this.board[0][6] = new knight_1.n(this.game, { i: 0, j: 6 });
        this.board[0][2] = new bishop_1.b(this.game, { i: 0, j: 2 });
        this.board[0][5] = new bishop_1.b(this.game, { i: 0, j: 5 });
        this.board[0][3] = new queen_1.q(this.game, { i: 0, j: 3 });
        this.board[0][4] = new king_1.k(this.game, { i: 0, j: 4 });
        // WHITE
        this.board[7][0] = new rook_1.R(this.game, { i: 7, j: 0 });
        this.board[7][7] = new rook_1.R(this.game, { i: 7, j: 7 });
        this.board[7][1] = new knight_1.N(this.game, { i: 7, j: 6 });
        this.board[7][6] = new knight_1.N(this.game, { i: 7, j: 6 });
        this.board[7][2] = new bishop_1.B(this.game, { i: 7, j: 2 });
        this.board[7][5] = new bishop_1.B(this.game, { i: 7, j: 5 });
        this.board[7][3] = new queen_1.Q(this.game, { i: 7, j: 3 });
        this.board[7][4] = new king_1.K(this.game, { i: 7, j: 4 });
    }
}
exports.Board = Board;
//# sourceMappingURL=Board.js.map