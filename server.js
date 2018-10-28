const express = require("express");
const axios = require('axios');
const bodyParser = require('body-parser');
const geoHashFun = require('ngeohash');
const app = express();
const port = process.env.PORT || 8082;
app.use(express.static(__dirname + '/scripts'));
// Point static path to dist
app.use(express.static(__dirname + '/dist/hw8'));
app.set('port', port);
app.get('/', (req, res) => 
	res.sendFile('index.html')
);
app.get('/auto-complete/:name',(req,res) => {
	axios.get('https://app.ticketmaster.com/discovery/v2/suggest?apikey=faDkniVNhw8P88x5ljxBPGxEUbtD5Ulb&keyword=' + req.params.name)
		.then(events => {
			if (events.data._embedded != undefined) {
				res.send(events.data._embedded.attractions);
			} else {
				res.send("");
			}
		})
		.catch(err => {
			console.log(err.response.status);
		})
});
app.post('/form/', bodyParser.json(),(req,res) => {
	let formField = req.body;
	console.log(formField);
	let getHashCode = geoHashFun.encode(formField.lat, formField.lng);
	axios.get('https://app.ticketmaster.com/discovery/v2/events.json?apikey=faDkniVNhw8P88x5ljxBPGxEUbtD5Ulb&keyword=' + formField.keyword + getSegmentId(formField.category) + "&radius=" +
		formField.distance + '&unit=' + formField.distanceUnit + '&geoPoint=' + getHashCode)
		.then(events => {
			if (events.data._embedded != undefined) {
				res.send(events.data._embedded.events);
			} else {
				res.send("");
			}
		})
});

function getSegmentId(category) {
	switch (category) {
		case "Music":
			return "&segmentId=KZFzniwnSyZfZ7v7nJ";
		case "Sports":
			return "&segmentId=KZFzniwnSyZfZ7v7nE";
		case "Arts & Theatre":
			return "&segmentId=KZFzniwnSyZfZ7v7na";
		case "Film":
			return "&segmentId=KZFzniwnSyZfZ7v7nn";
		case "Miscellaneous":
			return "&segmentId=KZFzniwnSyZfZ7v7n1";
		default:
			return "";
	}
}
// "https://maps.googleapis.com/maps/api/js?key=AIzaSyAHzFtoldQOPyMVNEEJZN8QE5Adj-SuW0Q"
// "https://app.ticketmaster.com/discovery/v2/events.json?apikey=faDkniVNhw8P88x5ljxBPGxEUbtD5Ulb&keyword=" 
// https://app.ticketmaster.com/discovery/v2/suggest?apikey=faDkniVNhw8P88x5ljxBPGxEUbtD5Ulb&keyword=laker
app.listen(port, () => console.log(`Example app listening on port ${port}!`));