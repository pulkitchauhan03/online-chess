import { BoardSide } from "../types/match";
import { TileStatus } from "../types/match";

const colName = (col: number) => {
    return String.fromCharCode(97 + col);
};

const rowName = (row: number) => {
    return 8 - row;
};

const otherKnight = (board, side, initial) => {
    const n = side === BoardSide.WHITE ? "wN" : "bN";
    board.map((row, i) => {
        row.map((val, j) => {
            if (val === n && i !== initial[0] && j !== initial[1]) {
                return [i, j];
            }
        });
    });
    return null;
};

const checkKnightConflict = (initial, final) => {
    const diff = [
        Math.abs(initial[0] - final[0]),
        Math.abs(initial[1] - final[1]),
    ];
    if ((diff[0] === 1 && diff[1] === 2) || (diff[0] === 2 && diff[1] === 1)) {
        return true;
    }
    return false;
};

export const getMoveName = (initial, final, board, side) => {
    // write logic to get the move name from the board
    if (board[initial[0]][initial[1]] === "") return "";

    const piece = board[initial[0]][initial[1]][1];
    const fr = rowName(final[0]);
    const fc = colName(final[1]);
    const ir = rowName(initial[0]);
    const ic = colName(initial[1]);

    if (piece === "P") {
        if (board[final[0]][final[1]] === "") {
            return fc + fr;
        } else {
            return ic + "x" + fc + fr;
        }
    }

    if (piece === "B") {
        if (board[final[0]][final[1]] === "") {
            return "B" + fc + fr;
        } else {
            return "Bx" + fc + fr;
        }
    }

    if (piece === "R") {
        if (board[final[0]][final[1]] === "") {
            return "R" + fc + fr;
        } else {
            return "Rx" + fc + fr;
        }
    }

    if (piece === "Q") {
        if (board[final[0]][final[1]] === "") {
            return "Q" + fc + fr;
        } else {
            return "Qx" + fc + fr;
        }
    }

    if (piece === "K") {
        if (board[final[0]][final[1]] === "") {
            return "K" + fc + fr;
        } else {
            return "Kx" + fc + fr;
        }
    }

    if (piece === "N") {
        let moveName = "";
        if (board[final[0]][final[1]] === "") {
            moveName = "N" + fc + fr;
        } else {
            moveName = "Nx" + fc + fr;
        }
        const oth = otherKnight(board, side, initial);
        if (oth) {
            if (checkKnightConflict) {
                if (initial[0] === oth[0]) {
                    moveName = ic + moveName;
                } else {
                    moveName = ir + moveName;
                }
            }
        }
        return moveName;
    }
};

const checkBounds = (pos) => {
    return pos[0] >= 0 && pos[0] < 8 && pos[1] >= 0 && pos[1] < 8;
}

export const getMoves = (board, position, side) => {
    if (board[position[0]][position[1]] === "") return [];

    const piece = board[position[0]][position[1]][1];
    const r = position[0];
    const c = position[1];

    const moves = [];

    if (piece === "P") {
        if (side === BoardSide.WHITE) {
            if (checkBounds([r - 1, c + 1]) && board[r - 1][c + 1][0] === "b") {
                moves.push({
                    pos: [r - 1, c + 1],
                    type: TileStatus.CAPTURE,
                });
            }
            if (checkBounds([r - 1, c - 1]) && board[r - 1][c - 1][0] === "b") {
                moves.push({
                    pos: [r - 1, c - 1],
                    type: TileStatus.CAPTURE,
                });
            }
            if (checkBounds([r - 1, c]) && board[r - 1][c] === "") {
                moves.push({
                    pos: [r - 1, c],
                    type: TileStatus.MOVE,
                });
                if (r === 6 && checkBounds([r - 2, c]) && board[r - 2][c] === "") {
                    moves.push({
                        pos: [r - 2, c],
                        type: TileStatus.MOVE,
                    });
                }
            }
        }
        if (side === BoardSide.BLACK) {
            if (checkBounds([r + 1, c + 1]) && board[r + 1][c + 1][0] === "w") {
                moves.push({
                    pos: [r + 1, c + 1],
                    type: TileStatus.CAPTURE,
                });
            }
            if (checkBounds([r + 1, c - 1]) && board[r + 1][c - 1][0] === "w") {
                moves.push({
                    pos: [r + 1, c - 1],
                    type: TileStatus.CAPTURE,
                });
            }
            if (checkBounds([r + 1, c]) && board[r + 1][c] === "") {
                moves.push({
                    pos: [r + 1, c],
                    type: TileStatus.MOVE,
                });
                if (r === 1 && checkBounds([r + 2, c]) && board[r + 2][c] === "") {
                    moves.push({
                        pos: [r + 2, c],
                        type: TileStatus.MOVE,
                    });
                }
            }
        }

        //en passant
        // if (side === BoardSide.WHITE && r === 3) {
        //     if (checkBounds([r, c + 1]) && board[r][c + 1] === "bP") {
        //         moves.push({
        //             pos: [r - 1, c + 1],
        //             type: "enpassant",
        //         });
        //     }
        //     if (checkBounds([r, c - 1]) && board[r][c - 1] === "bP") {
        //         moves.push({
        //             pos: [r - 1, c - 1],
        //             type: "enpassant",
        //         });
        //     }
        // }
        // if (side === BoardSide.BLACK && r === 4) {
        //     if (checkBounds([r, c + 1]) && board[r][c + 1] === "wP") {
        //         moves.push({
        //             pos: [r + 1, c + 1],
        //             type: "enpassant",
        //         });
        //     }
        //     if (checkBounds([r, c - 1]) && board[r][c - 1] === "wP") {
        //         moves.push({
        //             pos: [r + 1, c - 1],
        //             type: "enpassant",
        //         });
        //     }
        // }
    }

    if (piece === "R") {
        let i: number;
        for (i=r+1; i<8; i++) {
            if (board[i][c] === "") {
                moves.push({
                    pos: [i, c],
                    type: TileStatus.MOVE,
                });
            } else if (board[i][c][0] !== side[0]) {
                moves.push({
                    pos: [i, c],
                    type: TileStatus.CAPTURE,
                });
                break;
            } else {
                break;
            }
        }
        for (i=r-1; i>=0; i--) {
            if (board[i][c] === "") {
                moves.push({
                    pos: [i, c],
                    type: TileStatus.MOVE,
                });
            } else if (board[i][c][0] !== side[0]) {
                moves.push({
                    pos: [i, c],
                    type: TileStatus.CAPTURE,
                });
                break;
            } else {
                break;
            }
        }
        for (i=c+1; i<8; i++) {
            if (board[r][i] === "") {
                moves.push({
                    pos: [r, i],
                    type: TileStatus.MOVE,
                });
            } else if (board[r][i][0] !== side[0]) {
                moves.push({
                    pos: [r, i],
                    type: TileStatus.CAPTURE,
                });
                break;
            } else {
                break;
            }
        }
        for (i=c-1; i>=0; i--) {
            if (board[r][i] === "") {
                moves.push({
                    pos: [r, i],
                    type: TileStatus.MOVE,
                });
            } else if (board[r][i][0] !== side[0]) {
                moves.push({
                    pos: [r, i],
                    type: TileStatus.CAPTURE,
                });
                break;
            } else {
                break;
            }
        }
    }

    if (piece === "B") {
        let i: number;
        for (i=1; i<8; i++) {
            if (checkBounds([r+i, c+i])) {
                if (board[r+i][c+i] === "") {
                    moves.push({
                        pos: [r+i, c+i],
                        type: TileStatus.MOVE,
                    });
                } else if (board[r+i][c+i][0] !== side[0]) {
                    moves.push({
                        pos: [r+i, c+i],
                        type: TileStatus.CAPTURE,
                    });
                    break;
                } else {
                    break;
                }
            }
        }
        for (i=1; i<8; i++) {
            if (checkBounds([r-i, c-i])) {
                if (board[r-i][c-i] === "") {
                    moves.push({
                        pos: [r-i, c-i],
                        type: TileStatus.MOVE,
                    });
                } else if (board[r-i][c-i][0] !== side[0]) {
                    moves.push({
                        pos: [r-i, c-i],
                        type: TileStatus.CAPTURE,
                    });
                    break;
                } else {
                    break;
                }
            }
        }
        for (i=1; i<8; i++) {
            if (checkBounds([r+i, c-i])) {
                if (board[r+i][c-i] === "") {
                    moves.push({
                        pos: [r+i, c-i],
                        type: TileStatus.MOVE,
                    });
                } else if (board[r+i][c-i][0] !== side[0]) {
                    moves.push({
                        pos: [r+i, c-i],
                        type: TileStatus.CAPTURE,
                    });
                    break;
                } else {
                    break;
                }
            }
        }
        for (i=1; i<8; i++) {
            if (checkBounds([r-i, c+i])) {
                if (board[r-i][c+i] === "") {
                    moves.push({
                        pos: [r-i, c+i],
                        type: TileStatus.MOVE,
                    });
                } else if (board[r-i][c+i][0] !== side[0]) {
                    moves.push({
                        pos: [r-i, c+i],
                        type: TileStatus.CAPTURE,
                    });
                    break;
                } else {
                    break;
                }
            }
        }
    }

    if (piece === "Q") {
        let i: number;
        for (i=r+1; i<8; i++) {
            if (board[i][c] === "") {
                moves.push({
                    pos: [i, c],
                    type: TileStatus.MOVE,
                });
            } else if (board[i][c][0] !== side[0]) {
                moves.push({
                    pos: [i, c],
                    type: TileStatus.CAPTURE,
                });
                break;
            } else {
                break;
            }
        }
        for (i=r-1; i>=0; i--) {
            if (board[i][c] === "") {
                moves.push({
                    pos: [i, c],
                    type: TileStatus.MOVE,
                });
            } else if (board[i][c][0] !== side[0]) {
                moves.push({
                    pos: [i, c],
                    type: TileStatus.CAPTURE,
                });
                break;
            } else {
                break;
            }
        }
        for (i=c+1; i<8; i++) {
            if (board[r][i] === "") {
                moves.push({
                    pos: [r, i],
                    type: TileStatus.MOVE,
                });
            } else if (board[r][i][0] !== side[0]) {
                moves.push({
                    pos: [r, i],
                    type: TileStatus.CAPTURE,
                });
                break;
            } else {
                break;
            }
        }
        for (i=c-1; i>=0; i--) {
            if (board[r][i] === "") {
                moves.push({
                    pos: [r, i],
                    type: TileStatus.MOVE,
                });
            } else if (board[r][i][0] !== side[0]) {
                moves.push({
                    pos: [r, i],
                    type: TileStatus.CAPTURE,
                });
                break;
            } else {
                break;
            }
        }
        for (i=1; i<8; i++) {
            if (checkBounds([r+i, c+i])) {
                if (board[r+i][c+i] === "") {
                    moves.push({
                        pos: [r+i, c+i],
                        type: TileStatus.MOVE,
                    });
                } else if (board[r+i][c+i][0] !== side[0]) {
                    moves.push({
                        pos: [r+i, c+i],
                        type: TileStatus.CAPTURE,
                    });
                    break;
                } else {
                    break;
                }
            }
        }
        for (i=1; i<8; i++) {
            if (checkBounds([r-i, c-i])) {
                if (board[r-i][c-i] === "") {
                    moves.push({
                        pos: [r-i, c-i],
                        type: TileStatus.MOVE,
                    });
                } else if (board[r-i][c-i][0] !== side[0]) {
                    moves.push({
                        pos: [r-i, c-i],
                        type: TileStatus.CAPTURE,
                    });
                    break;
                } else {
                    break;
                }
            }
        }
        for (i=1; i<8; i++) {
            if (checkBounds([r+i, c-i])) {
                if (board[r+i][c-i] === "") {
                    moves.push({
                        pos: [r+i, c-i],
                        type: TileStatus.MOVE,
                    });
                } else if (board[r+i][c-i][0] !== side[0]) {
                    moves.push({
                        pos: [r+i, c-i],
                        type: TileStatus.CAPTURE,
                    });
                    break;
                } else {
                    break;
                }
            }
        }
        for (i=1; i<8; i++) {
            if (checkBounds([r-i, c+i])) {
                if (board[r-i][c+i] === "") {
                    moves.push({
                        pos: [r-i, c+i],
                        type: TileStatus.MOVE,
                    });
                } else if (board[r-i][c+i][0] !== side[0]) {
                    moves.push({
                        pos: [r-i, c+i],
                        type: TileStatus.CAPTURE,
                    });
                    break;
                } else {
                    break;
                }
            }
        }
    }

    if (piece === "K") {
        if (checkBounds([r+1, c+1])) {
            if (board[r+1][c+1] === "") {
                moves.push({
                    pos: [r+1, c+1],
                    type: TileStatus.MOVE,
                });
            } else if (board[r+1][c+1][0] !== side[0]) {
                moves.push({
                    pos: [r+1, c+1],
                    type: TileStatus.CAPTURE,
                });
            }
        }
        if (checkBounds([r+1, c])) {
            if (board[r+1][c] === "") {
                moves.push({
                    pos: [r+1, c],
                    type: TileStatus.MOVE,
                });
            } else if (board[r+1][c][0] !== side[0]) {
                moves.push({
                    pos: [r+1, c],
                    type: TileStatus.CAPTURE,
                });
            }
        }
        if (checkBounds([r+1, c-1])) {
            if (board[r+1][c-1] === "") {
                moves.push({
                    pos: [r+1, c-1],
                    type: TileStatus.MOVE,
                });
            } else if (board[r+1][c-1][0] !== side[0]) {
                moves.push({
                    pos: [r+1, c-1],
                    type: TileStatus.CAPTURE,
                });
            }
        }
        if (checkBounds([r, c+1])) {
            if (board[r][c+1] === "") {
                moves.push({
                    pos: [r, c+1],
                    type: TileStatus.MOVE,
                });
            } else if (board[r][c+1][0] !== side[0]) {
                moves.push({
                    pos: [r, c+1],
                    type: TileStatus.CAPTURE,
                });
            }
        }
        if (checkBounds([r, c-1])) {
            if (board[r][c-1] === "") {
                moves.push({
                    pos: [r, c-1],
                    type: TileStatus.MOVE,
                });
            } else if (board[r][c-1][0] !== side[0]) {
                moves.push({
                    pos: [r, c-1],
                    type: TileStatus.CAPTURE,
                });
            }
        }
        if (checkBounds([r-1, c+1])) {
            if (board[r-1][c+1] === "") {
                moves.push({
                    pos: [r-1, c+1],
                    type: TileStatus.MOVE,
                });
            } else if (board[r-1][c+1][0] !== side[0]) {
                moves.push({
                    pos: [r-1, c+1],
                    type: TileStatus.CAPTURE,
                });
            }
        }
        if (checkBounds([r-1, c])) {
            if (board[r-1][c] === "") {
                moves.push({
                    pos: [r-1, c],
                    type: TileStatus.MOVE,
                });
            } else if (board[r-1][c][0] !== side[0]) {
                moves.push({
                    pos: [r-1, c],
                    type: TileStatus.CAPTURE,
                });
            }
        }
        if (checkBounds([r-1, c-1])) {
            if (board[r-1][c-1] === "") {
                moves.push({
                    pos: [r-1, c-1],
                    type: TileStatus.MOVE,
                });
            } else if (board[r-1][c-1][0] !== side[0]) {
                moves.push({
                    pos: [r-1, c-1],
                    type: TileStatus.CAPTURE,
                });
            }
        }
    
        // Castling
        if (side === BoardSide.WHITE && position[0] === 7 && position[1] === 4) {
            if (board[7][5] === "" && board[7][6] === "" && board[7][7] === "wR") {
                moves.push({
                    pos: [7, 6],
                    type: TileStatus.MOVE,
                });
            }
            if (board[7][3] === "" && board[7][2] === "" && board[7][1] === "" && board[7][0] === "wR") {
                moves.push({
                    pos: [7, 2],
                    type: TileStatus.MOVE,
                });
            }
        }
        if (side === BoardSide.BLACK && position[0] === 0 && position[1] === 4) {
            if (board[0][5] === "" && board[0][6] === "" && board[0][7] === "bR") {
                moves.push({
                    pos: [0, 6],
                    type: TileStatus.MOVE,
                });
            }
            if (board[0][3] === "" && board[0][2] === "" && board[0][1] === "" && board[0][0] === "bR") {
                moves.push({
                    pos: [0, 2],
                    type: TileStatus.MOVE,
                });
            }
        }
    }

    if (piece === "N") {
        if (checkBounds([r+2, c+1])) {
            if (board[r+2][c+1] === "") {   
                moves.push({
                    pos: [r+2, c+1],
                    type: TileStatus.MOVE,
                });
            } else if (board[r+2][c+1][0] !== side[0]) {
                moves.push({
                    pos: [r+2, c+1],
                    type: TileStatus.CAPTURE,
                });
            }
        }
        if (checkBounds([r+2, c-1])) {
            if (board[r+2][c-1] === "") {
                moves.push({
                    pos: [r+2, c-1],
                    type: TileStatus.MOVE,
                });
            } else if (board[r+2][c-1][0] !== side[0]) {
                moves.push({
                    pos: [r+2, c-1],
                    type: TileStatus.CAPTURE,
                });
            }
        }
        if (checkBounds([r-2, c+1])) {
            if (board[r-2][c+1] === "") {
                moves.push({
                    pos: [r-2, c+1],
                    type: TileStatus.MOVE,
                });
            } else if (board[r-2][c+1][0] !== side[0]) {
                moves.push({
                    pos: [r-2, c+1],
                    type: TileStatus.CAPTURE,
                });
            }
        }
        if (checkBounds([r-2, c-1])) {
            if (board[r-2][c-1] === "") {
                moves.push({
                    pos: [r-2, c-1],
                    type: TileStatus.MOVE,
                });
            } else if (board[r-2][c-1][0] !== side[0]) {
                moves.push({
                    pos: [r-2, c-1],
                    type: TileStatus.CAPTURE,
                });
            }
        }
        if (checkBounds([r+1, c+2])) {
            if (board[r+1][c+2] === "") {
                moves.push({
                    pos: [r+1, c+2],
                    type: TileStatus.MOVE,
                });
            } else if (board[r+1][c+2][0] !== side[0]) {
                moves.push({
                    pos: [r+1, c+2],
                    type: TileStatus.CAPTURE,
                });
            }
        }
        if (checkBounds([r+1, c-2])) {
            if (board[r+1][c-2] === "") {
                moves.push({
                    pos: [r+1, c-2],
                    type: TileStatus.MOVE,
                });
            } else if (board[r+1][c-2][0] !== side[0]) {
                moves.push({
                    pos: [r+1, c-2],
                    type: TileStatus.CAPTURE,
                });
            }
        }
        if (checkBounds([r-1, c+2])) {
            if (board[r-1][c+2] === "") {
                moves.push({
                    pos: [r-1, c+2],
                    type: TileStatus.MOVE,
                });
            } else if (board[r-1][c+2][0] !== side[0]) {
                moves.push({
                    pos: [r-1, c+2],
                    type: TileStatus.CAPTURE,
                });
            }
        }
        if (checkBounds([r-1, c-2])) {
            if (board[r-1][c-2] === "") {
                moves.push({
                    pos: [r-1, c-2],
                    type: TileStatus.MOVE,
                });
            } else if (board[r-1][c-2][0] !== side[0]) {
                moves.push({
                    pos: [r-1, c-2],
                    type: TileStatus.CAPTURE,
                });
            }
        }
    }

    return moves;
};
