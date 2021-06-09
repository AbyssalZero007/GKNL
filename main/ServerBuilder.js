const http = require('http');
const fs = require('fs');
const express = require('express');
const path = require('path');

const server = express();
const port = 8080;

server.get('/', (req, res) => {
    
    server.use(express.static(__dirname + '/visuals'));
    server.use(express.static(__dirname + '/scripts/public'));
    res.sendFile(__dirname + '/HomePage.html');

    /*
    fs.readFile('DBInfo.js', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/js'});
        res.write(data);
        return res.end();
    });
    */
})

server.listen(port, () => {
    console.log('Node running on ' + port);
})
