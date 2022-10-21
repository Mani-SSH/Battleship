import { useState, useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import "../../../assets/css/action.sass";

import { ActionList } from "../../../data/actionlist";

export default function Actions({ setAction, energyBar }) {
    let actions = [];
    Object.keys(ActionList).forEach((action) => {
        actions.push(<ButtonAction 
            onClick={ () => setAction(ActionList[action])}
            action={ ActionList[action] }
            key={ ActionList[action].id }
            energyBar = {energyBar}
        />)
    })

    return(
        <div className="actionBtnCnt">{ actions }</div>
    )
}

function ButtonAction({ onClick, action, energyBar }) {  
    const [disable, setDisable] = useState(false)
    
    useEffect(()=>{        
        if ( energyBar < action.charge)  // checking if the energy is enough
        {
            setDisable(true) // disable the button
        }
        else
        {
            setDisable(false) // enable the button
        }
        console.log(`EnergyBar: ${energyBar}`)
    }, [energyBar])
    return(
        <Button className="action" 
        variant="danger" 
        onClick = { onClick }
        disabled = { disable }>
        { action.id }</Button>
    )
}