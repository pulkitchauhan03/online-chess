import { useQuery } from "../hooks/useAuth"
import { useState, useEffect } from "react"
import Home from "../pages/match/Home";
import { MatchStatus } from "../types/match";

export default function VerifyMatch({socket}: {socket: any}) {
    const [ matchId, setMatchId ] = useState<string | null>(null);
    const [ matchStatus, setMatchStatus ] = useState<MatchStatus>(MatchStatus.NOT_STARTED);
    const query = useQuery();

    useEffect(() => {
        const id = query.get("id");
        if(id) {
            // Check if match exists and get match details
            console.log(id);
            setMatchId(id);
        }
    }, [query]);

    return (
        <Home socket={socket} matchId={matchId} setMatchId={setMatchId} matchStatus={matchStatus} setMatchStatus={setMatchStatus}></Home>
    )
}
