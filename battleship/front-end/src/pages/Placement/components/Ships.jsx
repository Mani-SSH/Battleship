import Button from 'react-bootstrap/Button'

import { useEffect, useState } from 'react';
import { useDrag } from 'react-dnd'

import "../../../assets/css/dragdrop.sass";

import { ShipList } from '../../../data/shiplist';


export default function Ships(){
    const [ shipID, setShipID ] = useState()

    return(
        <>
            <div>
                <Button onClick={() => setShipID(ShipList.SUBMARINE.id) }>Submarine</Button>
                <Button onClick={() => setShipID(ShipList.FRIGATE.id) }>Frigate</Button>
                <Button onClick={() => setShipID(ShipList.DESTROYER.id) }>Destroyer</Button>
                <Button onClick={() => setShipID(ShipList.CORVETTE.id) }>Corvette</Button>
                <Button onClick={() => setShipID(ShipList.CARRIER.id) }>Carrier</Button>
            </div>
            <RenderShip shipID={ shipID } />
        </>
    )
}

function RenderShip({ shipID }){
    const [render, setRender] = useState(<></>)

    useEffect(() => {
        switch (shipID){
            case ShipList.SUBMARINE.id:
                setRender(<ShipDrag ship={ ShipList.SUBMARINE }/>)
                break
            case ShipList.FRIGATE.id:
                setRender(<ShipDrag ship={ ShipList.FRIGATE }/>)
                break
            case ShipList.DESTROYER.id:
                setRender(<ShipDrag ship={ ShipList.DESTROYER }/>)
                break
            case ShipList.CORVETTE.id:
                setRender(<ShipDrag ship={ ShipList.CORVETTE }/>)
                break
            case ShipList.CARRIER.id:
                setRender(<ShipDrag ship={ ShipList.CARRIER }/>)
                break
            default:
                setRender(<></>)
                console.log("nothing rendered")
                break
        }
        console.log(shipID)
    }, [shipID])
    return(
       <>{ render }</>
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
            isDragging: !!monitor.isDragging()
        }),
        end: (item) => console.log(item)
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