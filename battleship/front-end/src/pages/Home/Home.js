import '../../assets/css/Home.css';
import React, { Component } from 'react';
import LogSignOrNot from './components/LogSignOrNot';
import CreateRoom from './components/CreateRoom';

class Home extends Component{
  render(){
    return (
      <div id='call' className='Home'>
        <header className='Home-header'>
          BATTLESHIP
        </header>
        <div id='call1' className='Homie'>
          <button className='button-basic'>Play</button>
        </div>
        <LogSignOrNot />
        <CreateRoom />
      </div>
    );
  }
}

export default Home;
