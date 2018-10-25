const express = require("express");
const app = express();
const http = require('http');
const port = 8081;
app.use(express.static(__dirname + '/scripts'));
// Point static path to dist
app.use(express.static(__dirname + '/dist/hw8'));
app.set('port', process.env.PORT || port);
app.get('/', (req, res) => 
	res.sendFile('index.html')
);
// "https://maps.googleapis.com/maps/api/js?key=AIzaSyAHzFtoldQOPyMVNEEJZN8QE5Adj-SuW0Q"
// "https://app.ticketmaster.com/discovery/v2/events.json?apikey=faDkniVNhw8P88x5ljxBPGxEUbtD5Ulb&keyword=" 
app.listen(port, () => console.log(`Example app listening on port ${process.env.PORT || port}!`));