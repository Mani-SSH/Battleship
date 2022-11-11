import React, {useState, useMemo} from 'react'

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Table from 'react-bootstrap/Table';
import "../../../assets/css/scoreboard.sass";
import {GrScorecard} from "react-icons/gr";

import * as io from "../../../io-client-handler"

export default function ScoreBoard() {
    const [show, setShow] = useState(false)
    const [score, setScore] = useState([])
    
    /*on Clicking the button ScoreBoard:  */
    const handleShow = () => { 
        setShow (true)
        /* Socket to get the score from the front end is emitted here */
        io.socket.emit("generate-scoreboard", (err, Score) =>{
            if (err)
            {
                console.log("there is error in loading scoreboard", err)
            }
            else
            {
                setScore(Score)     // using hooks to store the array
            }
        })   

    }
    const handleClose = () => setShow (false)

    /**
     * scoreBoard stores the value of each row of data in descending order
     */
    const scoreBoard = useMemo(()=>{
        let scoreBoard = []
        for (let i = 0; i< score.length ; i++ )     
        {
            scoreBoard.push(
                <TallyBoard
                    show = {show}
                    score = {score[i]}
                    key = {i}
                />
            )
        }
        return scoreBoard
    },[score, show])        // dependencies as score and show

  return (
    <div className = "scoreBoardContainer">
         <Button className="scoreButton" size='lg' variant="success" onClick={handleShow}>
         Score Board
         </Button> 
         <div>
         <Modal className="scoreBoard-modal"
            show={show}
            size="md"
            onHide = {handleClose}
            centered
            >
                <Modal.Header className="scoreBoard-header" closeButton>
                    <Modal.Title className="scoreBoard-title">Score Board <GrScorecard className='scoreicon'/></Modal.Title>
                </Modal.Header>
                <Modal.Body className="scoreBoard-body">
                    {scoreBoard}
                </Modal.Body>
        </Modal>
    </div>
    </div>
  )
}

/*
    Each individual row of data is added in the table here.
*/
function TallyBoard({score}) 
{
    return(
            <Table striped bordered hover variant = "info">
                    <tbody>
                    <tr>
                        <td>{score.Username}</td>
                        <td>{score.Score}</td>
                    </tr>
                    </tbody>
            </Table>   
    )
}
