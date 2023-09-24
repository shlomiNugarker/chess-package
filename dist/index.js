"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const Board_1 = require("./Board");
const bishop_1 = require("./pieces/bishop");
const king_1 = require("./pieces/king");
const knight_1 = require("./pieces/knight");
const queen_1 = require("./pieces/queen");
const rook_1 = require("./pieces/rook");
class Game {
    constructor(isOnline = false) {
        this.selectedCellCoord = null;
        this.isWhiteKingThreatened = false;
        this.isBlackKingThreatened = false;
        this.isBlackTurn = false;
        this.eatableCellAfterTwoStepsPawnWhite = null;
        this.eatableCellAfterTwoStepsPawnBlack = null;
        this.kingPos = {
            black: { i: 0, j: 4 },
            white: { i: 7, j: 4 },
        };
        this.eatenPieces = {
            black: [],
            white: [],
        };
        this.isCastlingLegal = {
            whiteLeftSide: true,
            whiteRightSide: true,
            whiteKing: true,
            blackLeftSide: true,
            blackRightSide: true,
            blackKing: true,
        };
        this.isOnline = isOnline;
        this.board = new Board_1.Board(this);
        this.players = { white: 'userId_white', black: 'userId_black' };
    }
    isEmptyCell(coord) {
        return this.board.board[coord.i][coord.j] === null;
    }
    isColorPieceWorthCurrPlayerColor(piece) {
        return this.isBlackTurn === this.isBlackPiece(piece.name);
    }
    isBlackPiece(piece) {
        switch (piece === null || piece === void 0 ? void 0 : piece.name) {
            case 'K': // KING_WHITE
            case 'B': // BISHOP_WHITE
            case 'P': // PAWN_WHITE:
            case 'Q': // QUEEN_WHITE:
            case 'R': // ROOK_WHITE:
            case 'N': // KNIGHT_WHITE:
                return false;
            case 'k': // KING_BLACK:
            case 'b': // BISHOP_BLACK:
            case 'p': //PAWN_BLACK:
            case 'q': //  QUEEN_BLACK:
            case 'r': // ROOK_BLACK:
            case 'n': // KNIGHT_BLACK:
                return true;
            default:
                return undefined;
        }
    }
    isOptionToCastling(pieceToCastling) {
        if (!this.selectedCellCoord)
            return false;
        const currPiece = this.board.board[this.selectedCellCoord.i][this.selectedCellCoord.j];
        if ((pieceToCastling.name === 'K' && (currPiece === null || currPiece === void 0 ? void 0 : currPiece.name) === 'R') ||
            (pieceToCastling.name === 'R' && (currPiece === null || currPiece === void 0 ? void 0 : currPiece.name) === 'K') ||
            (pieceToCastling.name === 'k' && (currPiece === null || currPiece === void 0 ? void 0 : currPiece.name) === 'r') ||
            (pieceToCastling.name === 'r' && (currPiece === null || currPiece === void 0 ? void 0 : currPiece.name) === 'k')) {
            return true;
        }
        return false;
    }
    isPawnStepsEnd(piece) {
        if ((piece === null || piece === void 0 ? void 0 : piece.name) === 'p' && this.isBlackTurn && piece.coord.i === 7) {
            return true;
        }
        else if ((piece === null || piece === void 0 ? void 0 : piece.name) === 'P' &&
            !this.isBlackTurn &&
            piece.coord.i === 0) {
            return true;
        }
        return false;
    }
    updateKingPos(toCoord, piece) {
        if ((piece === null || piece === void 0 ? void 0 : piece.name) === 'K') {
            // white king
            this.kingPos.white = { i: toCoord.i, j: toCoord.j };
        }
        if ((piece === null || piece === void 0 ? void 0 : piece.name) === 'k') {
            // black king
            this.kingPos.black = { i: toCoord.i, j: toCoord.j };
        }
        return this;
    }
    movePiece(toCellCoord) {
        var _a, _b, _c, _d, _e, _f;
        const fromCoord = this.selectedCellCoord;
        const toCoord = toCellCoord;
        const isKingMoved = (fromCoord && ((_a = this.board.board[fromCoord.i][fromCoord.j]) === null || _a === void 0 ? void 0 : _a.name) === 'K') ||
            (fromCoord && ((_b = this.board.board[fromCoord.i][fromCoord.j]) === null || _b === void 0 ? void 0 : _b.name) === 'k');
        const isRookMoved = (fromCoord && ((_c = this.board.board[fromCoord.i][fromCoord.j]) === null || _c === void 0 ? void 0 : _c.name) === 'R') ||
            (fromCoord && ((_d = this.board.board[fromCoord.i][fromCoord.j]) === null || _d === void 0 ? void 0 : _d.name) === 'r');
        const isCellWithPiece = this.board.board[toCoord.i][toCoord.j];
        if (!fromCoord)
            return;
        if (!this.isBlackTurn &&
            this.eatableCellAfterTwoStepsPawnBlack &&
            this.eatableCellAfterTwoStepsPawnBlack.i === toCoord.i + 1 &&
            this.eatableCellAfterTwoStepsPawnBlack.j === toCoord.j) {
            const piece = this.board.board[this.eatableCellAfterTwoStepsPawnBlack.i][this.eatableCellAfterTwoStepsPawnBlack.j];
            this.board.board[this.eatableCellAfterTwoStepsPawnBlack.i][this.eatableCellAfterTwoStepsPawnBlack.j] = null;
            this.eatenPieces.white.push(piece);
        }
        if (this.isBlackTurn &&
            this.eatableCellAfterTwoStepsPawnWhite &&
            this.eatableCellAfterTwoStepsPawnWhite.i === toCoord.i - 1 &&
            this.eatableCellAfterTwoStepsPawnWhite.j === toCoord.j) {
            const piece = this.board.board[this.eatableCellAfterTwoStepsPawnWhite.i][this.eatableCellAfterTwoStepsPawnWhite.j];
            this.board.board[this.eatableCellAfterTwoStepsPawnWhite.i][this.eatableCellAfterTwoStepsPawnWhite.j] = null;
            this.eatenPieces.black.push(piece);
        }
        if (((_e = this.board.board[fromCoord.i][fromCoord.j]) === null || _e === void 0 ? void 0 : _e.name) === 'P' &&
            fromCoord.i === 6 &&
            toCoord.i === 4) {
            this.eatableCellAfterTwoStepsPawnWhite = toCoord;
        }
        else if (((_f = this.board.board[fromCoord.i][fromCoord.j]) === null || _f === void 0 ? void 0 : _f.name) === 'p' &&
            fromCoord.i === 1 &&
            toCoord.i === 3) {
            this.eatableCellAfterTwoStepsPawnBlack = toCoord;
        }
        else {
            if (this.eatableCellAfterTwoStepsPawnBlack)
                this.eatableCellAfterTwoStepsPawnBlack = null;
            if (this.eatableCellAfterTwoStepsPawnWhite)
                this.eatableCellAfterTwoStepsPawnWhite = null;
        }
        if (isCellWithPiece) {
            const eatenPiece = this.board.board[toCoord.i][toCoord.j];
            const isEatenPieceBlack = this.isBlackPiece(eatenPiece);
            if (isEatenPieceBlack === true) {
                this.eatenPieces.white.push(eatenPiece);
            }
            else if (isEatenPieceBlack === false) {
                this.eatenPieces.black.push(eatenPiece);
            }
        }
        const piece = this.board.board[fromCoord.i][fromCoord.j];
        this.board.board[fromCoord.i][fromCoord.j] = null;
        this.board.board[toCoord.i][toCoord.j] = piece;
        if (isKingMoved) {
            this.updateKingPos(toCoord, piece);
            if (this.isBlackTurn) {
                this.isCastlingLegal.blackKing = false;
            }
            else {
                this.isCastlingLegal.whiteKing = false;
            }
        }
        if (isRookMoved) {
            if (fromCoord.j === 0) {
                this.isBlackTurn
                    ? (this.isCastlingLegal.blackLeftSide = false)
                    : (this.isCastlingLegal.whiteLeftSide = false);
            }
            else if (fromCoord.j === 7) {
                this.isBlackTurn
                    ? (this.isCastlingLegal.blackRightSide = false)
                    : (this.isCastlingLegal.whiteRightSide = false);
            }
        }
        this.selectedCellCoord = null;
        return this;
    }
    checkIfKingThreatened(isFakeCheck = false, coordToCheck) {
        const board = this.board.board;
        let isFoundThreatenPiece = false;
        let kingPos = this.isBlackTurn
            ? board[this.kingPos.black.i][this.kingPos.black.j]
            : board[this.kingPos.white.i][this.kingPos.white.j];
        // this act is for check another piece as a king coords (for example when castling..)
        if (coordToCheck)
            kingPos = board[coordToCheck.i][coordToCheck.j];
        const knightOpts = (0, knight_1.getAllPossibleCoordsKnight)(kingPos);
        const kingOpts = (0, king_1.getAllPossibleCoordsKing)(kingPos);
        const queenOpts = (0, queen_1.getAllPossibleCoordsQueen)(kingPos, true);
        const pawnOpts = (0, king_1.getAllPossibleKingCoordsToGetEatenPawn)(kingPos);
        const bishopOpts = (0, bishop_1.getAllPossibleCoordsBishop)(kingPos);
        const rookOpts = (0, rook_1.getAllPossibleCoordsRook)(kingPos);
        !isFoundThreatenPiece &&
            queenOpts.forEach((coord) => {
                const pieceToCheck = board[coord.i][coord.j];
                const threatenPiece = this.isBlackTurn
                    ? 'Q' // QUEEN_WHITE
                    : 'q'; // QUEEN_BLACK
                if (pieceToCheck && pieceToCheck.name === threatenPiece) {
                    isFoundThreatenPiece = true;
                    // !isFakeCheck && paintKingCellToRed(kingPos)
                }
            });
        !isFoundThreatenPiece &&
            kingOpts.forEach((coord) => {
                const pieceToCheck = board[coord.i][coord.j];
                const threatenPiece = this.isBlackTurn
                    ? 'K' // KING_WHITE
                    : 'k'; // KING_BLACK
                if (pieceToCheck && pieceToCheck.name === threatenPiece) {
                    isFoundThreatenPiece = true;
                    // !isFakeCheck && paintKingCellToRed(kingPos) // !!
                }
            });
        !isFoundThreatenPiece &&
            knightOpts.forEach((coord) => {
                const pieceToCheck = board[coord.i][coord.j];
                const threatenPiece = this.isBlackTurn
                    ? 'N' // KNIGHT_WHITE
                    : 'n'; // KNIGHT_BLACK
                if (pieceToCheck && pieceToCheck.name === threatenPiece) {
                    isFoundThreatenPiece = true;
                    // !isFakeCheck && paintKingCellToRed(kingPos) // !!
                }
            });
        !isFoundThreatenPiece &&
            pawnOpts.forEach((coord) => {
                const pieceToCheck = board[coord.i][coord.j];
                const threatenPiece = this.isBlackTurn
                    ? 'P' // PAWN_WHITE
                    : 'p'; // PAWN_BLACK
                if (pieceToCheck && pieceToCheck.name === threatenPiece) {
                    isFoundThreatenPiece = true;
                    // !isFakeCheck && paintKingCellToRed(kingPos)
                }
            });
        !isFoundThreatenPiece &&
            bishopOpts.forEach((coord) => {
                const pieceToCheck = board[coord.i][coord.j];
                const threatenPiece = this.isBlackTurn
                    ? 'B' // BISHOP_WHITE
                    : 'b'; // BISHOP_BLACK
                if (pieceToCheck && pieceToCheck.name === threatenPiece) {
                    isFoundThreatenPiece = true;
                    // !isFakeCheck && paintKingCellToRed(kingPos)
                }
            });
        !isFoundThreatenPiece &&
            rookOpts.forEach((coord) => {
                const pieceToCheck = board[coord.i][coord.j];
                const threatenPiece = this.isBlackTurn
                    ? 'R' // ROOK_WHITE
                    : 'r'; // ROOK_BLACK
                if (pieceToCheck && pieceToCheck.name === threatenPiece) {
                    isFoundThreatenPiece = true;
                    // !isFakeCheck && paintKingCellToRed(kingPos)
                }
            });
        if (!isFoundThreatenPiece) {
            if (!isFakeCheck) {
                this.isBlackTurn
                    ? (this.isBlackKingThreatened = false)
                    : (this.isWhiteKingThreatened = false);
                // document.querySelector('.red')?.classList.remove('red')
            }
            return { isThreatened: false };
        }
        this.isBlackTurn
            ? (this.isBlackKingThreatened = true)
            : (this.isWhiteKingThreatened = true);
        return { isThreatened: true };
    }
    isCastleThreatened(fromCoord, toCoord) {
        let isCastleLegal = true;
        let coordsToCheck = [];
        if ((fromCoord.j === 0 && toCoord.j === 4) ||
            (fromCoord.j === 4 && toCoord.j === 0)) {
            if (this.isBlackTurn) {
                coordsToCheck = [
                    { i: 0, j: 0 },
                    { i: 0, j: 1 },
                    { i: 0, j: 2 },
                    { i: 0, j: 3 },
                ];
            }
            else if (!this.isBlackTurn) {
                coordsToCheck = [
                    { i: 7, j: 0 },
                    { i: 7, j: 1 },
                    { i: 7, j: 2 },
                    { i: 7, j: 3 },
                ];
            }
        }
        else if ((fromCoord.j === 7 && toCoord.j === 4) ||
            (fromCoord.j === 4 && toCoord.j === 7)) {
            if (this.isBlackTurn) {
                coordsToCheck = [
                    { i: 0, j: 5 },
                    { i: 0, j: 6 },
                    { i: 0, j: 7 },
                ];
            }
            else if (!this.isBlackTurn) {
                coordsToCheck = [
                    { i: 7, j: 5 },
                    { i: 7, j: 6 },
                    { i: 7, j: 7 },
                ];
            }
        }
        coordsToCheck.forEach((coord) => {
            const { isThreatened } = this.checkIfKingThreatened(true, coord);
            if (isThreatened) {
                isCastleLegal = !isThreatened;
            }
        });
        return isCastleLegal;
    }
    doCastling(toCoord) {
        var _a, _b, _c, _d, _e, _f;
        const fromCoord = this.selectedCellCoord;
        if (!fromCoord)
            return;
        let kingPiece = null;
        let newKingCoords = null;
        let rookPiece;
        let rookCoords;
        let isCastleLegal = true;
        // WHITE KING:
        if (((_a = this.board.board[toCoord.i][toCoord.j]) === null || _a === void 0 ? void 0 : _a.name) === 'K' || // KING_WHITE
            ((_b = this.board.board[toCoord.i][toCoord.j]) === null || _b === void 0 ? void 0 : _b.name) === 'R' // ROOK_WHITE
        ) {
            if (((_c = this.board.board[fromCoord.i][fromCoord.j]) === null || _c === void 0 ? void 0 : _c.name) === 'R' // ROOK_WHITE
            ) {
                rookPiece = this.board.board[fromCoord.i][fromCoord.j];
                kingPiece = this.board.board[toCoord.i][toCoord.j];
                rookCoords = fromCoord;
            }
            else {
                rookPiece = this.board.board[toCoord.i][toCoord.j];
                kingPiece = this.board.board[fromCoord.i][fromCoord.j];
                rookCoords = toCoord;
            }
            if (rookCoords.j === 0 && !this.isCastlingLegal.whiteLeftSide)
                return;
            if (rookCoords.j === 7 && !this.isCastlingLegal.whiteRightSide)
                return;
            if (!this.isCastlingLegal.whiteKing)
                return;
            if (this.isWhiteKingThreatened)
                return;
            this.board.board[fromCoord.i][fromCoord.j] = null;
            this.board.board[toCoord.i][toCoord.j] = null;
            if (fromCoord.j === 0 && toCoord.j === 4) {
                const isThreatened = this.isCastleThreatened(fromCoord, toCoord);
                if (!isThreatened) {
                    isCastleLegal = false;
                    return { isCastleLegal };
                }
                this.board.board[7][3] = rookPiece;
                this.board.board[7][2] = kingPiece;
                newKingCoords = { i: 7, j: 2 };
                this.kingPos.white = newKingCoords;
            }
            else if (fromCoord.j === 7 && toCoord.j === 4) {
                const isThreatened = this.isCastleThreatened(fromCoord, toCoord);
                if (!isThreatened) {
                    isCastleLegal = false;
                    return { isCastleLegal };
                }
                this.board.board[7][5] = rookPiece;
                this.board.board[7][6] = kingPiece;
                newKingCoords = { i: 7, j: 6 };
                this.kingPos.white = newKingCoords;
            }
            else if (fromCoord.j === 4 && toCoord.j === 7) {
                const isThreatened = this.isCastleThreatened(fromCoord, toCoord);
                if (!isThreatened) {
                    isCastleLegal = false;
                    return { isCastleLegal };
                }
                this.board.board[7][5] = rookPiece;
                this.board.board[7][6] = kingPiece;
                newKingCoords = { i: 7, j: 6 };
                this.kingPos.white = newKingCoords;
            }
            else if (fromCoord.j === 4 && toCoord.j === 0) {
                const isThreatened = this.isCastleThreatened(fromCoord, toCoord);
                if (!isThreatened) {
                    isCastleLegal = false;
                    return { isCastleLegal };
                }
                this.board.board[7][3] = rookPiece;
                this.board.board[7][2] = kingPiece;
                newKingCoords = { i: 7, j: 2 };
                this.kingPos.white = newKingCoords;
            }
            this.isCastlingLegal.whiteKing = false;
        }
        // BLACK KING:
        if (((_d = this.board.board[toCoord.i][toCoord.j]) === null || _d === void 0 ? void 0 : _d.name) === 'k' || //KING_BLACK
            ((_e = this.board.board[toCoord.i][toCoord.j]) === null || _e === void 0 ? void 0 : _e.name) === 'r' // ROOK_BLACK
        ) {
            if (((_f = this.board.board[fromCoord.i][fromCoord.j]) === null || _f === void 0 ? void 0 : _f.name) === 'r' // ROOK_BLACK
            ) {
                rookPiece = this.board.board[fromCoord.i][fromCoord.j];
                kingPiece = this.board.board[toCoord.i][toCoord.j];
                rookCoords = fromCoord;
            }
            else {
                rookPiece = this.board.board[toCoord.i][toCoord.j];
                kingPiece = this.board.board[fromCoord.i][fromCoord.j];
                rookCoords = toCoord;
            }
            if (rookCoords.j === 0 && !this.isCastlingLegal.blackLeftSide)
                return;
            if (rookCoords.j === 7 && !this.isCastlingLegal.blackRightSide)
                return;
            if (!this.isCastlingLegal.blackKing)
                return;
            if (this.isBlackKingThreatened)
                return;
            this.board.board[fromCoord.i][fromCoord.j] = null; // EMPTY
            this.board.board[toCoord.i][toCoord.j] = null; // EMPTY
            if (fromCoord.j === 0 && toCoord.j === 4) {
                const isThreatened = this.isCastleThreatened(fromCoord, toCoord);
                if (!isThreatened) {
                    isCastleLegal = false;
                    return { isCastleLegal };
                }
                this.board.board[0][3] = rookPiece;
                this.board.board[0][2] = kingPiece;
                newKingCoords = { i: 0, j: 2 };
                this.kingPos.black = newKingCoords;
            }
            else if (fromCoord.j === 7 && toCoord.j === 4) {
                const isThreatened = this.isCastleThreatened(fromCoord, toCoord);
                if (!isThreatened) {
                    isCastleLegal = false;
                    return { isCastleLegal };
                }
                this.board.board[0][5] = rookPiece;
                this.board.board[0][6] = kingPiece;
                newKingCoords = { i: 0, j: 6 };
                this.kingPos.black = newKingCoords;
            }
            else if (fromCoord.j === 4 && toCoord.j === 7) {
                const isThreatened = this.isCastleThreatened(fromCoord, toCoord);
                if (!isThreatened) {
                    isCastleLegal = false;
                    return { isCastleLegal };
                }
                this.board.board[0][5] = rookPiece;
                this.board.board[0][6] = kingPiece;
                newKingCoords = { i: 0, j: 6 };
                this.kingPos.black = newKingCoords;
            }
            else if (fromCoord.j === 4 && toCoord.j === 0) {
                const isThreatened = this.isCastleThreatened(fromCoord, toCoord);
                if (!isThreatened) {
                    isCastleLegal = false;
                    return { isCastleLegal };
                }
                this.board.board[0][3] = rookPiece;
                this.board.board[0][2] = kingPiece;
                newKingCoords = { i: 0, j: 2 };
                this.kingPos.black = newKingCoords;
            }
            this.isCastlingLegal.blackKing = false;
        }
        return { isCastleLegal };
    }
    isNextStepLegal(toCoord) {
        var _a, _b;
        const fromCoord = this.selectedCellCoord;
        if (!fromCoord)
            return { isMoveLegal: false };
        const isKingMoved = ((_a = this.board.board[fromCoord.i][fromCoord.j]) === null || _a === void 0 ? void 0 : _a.name) === 'K' || // KING_WHITE
            ((_b = this.board.board[fromCoord.i][fromCoord.j]) === null || _b === void 0 ? void 0 : _b.name) === 'k'; // KING_BLACK
        const piece = this.board.board[fromCoord.i][fromCoord.j];
        this.board.board[fromCoord.i][fromCoord.j] = null; // EMPTY
        this.board.board[toCoord.i][toCoord.j] = piece;
        if (isKingMoved) {
            // KING_WHITE
            if ((piece === null || piece === void 0 ? void 0 : piece.name) === 'K') {
                this.kingPos.white = { i: toCoord.i, j: toCoord.j };
                this.isCastlingLegal.whiteLeftSide = false;
                this.isCastlingLegal.whiteRightSide = false;
            }
            // KING_BLACK
            if ((piece === null || piece === void 0 ? void 0 : piece.name) === 'k') {
                this.kingPos.black = { i: toCoord.i, j: toCoord.j };
                this.isCastlingLegal.blackLeftSide = false;
                this.isCastlingLegal.blackRightSide = false;
            }
        }
        const { isThreatened } = this.checkIfKingThreatened(true);
        return { isMoveLegal: !isThreatened };
    }
    isPlayerWin() {
        const { isBlackTurn } = this;
        const board = this.board.board;
        const color = isBlackTurn ? 'black' : 'white';
        let isWin = true;
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                const piece = board[i][j];
                if (color === 'black'
                    ? this.isBlackPiece(piece)
                    : !this.isBlackPiece(piece) &&
                        typeof this.isBlackPiece(piece) === 'boolean') {
                    const possibleCoords = piece === null || piece === void 0 ? void 0 : piece.getPossibleCoords();
                    if (!possibleCoords)
                        return;
                    for (let k = 0; k < possibleCoords.length; k++) {
                        const coord = possibleCoords[k];
                        const copyState = this.cloneDeep(this);
                        copyState.selectedCellCoord = { i, j };
                        const { isMoveLegal } = copyState.isNextStepLegal(coord);
                        if (isMoveLegal) {
                            isWin = false;
                            break;
                        }
                    }
                }
            }
        }
        return isWin;
    }
    cloneDeep(state) {
        return JSON.parse(JSON.stringify(state));
    }
    addPieceInsteadPawn(coordsToFill, pieceToAdd) {
        this.board.board[coordsToFill.i][coordsToFill.j] = pieceToAdd;
        return this;
    }
    getBoard() {
        var _a;
        const board = [];
        for (let i = 0; i < this.board.board.length; i++) {
            board[i] = [];
            for (let j = 0; j < this.board.board[i].length; j++) {
                board[i][j] = ((_a = this.board.board[i][j]) === null || _a === void 0 ? void 0 : _a.shape) || null;
            }
        }
        return board;
    }
}
exports.Game = Game;
//# sourceMappingURL=index.js.map