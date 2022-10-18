import "../../../assets/css/ships.sass";
import "../../../assets/css/board.sass";

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
            key={ ShipList[ship].id }
        />)
    })

    return(
        <div className='shipButtons'>
            { ships }
        </div>
    )
}

function ButtonShip({ onClick, ship }){
    const coordinates = useContext(CoordinatesContext)
    const [disable, setDisable] = useState(false)

    useEffect(() => {
        if(coordinates[ship.id].length !== 0){
            setDisable(true)
        }else{
            setDisable(false)
        }
    }, [coordinates[ship.id]]) // eslint-disable-line react-hooks/exhaustive-deps

    return(
        <Button 
        onClick={ onClick } 
        className='shipButton'
        disabled={ disable }
        >{ ship.id.toUpperCase() }</Button>
    )
}

export function ShipPreview({ship ,previewClass}) {
    return(
        <>
            <div className='preview'>
                <div>{ (ship)? <img src={ ship.thumb } alt={ ship.id } className={`${previewClass} ${ship.id}`} /> : <></> }</div>
            </div>
        </>
    )
}