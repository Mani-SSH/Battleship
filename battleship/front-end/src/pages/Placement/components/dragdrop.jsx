import React, {useState} from "react";
import "../../../assets/css/dragdrop.sass";
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import S1 from "../../../assets/images/Home/ship1.png"; 
import S2 from "../../../assets/images/Home/ship 2.png"; 
import S3 from "../../../assets/images/Home/ship 3.png"; 
import S4 from "../../../assets/images/Home/ship 4.png"; 

const shipplacement = [
    {
        id:'ship1',
        thumb: S1
    },
    {
        id:'ship2',
        thumb: S2
    },
    {
        id:'ship3',
        thumb: S3
    },
    {
        id:'ship4',
        thumb: S4
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
              {Move.map(({id,thumb},index)=> {
                return(
                    <Draggable key={id} draggableId={id} index={index}>
                    {(provided) =>( 
                    <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                        <div className="ships-img">
                            <img src={thumb} alt="thumb"/>
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
