//var module = require('module_name');
var express = require('express');
var mongoose = require('mongoose');
var app = express();
var dbUrl = 'mongodb+srv://ReDei:hridaya12345@cluster0.g5srtyf.mongodb.net/test';
var http = require('http').Server(app);
var io = require('socket.io')(http);

mongoose.connect(dbUrl, (err) => {
    console.log('mongodb connected', err);
})