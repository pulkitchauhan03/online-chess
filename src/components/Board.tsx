import { MatchStatus, Move, BoardSide } from "../types/match";
import { pieceDict } from "../assets/pieceAsset";
import { renderToStaticMarkup } from "react-dom/server";
import { useState, useEffect } from "react";
import { getMoves, getMoveName } from "../engine/chess";
import { defaultBoard } from "../defaults/board";

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
  const [selectedTile, setSelectedTile] = useState<number[] | null>(null);
  const [highlightedTiles, setHighlightedTiles] = useState<
    { pos: number[]; type: string }[]
  >([]);

  useEffect(() => {
    if (highlightedTiles.length > 0) {
      highlightedTiles.map((tile: { pos: number[]; type: string }) => {
        const element = document.getElementById(
          `tile-(${tile.pos[0]},${tile.pos[1]})`
        );
        if (element !== null)
          element.innerHTML += renderToStaticMarkup(
            <div
              id={`tile-(${tile.pos[0]},${tile.pos[1]})`}
              className={`absolute w-full h-full outline outline-offset-[-15px] outline-[7px] opacity-20 `}
            ></div>
          );
      });
    }
  }, [highlightedTiles]);

  useEffect(() => {
    if (selectedTile !== null) {
      const element = document.getElementById(
        `tile-(${selectedTile[0]},${selectedTile[1]})`
      );
      if (element !== null)
        element.innerHTML += renderToStaticMarkup(
          <div
            id={`tile-(${selectedTile[0]},${selectedTile[1]})`}
            className={`absolute w-full h-full outline outline-offset-[-15px] outline-[7px] outline-red-900 opacity-20 `}
          ></div>
        );
    }
  }, [selectedTile]);

  const getTileStatus = (row: number, col: number) => {
    const tile = highlightedTiles.find(
      (tile: { pos: number[]; type: string }) =>
        tile.pos[0] === row && tile.pos[1] === col
    );
    if (tile === undefined) {
      if (
        selectedTile !== null &&
        selectedTile[0] === row &&
        selectedTile[1] === col
      )
        return "selected";
      else return "";
    } else return tile.type;
  };

  const customSetHighlightedTiles = (moves: any) => {
    setHighlightedTiles((value) => {
      if (value.length > 0) {
        value.map((tile: { pos: number[]; type: string }) => {
          const element = document.getElementById(
            `tile-(${tile.pos[0]},${tile.pos[1]})`
          );
          if (element !== null)
            element.innerHTML = renderToStaticMarkup(
              renderCell(tile.pos[0], tile.pos[1])
            );
        });
      }
      return moves;
    });
  };

  const customSetSelectedTile = (tile: number[] | null) => {
    setSelectedTile((value) => {
      if (value !== null) {
        const element = document.getElementById(
          `tile-(${value[0]},${value[1]})`
        );
        if (element !== null)
          element.innerHTML = renderToStaticMarkup(
            renderCell(value[0], value[1])
          );
      }
      return tile;
    });
  };

  const handleClick = (event: any) => {
    const row = parseInt(event.target.id.split("(")[1].split(",")[0]);
    const col = parseInt(event.target.id.split(",")[1].split(")")[0]);

    const tileStatus = getTileStatus(row, col);

    if (tileStatus === "") {
      if (board[row][col][0] !== side[0]) {
        customSetSelectedTile(null);
        customSetHighlightedTiles([]);
      } else {
        customSetSelectedTile([row, col]);
        const moves = getMoves(board, [row, col], side);
        customSetHighlightedTiles(moves);
      }
    } else if (tileStatus === "selected") {
      customSetSelectedTile(null);
      customSetHighlightedTiles([]);
    } else {
      const move = {
        side: side,
        finalPosition: getMoveName(selectedTile, [row, col], board, side),
      } as Move;
      console.log({ move });
      customSetSelectedTile(null);
      customSetHighlightedTiles([]);
      handleMove(move);
    }
  };

  const renderCell = (row: number, col: number) => {
    const cell = board[row][col];
    if (cell === "") {
      return <></>;
    } else {
      return (
        <img
          draggable="false"
          id={`tile-(${row},${col})`}
          src={pieceDict[cell]}
          className="w-full h-full absolute"
        />
      );
    }
  };

  return (
    <div className="w-full flex justify-center items-center select-none">
      <div className="grid grid-cols-8 gap-0 aspect-square max-h-[48rem] max-w-3xl w-full">
        {defaultBoard.map((row: string[], rowIndex: number) => {
          return row.map((cell: string, cellIndex: number) => {
            const row = side === BoardSide.WHITE ? rowIndex : 7 - rowIndex;
            const col = side === BoardSide.WHITE ? cellIndex : 7 - cellIndex;
            return (
              <div
                id={`tile-(${row},${col})`}
                onClick={handleClick}
                key={col}
                className={`${cell} flex justify-center items-center w-full aspect-square relative 
              ${(row + col) % 2 === 0 ? "bg-white" : "bg-gray-600"}`}
              >
                {renderCell(row, col)}
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
    </div>
  );

  console.log({ status });
}
