import Modal from "react-bootstrap/Modal"
import { useNavigate } from "react-router-dom"
import Countdown from "../../../features/Countdown"

export default function WinLoseModal({ show, onHide, hasWin }) {
    const navigate = useNavigate()

    const handleCounterEnd = () => {
        /* navigate back to home page */
        navigate("/")
    }

    return(
        <Modal
        show={ show }
        onHide={ onHide }
        size="sm"
        centered
        >
            <Modal.Body>
                { (hasWin)? <h1>You Win</h1> : <h1>You Lose</h1> }
                { show && <>Returning back to home page in <Countdown counter={ 3 } onEnd={ handleCounterEnd }/>...</>}
            </Modal.Body>
        </Modal>
    )
} 