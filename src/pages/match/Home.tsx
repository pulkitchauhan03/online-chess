import { useEffect } from "react"

export default function Home(props: {socket: any}) {
  const { socket } = props;
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });
  }, [socket])

  return (
    <div>Home</div>
  )
}
