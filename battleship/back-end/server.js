//connect socket io with express
const express = require('express');
const { createServer } = require("http");
const { Server } = require("socket.io");

let PORT = process.env.PORT||5000;

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer,{
    cors: {
        origin: "*"
    }
});

httpServer.listen(PORT);

io.on('connection', (socket) => {
    console.log('New user connected');
})

//mongoDB connection
const dbUrl = 'mongodb+srv://ReDei:hridaya12345@cluster0.g5srtyf.mongodb.net/test';
const mongoose = require('mongoose');

mongoose.connect(dbUrl, (err) => {
    console.log('mongodb connected', err);
})