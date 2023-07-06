import { BoardSide } from "../types/match";

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
        console.log(position)
        if (side === BoardSide.WHITE) {
            if (checkBounds([r-1, c+1]) && board[r-1][c+1][0] === "b") {
                moves.push({
                    pos: [r-1, c+1],
                    type: "kill",
                });
            }
            if (checkBounds([r-1, c-1]) && board[r-1][c-1][0] === "b") {
                moves.push({
                    pos: [r-1, c-1],
                    type: "kill",
                });
            }
            if (checkBounds([r-1, c]) && board[r-1][c] === "") {
                moves.push({
                    pos: [r-1, c],
                    type: "move",
                });
                if (r === 6 && checkBounds([r-2, c]) && board[r-2][c] === "") {
                    moves.push({
                        pos: [r-2, c],
                        type: "move",
                    });
                }
            }
        }
    }

    return moves;

};
