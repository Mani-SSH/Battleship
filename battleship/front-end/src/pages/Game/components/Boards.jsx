import OpponentBoard from "./OpponentBoard"
import PlayerBoard from "./PlayerBoard"

export default function Boards({ turn }) {
    return (
        <>
            { (turn)? <OpponentBoard /> : <PlayerBoard /> }
        </>
    )
}
