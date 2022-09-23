import "../../assets/css/Home.sass";
import React, { useEffect, useState } from "react";
import LogInNSignUp from "./components/LogInNSignUp";
import UserInfo from "./components/UserInfo";
import CreateRoom from "./components/CreateRoom";
import Info from "./components/Info";
import Destroyer from "../../assets/images/Home/destroyer.png";
import wave1 from "../../assets/images/Home/wave1.png";
import wave2 from "../../assets/images/Home/wave2.png";
import wave3 from "../../assets/images/Home/wave3.png";
import wave4 from "../../assets/images/Home/wave4.png";
import submarine from "../../assets/images/Home/submarine.png";
import play from "../../assets/images/Home/play.png";
import Music from "./components/sound";
import Player from "../../player";
import * as io from "../../io-client-handler"
/**
 *
 * @returns Home page
 */
export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [player, setPlayer] = useState(new Player);

  const handleLogIn = () => setIsLoggedIn(true);

  useEffect(() => {
     /* get player info */
     io.socket.emit("get-player", (player) => {
      setPlayer(player);
      console.log(player);
    });
  }, [])

  
  
  return (
    <div className="Home">
      <div className="Header">
        <h1>BATTLESHIP</h1>
      </div>

      <div className="topButton">
      <div id='log' className='sign'>
        { (isLoggedIn)? <UserInfo />: <LogInNSignUp onLogIn={ handleLogIn } /> }
      </div>
      </div>

      <div className="playButton">
        <img src={play} alt="play" />
      </div>
      <div className="iinfo"><Info /></div>
      <div className="auidoo"><Music /></div>
      <div className="crRoom"><CreateRoom /></div>
      <div className="background">
        <Waves />
        <Ships />
      </div>
    </div>
  );
}


function Waves(){
  return(
    <div className="waves">
      <img src={wave1} alt="wave1" className="wave wave1" />
      <img src={wave2} alt="wave2" className="wave wave2" />
      <img src={wave3} alt="wave3" className="wave wave3" />
      <img src={wave4} alt="wave4" className="wave wave4" />
    </div>
  )
}


function Ships(){
  const [started, setStarted] = useState(true);
  const [destroyerStarted, setDestroyerStarted] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setStarted(!started);
    }, 5000);
  }, [started]);

  useEffect(() => {
    /* start animation */
    setStarted(!started);
    setDestroyerStarted(!destroyerStarted);
  }, []);

  return(
    <>
      <div className={!started ? "submarine" : "submarine active"}>
        <img src={submarine} alt="" className="Destroyer" />
      </div>
      <div className={
          destroyerStarted ? "destroyer" : "destroyer destroyeractive"
        }
      >
        <img src={Destroyer} alt="" />
      </div>
    </>
  )
}