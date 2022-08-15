/* length of roomID */
const LENGTH_ROOMID = 6;

/* connect socket io with express */
const express = require('express');
const { createServer } = require("http");
const { Server } = require("socket.io");

/* port  */
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
    console.log(`user connected with socket id: ${socket.id}`);

    /* listen to event on a socket to generate roomID */
    socket.on('generate-roomID', () => {
        let roomID = makeRoomID();
        console.log(`new room: ${roomID} generated`);
        socket.emit('send-roomID', roomID);
    })
})

/* mongoDB connection */
const dbUrl = 'mongodb+srv://ReDei:hridaya12345@cluster0.g5srtyf.mongodb.net/test';
const mongoose = require('mongoose');

mongoose.connect(dbUrl, (err) => {
    console.log('mongodb connected', err);
})

/**
 * 
 * @returns 6 charactered roomID
 */
function makeRoomID() {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < LENGTH_ROOMID; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * 
        charactersLength));
   }
   return result;
}