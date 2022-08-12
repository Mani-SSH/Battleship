import { io } from "socket.io-client";
const socket = io("http://localhost:5000");

export const getRoomID = () => {
    socket.emit('generate-roomID');
    socket.on('send-roomID', (arg1) => {
        console.log(arg1);
    })
}

