import "../../../assets/css/dragdrop.sass";

import Button from "react-bootstrap/Button"

import { ShipList } from '../../../data/shiplist';


export function Ships({ setShip }){
    return(
        <div>
            <Button onClick={() => setShip(ShipList.SUBMARINE)} className='ship_button'>Submarine</Button>
            <Button onClick={() => setShip(ShipList.FRIGATE)} className='ship_button'>Frigate</Button>
            <Button onClick={() => setShip(ShipList.DESTROYER)} className='ship_button'>Destroyer</Button>
            <Button onClick={() => setShip(ShipList.CORVETTE)} className='ship_button'>Coverette</Button>
            <Button onClick={() => setShip(ShipList.CARRIER)} className='ship_button'>Carrier</Button>
        </div>
    )
}

export function ShipPreview({ ship }) {
    return(
        <>
            <div className='preview'>
                <div>{ (ship)? <img src={ ship.thumb } alt={ ship.id }/> : <></> }</div>
            </div>
        </>
    )
}