const http = require('http');
const mysql = require('mysql');
const fs = require('fs');
const express = require('express');
const path = require('path');
const url = require('url');
const eventEmitter = require('events');

const server = express();
const port = process.env.PORT || 8080;
const events = new eventEmitter.EventEmitter();

//database storage variables
var planetID;

/*
var postHTML =
  '<html><head><title>Post Example</title></head>' +
  '<body>' +
  '<form method="post">' +
  'Input 1: <input name="input1"><br>' +
  'Input 2: <input name="input2"><br>' +
  '<input type="submit">' +
  '</form>' +
  '</body></html>';

http.createServer(function (req, res) {
  var body = "";
  req.on('data', function (chunk) {
    body += chunk;
  });
  req.on('end', function () {
    console.log('POSTed: ' + body);
    res.writeHead(200);
    res.end(postHTML + "<br>POSTed: " + body);
  });
}).listen(8080, () => {
    console.log('Node running on ' + port);
});
*/

//Establishing Connections
const w7f_fp = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'w7f_fp'
});

const w7f_map = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'w7f_map'
});

const w7f_player = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'w7f_player'
});

w7f_fp.connect((err) => {
    if(err){
        console.log('Error connecting to FP');
        return;
    }
    console.log('Connection w7f_fp');
});

w7f_map.connect((err) => {
    if(err){
        console.log('Error connecting to Map');
        return;
    }
    console.log('Connection w7f_map');
});

w7f_player.connect((err) => {
    if(err){
        console.log('Error connecting to Player');
        return;
    }
    console.log('Connection w7f_player');
});

//Using Connections
w7f_map.query('SELECT planid FROM planet', (err, planid) => {
    if (err) throw err;
    console.log('Data received');
    var str = "";
    for (id in planid) {
        str += id;
    }
});
 
  
// Terminating Connections
w7f_fp.end((err) => {});
w7f_map.end((err) => {});
w7f_player.end((err) => {});

//Handling Connections
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
}).get('/ServerBuilder.js/:systemID/:planetID*', (req, res) => {
    console.log(req.params);
    res.send('success');
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
