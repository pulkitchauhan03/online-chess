import { MatchStatus, Move, BoardSide } from "../types/match";
import { pieceDict } from "../assets/pieceAsset";

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
  console.log(status);
  const handleClick = (event: unknown) => {
    console.log(event);
    handleMove({ side: BoardSide.WHITE, finalPosition: "be3" } as Move);
  };

  const renderCell = (cell: string) => {
    if (cell === "--") return <></>;
    else {
      return (
        <div className="w-full h-full">
          <img src={pieceDict[cell]} className="w-full h-full" />
        </div>
      );
    }
  };
  

  return (
    <div>
      <div className="grid grid-cols-8 gap-0 aspect-square max-w-3xl">
        {board.reverse().map((row, rowIndex) => {
          return row.map((cell, cellIndex) => {
            return (
              <div
                key={cellIndex}
                className={`flex justify-center items-center w-full aspect-square 
                ${
                  (rowIndex + cellIndex) % 2 === 0 ? "bg-white" : "bg-gray-600"
                }`}
              >
                {renderCell(cell)}
              </div>
            );
          });
        })}
      </div>
      Board
      <button onClick={handleClick}>click me</button>
    </div>
  );
}
