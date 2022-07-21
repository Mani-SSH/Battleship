class LogSignOrNot extends React.Component{
    state = {
        isLoggedIn : false
    }

    render(){
        return isLoggedIn? (<div><h3>Show username and rank points</h3></div>):this.renderButtons;
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