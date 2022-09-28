import './Home.css';
import React, { Component } from 'react';
import LogSignOrNot from './components/LogSignOrNot';

class Home extends Component{
  render(){
    return (
      <div className="Home">
        <header className='Home-header'>
          BATTLESHIP
        </header>
        <button>Play</button>
        <button>Create room</button>
        <LogSignOrNot />
      </div>
    );
  }
}

export default Home;
