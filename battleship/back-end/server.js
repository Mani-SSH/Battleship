/* connect socket io with express */
const express = require('express');
const { createServer } = require("http");
const { Server } = require("socket.io");

const room = require("./room");

let rooms = new room.RoomList;

/* port */
let PORT = process.env.PORT||5000;

/* using express */
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer,{
    cors: {
        origin: "*"
    }
});

httpServer.listen(PORT);

/* mongoDB connection */
const dbUrl = 'mongodb+srv://ReDei:hridaya12345@cluster0.g5srtyf.mongodb.net/test';
const mongoose = require('mongoose');

/* INCOMPLETE */
mongoose.connect(dbUrl, (err) => {
    console.log('mongodb connected', err);
})

/* listen to event on a socket connection to server */
io.on('connection', (socket) => {
    console.log(`user connected with socket id: ${ socket.id }`);

    /* listen to event on a socket to generate roomID */
    socket.on('generate-roomID', (fn) => {
        var thisRoom = new room.Room;
        console.log(`\nnew room: ${ thisRoom.elements.roomID } generated\n`);
        rooms.add(thisRoom);
        fn(thisRoom.elements.roomID);
    })

    /* INCOMPLETE */
    socket.on('join-room', (roomID, fn) => {
        let hasJoined = false;                  //state of player if joined
        let isFound = false;                    //state of room if found

        /* if room list is not empty */
        if(!rooms.isEmpty()){
            /* get room of the given roomID */
            let thisRoom = rooms.getRoom(roomID);

            /* check if room was found */
            if(thisRoom != undefined){
                /* set isFound true */
                isFound = true;

                /* check if room is full */
                if (thisRoom.isFull()){
                    /* player cannot join */
                    hasJoined = false;
                }else{
                    /* add user to room in room list */
                    if(thisRoom.addPlayer(socket.id)){
                        /* player can join */
                        hasJoined = true;

                        /* join room */
                        socket.join(roomID);

                        /* send message */
                        const msg = socket.id + " joined room: " + roomID;
                        console.log(msg);

                        if(thisRoom.isFull()){
                            socket.emit("lobby-full");
                        }
                    }
                }
            }
        }
        fn(isFound, hasJoined);
    })

    socket.on("leave-room", (roomID) => {
        let thisRoom = rooms.getRoom(roomID);
        thisRoom.removePlayer(socket.id);
        thisRoom.display();
    })
})