import { useState } from "react";
import Button from "react-bootstrap/esm/Button";

import { ActionList } from "../../../data/actionlist";

export default function Actions({ setAction }) {
    let actions = []

    Object.keys(ActionList).forEach((action) => {
        actions.push(<ButtonAction 
            onClick={ () => setAction(ActionList[action])}
            action={ ActionList[action] }
            key={ action.id }
        />)
    })

    return(
        <div>{ actions }</div>
    )
}

function ButtonAction({ onClick, action}) {
    const [disable, setDisable] = useState(false)
    
    return(
        <Button onClick={ onClick }>{ action.id }</Button>
    )
}