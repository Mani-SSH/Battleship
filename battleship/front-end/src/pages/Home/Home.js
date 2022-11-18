import "../../assets/css/Home.sass";
import Destroyer from "../../assets/images/Home/destroyer.png";
import wave1 from "../../assets/images/Home/wave1.png";
import wave2 from "../../assets/images/Home/wave2.png";
import wave3 from "../../assets/images/Home/wave3.png";
import wave4 from "../../assets/images/Home/wave4.png";
import submarine from "../../assets/images/Home/submarine.png";

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import LogInNSignUp from "./components/LogInNSignUp";
import UserInfo from "./components/UserInfo";
import CreateRoom from "./components/CreateRoom";
import Info from "./components/Info";
import ScoreBoard from "./components/ScoreBoard"
import Music from "./components/sound";
import Player from "../../player";
import Play from "./components/Play";
import * as io from "../../io-client-handler"

export const PlayerContext = React.createContext()
export const PlayerUpdateContext = React.createContext()
export const LoggedInContext = React.createContext()
export const LoggedInUpdateContext = React.createContext()

/**
 * @returns Home page
 */
export default function Home() {
  const [player, setPlayer] = useState(new Player());
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation()

  useEffect(() => {
    const onLoad = () => {
      try{
        /* if page loaded first time */
        // eslint-disable-next-line
        if (location.state == undefined) {
          return
        }

        /* if page was reloaded */
        if(location.state.socketID !== io.socket.id){
          console.log("Page reloaded")
          return
        }
        
        console.log(location.state.playerID)
        console.log(location.state.password)
        /* if not logged in */
        if(location.state.password.length === 0) {
          return
        }

        const username = location.state.playerID.slice(0, (location.state.playerID.length - 5));
        const tag = location.state.playerID.slice((location.state.playerID.length - 4), location.state.playerID.length )

        /* emit a request to server to log in with given credentials */
        io.socket.emit("request-login", username, tag, location.state.password, (err, user) => {
          /* if any error occured */
          if(err){
            throw Error("Some error occured: " + err)
          }

          /* if login is not successful, alert the user */
          // eslint-disable-next-line
          if(user == undefined){
            return
          }

          setPlayer({ ...user, password: location.state.password });
          setIsLoggedIn(true);
        })
      }catch(e){
        console.error(e)
      }
    }
    onLoad()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  
  return (
      <div className="Home">
          <div className="Header">
            <h1>BATTLESHIP</h1>
          </div>
          <PlayerContext.Provider value={ player }> 
          <PlayerUpdateContext.Provider value={ setPlayer }>
          <LoggedInContext.Provider value={ isLoggedIn }>
          <LoggedInUpdateContext.Provider value={ setIsLoggedIn }>
              <div id='log' className="topButton">
                { (isLoggedIn)? <UserInfo />: <LogInNSignUp /> }
              </div>

              <div className="playButton">
                  <Play />
              </div>
              <div className="iinfo"><Info /></div>
              <div className="auidoo"><Music /></div>
              <div className="crRoom"><CreateRoom /></div>
              <div className = "scoreBoard"><ScoreBoard/></div>
          </LoggedInUpdateContext.Provider>
          </LoggedInContext.Provider>
          </PlayerUpdateContext.Provider>
          </PlayerContext.Provider> 
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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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