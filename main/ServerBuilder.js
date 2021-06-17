const http = require('http');
const mysql = require('mysql');
const fs = require('fs');
const express = require('express');
const path = require('path');
const url = require('url');
const eventEmitter = require('events');
//const xml = require('xml');
const XMLWriter = require('xml-writer');

const server = express();
const port = process.env.PORT || 8080;
const events = new eventEmitter.EventEmitter();

//database storage variables
var planets;
var loginDB;
var loginInput;

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
//planet table import
w7f_map.query('SELECT * FROM planet', (err, res) => {
    if (err) throw err;
    console.log('planets received');
    var result = [];
    for (item of res) {
        result.push(item);
    }
    planets = result;
    //console.log(planets);
});

//username import
w7f_player.query('SELECT username, pw FROM login', (err, res) => {
    if (err) throw err;
    console.log('login info received');
    var result = [];
    for (item in res) {
        result.push(item);
    }
    loginDB = result;
    console.log(loginDB);
});

//tile call
function tilesByPlanet(planid, callback) {
    w7f_map.query('SELECT p.name, t.* FROM planet AS p, tiles AS t WHERE t.planid = p.planid AND p.planid = '+planid, (err, res) => {
        if (err) throw err;
        console.log('tiles for planet '+planid+' received');
        return callback(err, res);
    });
}


//Handling Server
server.use('/visuals', express.static(__dirname + '/visuals'));
server.use('/scripts', express.static(__dirname + '/scripts'));

server.get('/', (req, res) => {
    res.sendFile(__dirname + '/HomePage.html');
});

server.get('/HomePage.html', (req, res) => {
    res.sendFile(__dirname + '/HomePage.html');
});

server.get('/Lungor.html', (req, res) => {
    res.sendFile(__dirname + '/Lungor.html');
});

server.get('/Login.html', (req, res) => {
    res.sendFile(__dirname + '/Login.html');
}).get('/ServerBuilder.js/login/:username/:password*', (req, res) => {
    console.log(req.params);
    console.log(req.url);
    res.send('Response Recieved: ' + req.params.username + " + " + req.params.password);
});

server.get('/PlanetTemplate.html', (req, res) => {
    res.sendFile(__dirname + '/PlanetTemplate.html');
}).get('/ServerBuilder.js/planet/:system/:planet*', (req, res) => {
    var xw = new XMLWriter;
    tilesByPlanet(req.params.planet, function (err, tiles) {
        if (err) throw err;
        console.log(req.params);
        console.log(req.url);
        console.log('Tile count: '+tiles.length+' on planet '+tiles[0].name);
        
        xw.startDocument();
        for (item of tiles) {
            xw.startElement('tile'+item.tileid);
            for (prop in item) {
                //console.log(prop + ": " + item[prop]);
                xw.writeAttribute(prop, item[prop].toString());
            }
            xw.endElement();
        }
        xw.endDocument();
        console.log(xw.output);
        
        var counter = 0;
        var returnString = xw.output;
        while (returnString.indexOf('null') != -1) {
            var index = returnString.indexOf('null');
            console.log(index);
            returnString = returnString.substring(0, index) + returnString.substring(index);
            counter++;
        }
        console.log(counter);
        res.send(xw.output);
    });
});

server.listen(port, () => {
    console.log('Node running on ' + port);
});
