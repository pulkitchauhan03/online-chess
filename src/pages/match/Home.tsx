import { useEffect } from "react"
import { createMatch } from "../../api";
import Board from "../../components/Board";
import { MatchStatus, Move } from "../../types/match";
import { useNavigate } from "react-router-dom";

export default function Home(props: {socket: any, matchId: string | null, matchStatus: MatchStatus, setMatchStatus: (matchStatus: MatchStatus) => void}) {
  const { socket, matchId, matchStatus, setMatchStatus } = props;
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("connect", () => {
      // console.log("Connected to server");
      if (matchId) {
        socket.emit("join", matchId);
      }
    });

    socket.on("user_joined", (data: any) => {
      console.log("User joined "), data.userId;
      setMatchStatus(MatchStatus.IN_PROGRESS);
    })

    socket.on("user_left", (data: any) => {
      console.log("User left"), data.userId;
      setMatchStatus(MatchStatus.NOT_STARTED);
    });

    socket.on("move", (data: any) => {
      console.log("Move", data);
    });
  }, [socket, matchId, setMatchStatus])

  const handleCreate = async () => {
    createMatch().then((response) => {
      if (response.status === 200) {
        // setMatchId(response.data.matchId);
        // setMatchStatus(MatchStatus.WAITING);
        // socket.emit("join", response.data.matchId);
        console.log(response.data)
        navigate(`/?id=${response.data.matchId}`)
      } else {
        console.log("Error creating match");
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  const handleMove = (move: Move) => {
    console.log(move);
  }

  return (
    <div>
      <button onClick={handleCreate}>Create a Match</button>
      <Board status={matchStatus} handleMove={handleMove}/>
    </div>
  )
}
