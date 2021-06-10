const http = require('http');
const fs = require('fs');
const express = require('express');
const path = require('path');

const server = express();
const port = process.env.PORT || 8080;

server.use('/visuals', express.static(__dirname + '/visuals'));
server.use('/scripts', express.static(__dirname + '/scripts'));

server.get('/', (req, res) => {
    res.sendFile(__dirname + '/HomePage.html');
})

server.get('/HomePage.html', (req, res) => {
    res.sendFile(__dirname + '/HomePage.html');
})

server.get('/Lungor.html', (req, res) => {
    res.sendFile(__dirname + '/Lungor.html');
})

server.get('/Login.html', (req, res) => {
    res.sendFile(__dirname + '/Login.html');
})

server.get('/PlanetTemplate.html', (req, res) => {
    res.sendFile(__dirname + '/PlanetTemplate.html');
})

server.listen(port, () => {
    console.log('Node running on ' + port);
})
