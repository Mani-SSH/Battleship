import Modal from "react-bootstrap/Modal"
import { useNavigate } from "react-router-dom"
import Countdown from "../../../features/Countdown"
import "../../../assets/css/winLose.sass";
import modalBg from "../../../assets/images/modal/modalBg.png";

export default function WinLoseModal({ show, onHide, hasWin }) {
    const navigate = useNavigate()

    const handleCounterEnd = () => {
        /* navigate back to home page */
        navigate("/")
    }

    return(
        <Modal
        className="modalCtn"
        show={ show }
        onHide={ onHide }
        centered
        >
            <Modal.Body className="win_lose">
                <img src={modalBg} alt="modal" className="modalBg" />
                <div className="modalText">
                    <span className="result">{ (hasWin)? <h1>YOU WIN</h1> : <h1>YOU LOSE</h1> }</span>
                    { show && <>Returning back to home page in <br /> <span className="countDown"><Countdown counter={ 4 } onEnd={ handleCounterEnd } /></span></>}
                </div>
            </Modal.Body>
        </Modal>
    )
} 