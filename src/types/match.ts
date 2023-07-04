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
    finalPosition: string;
    side: BoardSide;
}