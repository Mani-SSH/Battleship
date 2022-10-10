export default function OpponentStatus({ opponentID, ready }){
    return(
        <div>
            <h2>{ opponentID }</h2>
            <h3>{ (ready)? "Ready" : "" }</h3>
        </div>
    )
}