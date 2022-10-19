import {AiFillCheckCircle} from "react-icons/ai";

export default function OpponentStatus({ opponentID, ready }){
    return(
        <div>
            <h3>{ (ready)? <><AiFillCheckCircle className='check' /></> : <div className='spinner-border text-primary m-0.2' role="status"></div> }</h3>
            <h2>{ opponentID }</h2>
        </div>
    )
}