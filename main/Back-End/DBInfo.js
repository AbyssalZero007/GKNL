const mysql = require('mysql');

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
  for (id in planid) {
    console.log(id);
  }
});





// Terminating Connections
w7f_fp.end((err) => {});
w7f_map.end((err) => {});
w7f_player.end((err) => {});