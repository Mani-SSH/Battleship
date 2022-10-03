import Button from 'react-bootstrap/Button'

import { useEffect, useState } from 'react';
import { useDrag } from 'react-dnd'

import S1 from "../../../assets/images/Home/sub.png"; 
import S2 from "../../../assets/images/Home/frigate.png"; 
import S3 from "../../../assets/images/Home/des.png"; 
import S4 from "../../../assets/images/Home/corvette.png"; 
import S5 from "../../../assets/images/Home/aircraft_carrier.png";

import "../../../assets/css/dragdrop.sass";

const ShipTypes = {
    SUBMARINE: "submarine",
    FRIGATE: "frigate",
    DESTROYER: "destroyer",
    CORVETTE: "corvette",
    CARRIER: "carrier"
}

const shipList = [
    {
        id:'ship1',
        name:"Submarine",
        thumb: S1
    },
    {
        id:'ship2',
        name:"Frigate",
        thumb: S2
    },
    {
        id:'ship3',
        name:"Destroyer",
        thumb: S3
    },
    {
        id:'ship4',
        name:"Corvette",
        thumb: S4
    },
    {
        id:'ship5',
        name:"Aircraft Carrier",
        thumb: S5
    },
    
]


export default function ShipList(){
    const [ shipType, setShipType ] = useState("")

    return(
        <>
            <div>
                <Button onClick={() => setShipType(ShipTypes.SUBMARINE) }>Submarine</Button>
                <Button onClick={() => setShipType(ShipTypes.FRIGATE) }>Frigate</Button>
                <Button onClick={() => setShipType(ShipTypes.DESTROYER) }>Destroyer</Button>
                <Button onClick={() => setShipType(ShipTypes.CORVETTE) }>Corvette</Button>
                <Button onClick={() => setShipType(ShipTypes.CARRIER) }>Carrier</Button>
            </div>
            <ShipDrag shipType={ shipType }/>
        </>
    )
}

function ShipDrag({ shipType }){
    const [ship, setShip] = useState();

    const [{isDragging}, drag] = useDrag(() => ({
        type: shipType,
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        })
    }))

    useEffect(() => {
        switch(shipType){
            case ShipTypes.SUBMARINE:
                setShip(<img src={ S1 } alt="submarine" />)
                break
            case ShipTypes.FRIGATE:
                setShip(<img src={ S2 } alt="frigate" />)
                break
            case ShipTypes.DESTROYER:
                setShip(<img src={ S3 } alt="destroyer" />)
                break
            case ShipTypes.CORVETTE:
                setShip(<img src={ S4 } alt="covertte" />)
                break
            case ShipTypes.CARRIER:
                setShip(<img src={ S5 } alt="carrier" />)
                break
            default:
                setShip(<></>)
                break
        }
    }, [shipType])

    return(
        <div
        ref={drag}
        style={{
            opacity: isDragging ? 0.5 : 1,
            fontSize: 25,
            fontWeight: 'bold',
            cursor: 'move',
        }}
        >
        { ship }
        </div>
    )
}