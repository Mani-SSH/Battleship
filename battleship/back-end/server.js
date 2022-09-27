/* connect socket io with express */
const express = require('express');
const { createServer } = require("http");
const { Server } = require("socket.io");

const { Room, RoomList } = require("./room");

const db = require('./mongoose-handler');

let rooms = new RoomList;

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

/* listen to event on a socket connection to server */
io.on('connection', (socket) => {
    console.log(`user connected with socket id: ${ socket.id }`);

    /* listen to login request */
    socket.on("request-login", (username, tag, password, fn) => {
        fn(db.logIn(username, tag, password));
    })

    /* listen to event on a socket to generate roomID */
    socket.on('generate-roomID', (fn) => {
        /* create new room */
        var thisRoom = new Room;
        console.log(`\nnew room: ${ thisRoom.elements.roomID } generated\n`);

        /* add room to the list */
        rooms.add(thisRoom);

        /* remove room if inactivite by checking every 5 min */
        const removeInactiveRoom = setInterval(() => {
            if(thisRoom.elements.player_count == 0){
                rooms.remove(thisRoom.elements.roomID);
                console.log(`Room removed due to inactivity: ${ thisRoom.elements.roomID }`);
                clearInterval(removeInactiveRoom);
            }
        }, 30000)

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

                        /* if room gets full emit a message to another user */
                        if(thisRoom.isFull()){
                            io.sockets.to(roomID).emit("lobby-full", thisRoom.elements.players[0], thisRoom.elements.players[1]);
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