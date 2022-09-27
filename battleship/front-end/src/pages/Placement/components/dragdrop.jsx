import React, {useState} from "react";
import "../../../assets/css/dragdrop.sass";
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import S1 from "../../../assets/images/Home/sub.png"; 
import S2 from "../../../assets/images/Home/frigate.png"; 
import S3 from "../../../assets/images/Home/des.png"; 
import S4 from "../../../assets/images/Home/corvette.png"; 
import S5 from "../../../assets/images/Home/aircraft_carrier.png";

const shipplacement = [
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

export default function Dragdrop()
{
    const [Move,updateMove] = useState(shipplacement);
    function handleOnDragEnd(result)
    {
        const items = Array.from(Move);
        const [reorderedItems] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItems);
        updateMove(items);
    }
    return(
        <div className="ddrop">
         <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="characters">
                {(provided) => (
            <ul className="diffships" {...provided.droppableProps} ref={provided.innerRef}>
              {Move.map(({id,name,thumb},index)=> {
                return(
                    <Draggable key={id} draggableId={id} index={index}>
                    {(provided) =>( 
                    <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                        <div className="ships-img">
                            <img src={thumb} alt={`${name} Thumb`}/>
                            <p>
                            {name}
                            </p>
                        </div>
                    </li>
                    )}
                    </Draggable>
                ); 
              })} 
              {provided.placeholder}
            </ul>
                )}
            </Droppable>
         </DragDropContext>
        </div>
    );
}
