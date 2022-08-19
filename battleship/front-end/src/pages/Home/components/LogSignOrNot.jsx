import React, { Component } from 'react';

class LogSignOrNot extends Component{
    state = {
        isLoggedIn : false,
    }

    render(){
        return this.state.isLoggedIn?(<div><h3>Show username and rank points</h3></div>):this.renderButtons();
    }

    renderButtons(){
        return (
            <div id='log' className='sign'>
                <button className='logg' size='lg' bsPrefix='Home'>Log In</button>
                <button className='logg1' size='lg' bsPrefix='Home'>Sign Up</button>
          </div>
        )
    }
}

export default LogSignOrNot;