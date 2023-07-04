import { useEffect, useState } from "react"
import { createMatch } from "../../api";

export default function Home(props: {socket: any}) {
  const { socket } = props;
  const [ matchId, setMatchId ] = useState<string | null>(null);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });
  }, [socket])

  const handleCreate = async () => {
    createMatch().then((response) => {
      if (response.status === 200) {
        setMatchId(response.data.matchId);
        // socket.emit("join", response.data.matchId);
      } else {
        console.log("Error creating match");
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  return (
    <div>
      <button onClick={handleCreate}>Create a Match</button>
    </div>
  )
}
