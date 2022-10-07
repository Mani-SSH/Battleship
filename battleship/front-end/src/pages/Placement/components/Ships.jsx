import { useDrag } from 'react-dnd'

import "../../../assets/css/dragdrop.sass";

import { ShipList } from '../../../data/shiplist';


export default function Ships(){
    return(
        <>
            <ShipDrag ship={ ShipList.SUBMARINE }/>
            <ShipDrag ship={ ShipList.FRIGATE }/>
            <ShipDrag ship={ ShipList.DESTROYER }/>
            <ShipDrag ship={ ShipList.CORVETTE }/>
            <ShipDrag ship={ ShipList.CARRIER }/>
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
        type: ship.type,
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