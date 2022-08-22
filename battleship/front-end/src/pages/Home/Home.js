import '../../assets/css/Home.css';
import React from 'react';
import LogSignOrNot from './components/LogSignOrNot';
import CreateRoom from './components/CreateRoom';
import Info from './components/Info';
/**
 * 
 * @returns Home page
 */
export default function Home(){
  return (
    <section>

      <div id='call' className='Home'>

        <header className='Home-header'>

          <h1>BATTLESHIP</h1>

          <div className='topButton'>
          <LogSignOrNot />
          <Info />
          </div>

        </header>

          <div className='waves'>
          <div className='wave1'></div>
          <div className='wave2'></div>
          <div className='submarine'></div>
          <div className='destroyer'></div>
          <div className='wave3'></div>
          <div className='wave4'></div>
          </div>

          

        <div id='call1' className='Homie'>
          <button className='button-basic'>Play</button>
          <CreateRoom />
        </div>
        
      </div>
    </section>
  );
}
