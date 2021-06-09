const http = require('http');
const fs = require('fs');
const express = require('express');
const path = require('path');

const server = express();
const port = 8080;

server.use('/visuals', express.static(__dirname + '/visuals'));
server.use('/scripts/public', express.static(__dirname + '/scripts/public'));

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

server.get('/PlanetTemplateCustom.html', (req, res) => {
    res.sendFile(__dirname + '/PlanetTemplateCustom.html');
})

server.listen(port, () => {
    console.log('Node running on ' + port);
})
