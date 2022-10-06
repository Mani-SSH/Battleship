import Button from 'react-bootstrap/Button'

import { useEffect, useState } from 'react';
import { useDrag } from 'react-dnd'

import "../../../assets/css/dragdrop.sass";

import { ShipList } from '../../../data/shiplist';


export default function Ships(){
    const [ ship, setShip ] = useState()

    return(
        <>
            <div>
                <Button onClick={() => setShip(ShipList.SUBMARINE) }>Submarine</Button>
                <Button onClick={() => setShip(ShipList.FRIGATE) }>Frigate</Button>
                <Button onClick={() => setShip(ShipList.DESTROYER) }>Destroyer</Button>
                <Button onClick={() => setShip(ShipList.CORVETTE) }>Corvette</Button>
                <Button onClick={() => setShip(ShipList.CARRIER) }>Carrier</Button>
            </div>
            <ShipDrag ship={ ship }/>
        </>
    )
}

function ShipDrag({ ship }){
    const [{isDragging}, drag] = useDrag(() => ({
        item: {
            ship
            // id: ship.id,
            // thumb,
            // length,
            // coordinates,
            // type
        },
        type: "ship",
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        option: { dropEff: "move" }
        })
    }))

    return(
        <div
        className="ships-img"
        ref={drag}
        style={{
            opacity: isDragging ? 0.5 : 1,
            fontSize: 25,
            fontWeight: 'bold',
            cursor: 'move',
        }}
        >
        <img src={ ship.thumb } alt={ ship.id } />
        </div>
    )
}

ShipDrag.defaultProps = {
    ship: ShipList.SUBMARINE
}

