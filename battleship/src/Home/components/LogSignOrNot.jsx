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
            <div>
                <button>Log In</button>
                <button>Sign Up</button>
            </div>
        )
    }
}

export default LogSignOrNot;