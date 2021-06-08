const http = require('http');
const fs = require('fs');
const express = require('express');
const path = require('path');

const server = express();
const port = 8080;

server.use(express.static(path.join(__dirname, '../Images/')));
server.use(express.static(__dirname + 'sessvars.js'));
server.use(express.static(path.join(__dirname, '../Front-End/')));

server.get('/', (req, res) => {
    
    
    res.sendFile(path.join(__dirname, '../Front-End/HomePage.html'));

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
