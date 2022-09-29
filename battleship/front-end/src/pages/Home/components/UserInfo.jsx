import { useContext } from "react"
import { PlayerContext } from "../Home"

export default function UserInfo()
{
    const player = useContext(PlayerContext);
    return(
        <div>
        <h3>Name: { player.name }</h3>
        <br/>
        <h4>UID: { player.name.concat("#", player.tag) }</h4>
        <br/>
        <h3>Score: { player.score }</h3>
        </div>
    )
}