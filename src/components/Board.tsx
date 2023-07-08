import { MatchStatus, Move, BoardSide, TileStatus } from "../types/match";
import { pieceDict } from "../assets/pieceAsset";
import { useState } from "react";
import { getMoves, getMoveName } from "../engine/chess";

const unselectedTileArray = [
  [TileStatus.NONE, TileStatus.NONE, TileStatus.NONE, TileStatus.NONE, TileStatus.NONE, TileStatus.NONE, TileStatus.NONE, TileStatus.NONE],
  [TileStatus.NONE, TileStatus.NONE, TileStatus.NONE, TileStatus.NONE, TileStatus.NONE, TileStatus.NONE, TileStatus.NONE, TileStatus.NONE],
  [TileStatus.NONE, TileStatus.NONE, TileStatus.NONE, TileStatus.NONE, TileStatus.NONE, TileStatus.NONE, TileStatus.NONE, TileStatus.NONE],
  [TileStatus.NONE, TileStatus.NONE, TileStatus.NONE, TileStatus.NONE, TileStatus.NONE, TileStatus.NONE, TileStatus.NONE, TileStatus.NONE],
  [TileStatus.NONE, TileStatus.NONE, TileStatus.NONE, TileStatus.NONE, TileStatus.NONE, TileStatus.NONE, TileStatus.NONE, TileStatus.NONE],
  [TileStatus.NONE, TileStatus.NONE, TileStatus.NONE, TileStatus.NONE, TileStatus.NONE, TileStatus.NONE, TileStatus.NONE, TileStatus.NONE],
  [TileStatus.NONE, TileStatus.NONE, TileStatus.NONE, TileStatus.NONE, TileStatus.NONE, TileStatus.NONE, TileStatus.NONE, TileStatus.NONE],
  [TileStatus.NONE, TileStatus.NONE, TileStatus.NONE, TileStatus.NONE, TileStatus.NONE, TileStatus.NONE, TileStatus.NONE, TileStatus.NONE],
];

export default function Board({
  status,
  handleMove,
  board,
  side,
}: {
  status: MatchStatus;
  handleMove: (move: Move) => void;
  board: string[][];
  side: BoardSide;
}) {
  const [highlightedTiles, setHighlightedTiles] =
    useState<TileStatus[][]>(unselectedTileArray);
  const [selectedTile, setSelectedTile] = useState<number[] | null>(null);

  const customSetHighlightedTiles = () => {
    setHighlightedTiles(() => {
      const newhighlightedTiles: TileStatus[][] = JSON.parse(JSON.stringify(unselectedTileArray));
      return newhighlightedTiles;
    });
  }

  const renderCell = ({ row, col }) => {
    const cell = board[row][col];
    const selectedStatus = highlightedTiles[row][col];
    return (
      <>
        {cell !== "" && (
          <img
            draggable="false"
            src={pieceDict[cell]}
            className="w-full h-full absolute pointer-events-none"
          />
        )}
        {selectedStatus !== TileStatus.NONE && (
          <div
            className={`absolute w-full h-full outline pointer-events-none outline-offset-[-15px] outline-[7px] opacity-20 ${selectedStatus === TileStatus.SELECTED
              ? "outline-red-900"
              : selectedStatus === TileStatus.MOVE
                ? "outline-green-900"
                : "outline-blue-900"
              }`}
          ></div>
        )}
      </>
    );
  };

  const handleClick = (event: any) => {
    const row = parseInt(event.target.id.split("(")[1].split(",")[0]);
    const col = parseInt(event.target.id.split(",")[1].split(")")[0]);

    if (highlightedTiles[row][col] === TileStatus.NONE) {
      if (board[row][col][0] !== side[0]) {
        setSelectedTile(null);
        customSetHighlightedTiles();
      } else {
        const moves = getMoves(board, [row, col], side);
        moves.push({
          pos: [row, col],
          type: TileStatus.SELECTED,
        })

        setSelectedTile([row, col]);
        setHighlightedTiles(() => {
          const newhighlightedTiles: TileStatus[][] = JSON.parse(JSON.stringify(unselectedTileArray));
          moves.map((tile: { pos: number[]; type: TileStatus }) => {
            newhighlightedTiles[tile.pos[0]][tile.pos[1]] = tile.type;
          });
          return newhighlightedTiles;
        });
      }
    } else if (highlightedTiles[row][col] === TileStatus.SELECTED) {
      setSelectedTile(null);
      customSetHighlightedTiles();
    } else {
      const move = {
        side: side,
        name: getMoveName(selectedTile, [row, col], board, side),
        initialPosition: selectedTile,
        finalPosition: [row, col],
      } as Move;
      setSelectedTile(null);
      customSetHighlightedTiles();
      handleMove(move);
    }
  };
  console.log(status)

  return (
    <div className="w-full select-none">
      <div className="w-full h-full max-w-3xl aspect-square max-h-[48rem] mx-auto my-auto relative">
        <div className="grid grid-cols-8 gap-0 w-full absolute z-10">
          {board.map((row: string[], rowIndex: number) => {
            return row.map((cell: string, cellIndex: number) => {
              const row = side === BoardSide.WHITE ? rowIndex : 7 - rowIndex;
              const col = side === BoardSide.WHITE ? cellIndex : 7 - cellIndex;
              return (
                <div
                  id={`tile-(${row},${col})`}
                  key={row * 8 + col}
                  onClick={handleClick}
                  className={`${cell} flex justify-center items-center w-full aspect-square relative 
              ${(row + col) % 2 === 0 ? "bg-white" : "bg-gray-600"}`}
                >
                  {renderCell({ row, col })}
                  {/* {rowIndex === 7 && (
                  <div className="w-8 h-8 pointer-events-none absolute z-10">
                    {String.fromCharCode(97 + rowIndex)}
                    </div>
                )}
                {cellIndex === 0 && (
                  <div className="w-8 h-8 pointer-events-none absolute z-10">
                    {8 - col}
                  </div>
                )} */}
                </div>
              );
            });
          })}
        </div>
        <div className={`w-full h-full bg-black opacity-40 ${status !== MatchStatus.IN_PROGRESS ? "z-20" : "z-0"} absolute user-select-none flex justify-center items-center`}>
          <div className={`text-white w-48 text-center bg-red-600 opacity-100 ${status !== MatchStatus.IN_PROGRESS ? "z-30" : "z-0"} leading-10`}>Match Inactive</div>
        </div>
      </div>
    </div>
  );

  console.log({ status });
}
