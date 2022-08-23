import "../../assets/css/Home.sass";
import React, { useEffect, useState } from "react";
import LogSignOrNot from "./components/LogSignOrNot";
import CreateRoom from "./components/CreateRoom";
import Info from "./components/Info";
import Destroyer from "../../photos/destroyer.png";
import wave1 from "../../photos/wave1.png";
import wave2 from "../../photos/wave2.png";
import wave3 from "../../photos/wave3.png";
import wave4 from "../../photos/wave4.png";
import submarine from "../../photos/submarine.png";
import play from "../../photos/play.png";
import Music from "./components/sound";
/**
 *
 * @returns Home page
 */
export default function Home() {
  const [started, setStarted] = useState(true);
  const [destroyerStarted, setDestroyerStarted] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setStarted(!started);
    }, 5000);
  }, [started]);

  useEffect(() => {
    setStarted(!started);
    setDestroyerStarted(!destroyerStarted);
  }, []);
  
  return (
    <div className="Home">
      <div className="Header">
        <h1>BATTLESHIP</h1>
      </div>

      <div className="topButton">
        <LogSignOrNot />
      </div>

      <div className="playButton">
        <img src={play} alt="play" />
      </div>
      <div className="iinfo"><Info /></div>
      <div className="auidoo"><Music /></div>
      <div className="crRoom"><CreateRoom /></div>
      <div className="background">
        <div className="waves">
          <img src={wave1} alt="wave1" className="wave wave1" />
          <img src={wave2} alt="wave2" className="wave wave2" />
          <img src={wave3} alt="wave3" className="wave wave3" />
          <img src={wave4} alt="wave4" className="wave wave4" />
        </div>
        <div className={!started ? "submarine" : "submarine active"}>
          <img src={submarine} alt="" className="Destroyer" />
        </div>
        <div
          className={
            destroyerStarted ? "destroyer" : "destroyer destroyeractive"
          }
        >
          <img src={Destroyer} alt="" />
        </div>
      </div>
    </div>
  );
}