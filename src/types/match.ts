export enum MatchStatus {
    NOT_STARTED = 'not-started',
    WAITING = 'waiting',
    IN_PROGRESS = 'in-progress',
    PAUSED = 'paused',
    FINISHED = 'finished',
}

export enum BoardSide {
    WHITE = 'white',
    BLACK = 'black',
}

export interface Move {
    name: string;
    initialPosition: [number, number];
    finalPosition: [number, number];
    side: BoardSide;
}

export enum TileStatus {
    SELECTED = "selected",
    MOVE = "move",
    CAPTURE = "capture",
    NONE = "none",
}