/* connect socket io with express */
const express = require('express');
const { createServer } = require("http");
const { Server } = require("socket.io");

const room = require("./room");

let rooms = new room.LinkedList;

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
        var thisRoom = new room.Room;
        console.log(`new room: ${thisRoom.roomID} generated`);
        rooms.add(thisRoom);
        socket.emit('send-roomID', thisRoom.roomID);
        rooms.display();
    })
})

/* mongoDB connection */
const dbUrl = 'mongodb+srv://ReDei:hridaya12345@cluster0.g5srtyf.mongodb.net/test';
const mongoose = require('mongoose');

mongoose.connect(dbUrl, (err) => {
    console.log('mongodb connected', err);
})