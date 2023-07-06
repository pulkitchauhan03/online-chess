import { useEffect, useState } from "react";
import { createMatch } from "../../api";
import Board from "../../components/Board";
import { MatchStatus, Move, BoardSide } from "../../types/match";
import { useNavigate } from "react-router-dom";
import { joinMatch } from "../../api";
import { defaultBoard } from "../../defaults/board";

export default function Home(props: {
  socket: any;
  matchId: string | null;
  matchStatus: MatchStatus;
  setMatchStatus: (matchStatus: MatchStatus) => void;
}) {
  const { socket, matchId, matchStatus, setMatchStatus } = props;
  const [board /*, setBoard*/] = useState<string[][]>(defaultBoard);
  const [side /*, setSide*/] = useState<BoardSide>(BoardSide.WHITE);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("connect", async () => {
      // console.log("Connected to server");
      if (matchId) {
        try {
          const response = await joinMatch(matchId);
          if (response.status === 200) {
            setMatchStatus(response.data.matchStatus);
            socket.emit("join", matchId);
          } else {
            throw new Error(response.data.message);
          }
        } catch (error) {
          console.error(error);
        }
      }
    });

    socket.on("user_joined", (data: any) => {
      console.log("User joined "), data.userId;
      setMatchStatus(MatchStatus.IN_PROGRESS);
    });

    socket.on("user_left", (data: any) => {
      console.log("User left"), data.userId;
      setMatchStatus(MatchStatus.NOT_STARTED);
    });

    socket.on("move", (data: any) => {
      console.log("Move", data);
    });
  }, [socket, matchId, setMatchStatus]);

  const handleCreate = async () => {
    createMatch()
      .then((response) => {
        if (response.status === 200) {
          // setMatchId(response.data.matchId);
          // setMatchStatus(MatchStatus.WAITING);
          // socket.emit("join", response.data.matchId);
          console.log(response.data);
          navigate(`/?id=${response.data.matchId}`);
        } else {
          console.log("Error creating match");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleMove = (move: Move) => {
    socket.emit("move", { move, matchId });
  };

  return (
    <div>
      <div className="flex flex-col h-screen xl:flex-row w-full">
        <div className="xl:flex-row w-full flex align-center">
          <Board
            board={board}
            side={side}
            status={matchStatus}
            handleMove={handleMove}
          />
        </div>
        <div className="w-full xl:w-1/2 min-w-[160px] bg-red-400">Board</div>
      </div>
    </div>
  );
}
