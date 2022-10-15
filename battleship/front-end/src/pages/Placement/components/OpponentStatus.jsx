export default function OpponentStatus({ opponentID, ready }){
    return(
        <div>
            <h2>{ opponentID }</h2>
            <h3>{ (ready)? "Ready" : <div className='spinner-border text-primary m-0.2' role="status"></div> }</h3>
        </div>
    )
}