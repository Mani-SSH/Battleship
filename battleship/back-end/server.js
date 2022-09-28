/* connect socket io with express */
const express = require('express');
const { createServer } = require("http");
const { Server } = require("socket.io");

const { Room, RoomList } = require("./classes/room");

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
    socket.on("request-login", (username, tag, password, giveUserDetails) => {
        db.logIn(username, tag, password, (error, user) => {
            /* if any error occurs or if password is wrong i.e. user is undefined */
            if(error){
                giveUserDetails(error);
                return;
            }
            
            /* return user through callback */
            giveUserDetails(null, user);
        });
    })

    /* listen to event on a socket to generate roomID */
    socket.on('generate-roomID', (giveRoomID) => {
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
        }, 300000)

        giveRoomID(thisRoom.elements.roomID);
    })

    /* INCOMPLETE */
    socket.on('join-room', (roomID, isLoggedIn, playerID, fn) => {
        let hasJoined = false;                  //state of player if joined
        let isFound = false;                    //state of room if found

        /* if room list is empty */
        if(rooms.isEmpty()){
            fn(isFound, hasJoined)
            return;
        }

        /* get room of the given roomID */
        let thisRoom = rooms.getRoom(roomID);

        /* if room is not found */
        if(thisRoom == undefined){
            fn(isFound, hasJoined);
            return;
        }

        isFound = true;

        /* if room is full */
        if (thisRoom.isFull()){
            fn(isFound, hasJoined);
            return;
        }

        const id = (isLoggedIn)? playerID: socket.id;

        /* add user to room in room list */
        if(thisRoom.addPlayer(id)){
            /* player can join */
            hasJoined = true;

            /* join room */
            socket.join(roomID);

            /* send message */
            const msg = id + " joined room: " + roomID;
            console.log(msg);

            fn(isFound, hasJoined);
        }

        /* if room gets full emit a message to another user */
        if(thisRoom.isFull()){
            io.sockets.to(roomID).emit("lobby-full");            
        }
    })

    socket.on("get-opponentID", (roomID, playerID, giveID) => {
        const thisRoom = rooms.getRoom(roomID);

        let playerID1 = thisRoom.elements.players[0];
        let playerID2 = thisRoom.elements.players[1];

        /* if playing through socket id, assign them guest names */
        if(playerID1.length == 20){
            playerID1 = "Guest1";
        }

        if(playerID2.length == 20){
            playerID2 = "Guest2";
        }

        /* get id of opponent */
        let opponentID = "";
        if(playerID == thisRoom.elements.players[0]){
            opponentID = playerID2;
            playerID = playerID1;
        }else{
            opponentID = playerID1;
            playerID = playerID2;
        }
        giveID(playerID, opponentID);
    })

    socket.on("player-ready", (roomID) => {
        const thisRoom = rooms.getRoom(roomID);
        thisRoom.readyPlayer();

        socket.to(roomID).emit("oppponent-ready");
    })

    socket.on("leave-room", (roomID) => {
        let thisRoom = rooms.getRoom(roomID);
        thisRoom.removePlayer(socket.id);
        thisRoom.display();
    })
})