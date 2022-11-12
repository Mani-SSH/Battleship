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
                    { (hasWin)? <h1>You Win</h1> : <h1>You Lose</h1> }
                    { show && <>Returning back to home page in <br /> <Countdown counter={ 300 } onEnd={ handleCounterEnd } className="countDown" /></>}
                </div>
            </Modal.Body>
        </Modal>
    )
} 