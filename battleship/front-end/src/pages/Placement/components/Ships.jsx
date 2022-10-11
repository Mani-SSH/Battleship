import "../../../assets/css/dragdrop.sass";

import Button from "react-bootstrap/Button"

import { ShipList } from '../../../data/shiplist';
import { CoordinatesContext } from "../Placement";

import { useContext, useEffect, useState } from "react";

export function Ships({ setShip }){
    let ships = []

    Object.keys(ShipList).forEach((ship) => {
        ships.push(<ButtonShip 
            onClick={ () => setShip(ShipList[ship]) }
            ship={ ShipList[ship] }
            key={ ship.id }
        />)
    })

    return(
        <div>
            { ships }
        </div>
    )
}

function ButtonShip({ onClick, ship }){
    const coordinates = useContext(CoordinatesContext)
    const [disable, setDisable] = useState(false)

    useEffect(() => {
        console.log(coordinates[ship.id].length)
        if(coordinates[ship.id].length !== 0){
            setDisable(true)
        }else{
            setDisable(false)
        }
    }, [coordinates[ship.id]]) // eslint-disable-line react-hooks/exhaustive-deps

    return(
        <Button 
        onClick={ onClick } 
        className='ship_button'
        disabled={ disable }
        >{ ship.id }</Button>
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