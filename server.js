const express = require("express");
const axios = require('axios');
const bodyParser = require('body-parser');
const geoHashFun = require('ngeohash');
const SpotifyWebApi = require('spotify-web-api-node');

const app = express();
const port = process.env.PORT || 8082;
app.use(express.static(__dirname + '/scripts'));
app.use(express.static(__dirname + '/dist/hw8'));
app.set('port', port);
app.get('/', (req, res) => 
	res.sendFile('index.html')
);
const spotifyApi = new SpotifyWebApi({
	clientId: 'f2ca6c50b0154e3493f3ac2b6c17dda1',
	clientSecret: 'fbaf299f79e141809e13ad47fa874e1e'
});
spotifyApi.clientCredentialsGrant().then(
	function (data) {
		console.log('The access token is ' + data.body['access_token']);
		spotifyApi.setAccessToken(data.body['access_token']);
	}
);
app.get('/spotify/:name', (req,res) => {
	spotifyApi.searchArtists(req.params.name)
		.then(response => {
			res.send(response.body.artists.items);
		})
		.catch(err => {
			console.log("error!");
			if (res.statusCode == 401) {
				spotifyApi.clientCredentialsGrant().then(
					function (data) {
						spotifyApi.setAccessToken(data.body['access_token']);
						spotifyApi.searchArtists(req.params.name)
							.then(artists => {
								console.log(artists);
								res.send(artists.items);
							})
					},
					function (err) {
					}
				);
			}
		})
})
app.get('/auto-complete/:name',(req,res) => {
	axios.get('https://app.ticketmaster.com/discovery/v2/suggest?apikey=faDkniVNhw8P88x5ljxBPGxEUbtD5Ulb&keyword=' + req.params.name)
		.then(events => {
			if (events.data._embedded != undefined) {
				res.send(events.data._embedded.attractions);
			} else {
				res.send("");
			}
		})
});
app.post('/form/', bodyParser.json(),(req,res) => {
	let formField = req.body;
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
app.get('/img-search/:name', (req,res) => {
	axios.get('https://www.googleapis.com/customsearch/v1?q=' + req.params.name + '&cx=010658708058310572216:wftzopcjwpg&imgSize=huge&imgType=news&num=8&searchType=image&key=AIzaSyAshBhvq4KJhOOj7Lw-vd19vOWDLDHV_KM')
	.then(imgLink => {
		if(imgLink.data.items.length > 0) {
			res.send(imgLink.data.items);
		} else {
			res.send("");
		}
	})
})
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
// AIzaSyAshBhvq4KJhOOj7Lw-vd19vOWDLDHV_KM
// "https://maps.googleapis.com/maps/api/js?key=AIzaSyAHzFtoldQOPyMVNEEJZN8QE5Adj-SuW0Q"
// "https://app.ticketmaster.com/discovery/v2/events.json?apikey=faDkniVNhw8P88x5ljxBPGxEUbtD5Ulb&keyword=" 
// https://app.ticketmaster.com/discovery/v2/suggest?apikey=faDkniVNhw8P88x5ljxBPGxEUbtD5Ulb&keyword=laker
app.listen(port, () => console.log(`Example app listening on port ${port}!`));