import React, {useState} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../assets/css/info.sass';
import {HiOutlineInformationCircle} from "react-icons/hi";
import {GrStatusInfo} from "react-icons/gr";
import bModal from "../../../assets/images/modal/boxModal.png";

export default function Info()
{
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
    <div className="infoBack">
            <GrStatusInfo className="button-info" size='sm' onClick={handleShow} />
        <Modal className="info-modal"
            show={show}
            onHide={handleClose}
            size="md"
            centered
            >
                <Modal.Body className="info-body">
                    <img src={bModal} alt="modal" className="boxmodal" />
                    <div className='modaltext'>
                    <Modal.Title className="info-title">App Information <HiOutlineInformationCircle className="info-icon"/></Modal.Title >
                    <p>Battleship is a war-themed board game for two players in which the opponents 
                    try to guess the location of their opponent's warships and sink them.</p>
                    <ul > <h5>Developers</h5>
                    <li>Bigyan</li>
                    <li>Hridaya</li>
                    <li>Manish</li>
                    <li>Shashanka</li>
                    </ul> 
                    <ul> <h5>SuperVisor</h5>
                    <li>Amrit Dahal</li>
                    </ul>
                    <Button className="info-btn" onClick={handleClose}>Close</Button>
                    </div>
                    </Modal.Body>
        </Modal>
    </div>
    );
}