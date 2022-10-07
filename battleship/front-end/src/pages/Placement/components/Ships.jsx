import "../../../assets/css/dragdrop.sass";

import Button from "react-bootstrap/Button"

import { ShipList } from '../../../data/shiplist';
import { useEffect, useState } from "react";


export function Ships({ setShip }){
    return(
        <div>
            <Button onClick={() => setShip(ShipList.SUBMARINE)}>Submarine</Button>
            <Button onClick={() => setShip(ShipList.FRIGATE)}>Frigate</Button>
            <Button onClick={() => setShip(ShipList.DESTROYER)}>Destroyer</Button>
            <Button onClick={() => setShip(ShipList.CORVETTE)}>Coverette</Button>
            <Button onClick={() => setShip(ShipList.CARRIER)}>Carrier</Button>
        </div>
    )
}

export function ShipPreview({ ship }) {
    // const [thumb, setThumb] = useState()

    // useEffect(() => {
    //     (ship)? setThumb(ship.thumb) : setThumb(null);
    // }, [ship])

    return(
        <>
            { (ship)? <img src={ ship.thumb } alt={ ship.id }/> : <></> }
            <Button>Rotate</Button>
            <Button>Place Ship</Button>
        </>
    )
}