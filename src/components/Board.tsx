import { MatchStatus, Move, BoardSide } from "../types/match";

export default function Board({ status, handleMove }: { status: MatchStatus, handleMove: (move: Move) => void }) {
  console.log(status);
  const handleClick = (event: unknown) => {
    console.log(event);
    handleMove({ side: BoardSide.WHITE, finalPosition: "be3" } as Move);
  }
  return (
    <div>Board
      <button onClick={handleClick}>click me</button>
    </div>
  )
}
