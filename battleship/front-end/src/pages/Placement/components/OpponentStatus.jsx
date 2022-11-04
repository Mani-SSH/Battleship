import {AiFillCheckCircle} from "react-icons/ai";
import "../../../assets/css/board.sass";

export default function OpponentStatus({ opponentID, ready }){
    return(
        <div className="statusContainer">
            <h2>{ opponentID }: </h2>
            <h3>{ (ready)? <><AiFillCheckCircle className='check' /></> : <div className='spinner-border text-primary m-0.2' role="status"></div> }</h3>          
        </div>
    )
}