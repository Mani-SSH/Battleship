import { io } from "socket.io-client";
const socket = io("http://localhost:5000");

export function getRoomID(){
    var key = "";
    socket.emit('generate-roomID');
    socket.on('send-roomID', (arg1) => {
        console.log(arg1);
        key = arg1;
    })
    //error over here; does not return value in key
}

