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
function planetImport(sysid, callback) {
    console.log(sysid);
    w7f_map.query('SELECT p.*, s.name AS sysName FROM planet AS p, systems AS s WHERE p.sysid = s.sysid AND p.sysid = '+sysid, (err, res) => {
        if (err) throw err;
        console.log('planets for system'+sysid+' received');
        console.log(res);
        return callback(err, res);
    });
}

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
    console.log(planid);
    w7f_map.query('SELECT t.*, f.name AS facName, b.name AS buildName, b.*, p.name ' +
    'FROM planet AS p, tiles AS t, faction AS f, buildings AS b ' + 
    'WHERE b.build_id = (t.build_1 OR t.build_2 OR t.build_3) AND f.facid = t.facid AND t.planid = p.planid AND p.planid = '+planid, (err, res) => {
        if (err) throw err;
        console.log('tiles for planet '+planid+' received');
        if (res[0] != null) {
            console.log('Planet Info Sent');
            return callback(err, res);
        } else {
            console.log('Gas Giant Sent');
            w7f_map.query('SELECT p.name FROM planet as p WHERE p.planid ='+ planid, (err, res2) => {
                return callback(err, ['Gas Giant', res2[0].name]);
            })
        }
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
}).get('/ServerBuilder.js/system/:system*', (req, res) => {
    planetImport(req.params.system, function (err, planets) {
        if (err) throw err;
        var xw = new XMLWriter;
        console.log(req.params);
        console.log(req.url);

        xw.startDocument().startElement('root');
            for (item of planets) {
                xw.startElement('planet');
                for (prop in item) {
                    //console.log(prop + ": " + item[prop]);
                    xw.writeAttribute(prop, item[prop].toString());
                }
                xw.endElement();
            }
        xw.endElement().endDocument();

        res.send(xw.output);
    });
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
    tilesByPlanet(req.params.planet, function (err, tiles) {
        if (err) throw err;
        var xw = new XMLWriter;
        //console.log(tiles);
        console.log(req.params);
        console.log(req.url);
        if (!(tiles[0] == 'Gas Giant')) {
            console.log('Tile count: '+tiles.length+' on planet '+tiles[0]);

            //Delete after DB update
            for (item of tiles) {
                for (prop in item) {
                    if (item[prop] === null) {
                        item[prop] = "none";
                    }
                }
            }
            //console.log(tiles);

            xw.startDocument().startElement('root');
            for (item of tiles) {
                xw.startElement('tile');
                for (prop in item) {
                    //console.log(prop + ": " + item[prop]);
                    xw.writeAttribute(prop, item[prop].toString());
                }
                xw.endElement();
            }
            xw.endElement().endDocument();
        } else {
            xw.startDocument().startElement('root');
            xw.writeAttribute('name', tiles[1]).text(tiles[0]);
            xw.endElement().endDocument();
        }
        //console.log(xw.output);
        res.send(xw.output);
    });
});

server.listen(port, () => {
    console.log('Node running on ' + port);
});
