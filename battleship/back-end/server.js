/* connect socket io with express */
const express = require('express');
const { createServer } = require("http");
const { Server } = require("socket.io");

const { Room, RoomList } = require("./classes/room")
const { ActionList } = require("./data/actionlist")

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

    socket.on("request-signup",(username, tag, password, checkSameAccount) =>{

        db.signUp(username, tag, password, (error, SameAccount)=>{
            console.log(SameAccount);
            checkSameAccount(null, SameAccount);
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
    socket.on('join-room', (roomID, playerID, fn) => {
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

        // const id = (isLoggedIn)? playerID: socket.id;

        /* add user to room in room list */
        if(thisRoom.addPlayer(socket.id, playerID)){
            /* player can join */
            hasJoined = true;

            /* join room */
            socket.join(roomID);

            /* send message */
            const msg = playerID /* id */ + " joined room: " + roomID;
            console.log(msg);

            fn(isFound, hasJoined);
        }

        /* if room gets full emit a message to another user */
        if(thisRoom.isFull()){
            io.sockets.to(roomID).emit("lobby-full");            
        }
    })

    socket.on("get-opponentID", (roomID, giveID) => {
        const thisRoom = rooms.getRoom(roomID);

        let playerID1 = thisRoom.elements.players[0].playerID
        let playerID2 = thisRoom.elements.players[1].playerID

        /* if playing through socket id, assign them guest names */
        if(playerID1.length < 6){
            playerID1 = "Guest1";
        }

        if(playerID2.length < 6){
            playerID2 = "Guest2";
        }

        /* get id of opponent */
        let opponentID = "";
        let playerID = ""
        if(socket.id == thisRoom.elements.players[0].socketID){
            opponentID = playerID2;
            playerID = playerID1;
        }else{
            opponentID = playerID1;
            playerID = playerID2;
        }
        giveID(playerID, opponentID);
    })

    socket.on("player-ready", (roomID) => {
        /* get room */
        const thisRoom = rooms.getRoom(roomID);

        /* increase ready count */
        thisRoom.readyPlayer();
        thisRoom.display();

        /* emit to opponent that player is ready */
        socket.to(roomID).emit("oppponent-ready");
    })

    socket.on("send-ship-coordinates", (coordinates, roomID, callback) => {
        const thisRoom = rooms.getRoom(roomID)
        let isSuccessful = false

        console.log(thisRoom)

        try {
            /* if room not found */
            if (thisRoom == undefined){
                callback(isSuccessful)
                throw "Room Not Found!!!"
            }

            /* if error occurs in setting board */
            if(thisRoom.setBoard(socket.id, coordinates.submarine, coordinates.corvette, coordinates.frigate, coordinates.destroyer, coordinates.carrier) === false){
                callback(isSuccessful)
                throw "Player With Given SocketID Not Found!!!"
            }

            isSuccessful = true
            callback(isSuccessful)

            socket.to(roomID).emit("opponent-ships-set")
        } catch (error) {
            console.error(error)
        }
    })

    socket.on("player-action", (roomID, actionID, x, y, callback) => {
        /* get the room the player is in */
        const thisRoom = rooms.getRoom(roomID)

        /* get socket id of opponent */
        const opponentSocketID = thisRoom.getOpponentSocketID(socket.id)

        /* get board of the opponent */
        const thisBoard = thisRoom.getBoard(opponentSocketID)

        let hitCoords = []
        let missedCoords = []

        let isSuccessful = false

        switch(actionID){
            case ActionList.AERIAL_STRIKE.id:
                break
            case ActionList.CLUSTER_STRIKE.id:
                break
            case ActionList.MISSILE.id:
                ({ hitCoords, missedCoords } = thisBoard.doMissile(x, y))
                break
            case ActionList.RADAR.id:
                break
            default:
                callback(isSuccessful, hitCoords, missedCoords)
                retun
        }
        isSuccessful = true
        callback(isSuccessful, hitCoords, missedCoords)
    })

    socket.on("remove-players", (roomID) => {
        const thisRoom = rooms.getRoom(roomID)
        thisRoom.removePlayers()
        thisRoom.display()
    })

    socket.on("leave-room", (roomID) => {
        let thisRoom = rooms.getRoom(roomID);
        thisRoom.removePlayer(socket.id);
        thisRoom.display();
    })

    socket.on("disconnect", () => {
        /* check if user was on a room */

        /* emit to room player has forfeit */
    })
})
