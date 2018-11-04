const express = require("express");
const axios = require('axios');
const bodyParser = require('body-parser');
const geoHashFun = require('ngeohash');
const SpotifyWebApi = require('spotify-web-api-node');
const path = require("path");
const app = express();
const port = process.env.PORT || 8081;
app.use(express.static(path.join(__dirname, 'dist/hw8')));
app.use(express.static(__dirname));
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
			spotifyApi.clientCredentialsGrant().then(
				function (data) {
					spotifyApi.setAccessToken(data.body['access_token']);
					spotifyApi.searchArtists(req.params.name)
						.then(response => {
							res.send(response.body.artists.items);
						})
				}
			);
		})
})

app.get('/auto-complete1/:name', (req, res) => {
	res.send('work');
});
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
app.get('/geo/:name', (req,res) => {
	axios.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + req.params.name +'&key=AIzaSyAHzFtoldQOPyMVNEEJZN8QE5Adj-SuW0Q')
	.then (geolocation => {
		if (geolocation.data.results.length > 0) {
			res.send(geolocation.data.results[0].geometry.location);
		} else {
			res.send("");
		}
	})
})
app.get('/find-venue-id/:name', (req,res) => {
	axios.get('https://api.songkick.com/api/3.0/search/venues.json?query=' + req.params.name +'&apikey=uVD27vJiXMdv5xMH')
	.then (venueInfo => {
		let results = venueInfo.data.resultsPage.results;
		if (results.venue !== undefined) {
			res.send(results.venue);
		} else {
			res.send("");
		}
	})
})
app.get('/find-venue-upcoming-event/:id', (req,res) => {
	axios.get('https://api.songkick.com/api/3.0/venues/' + req.params.id +'/calendar.json?apikey=uVD27vJiXMdv5xMH')
	.then (events => {
		let results = events.data.resultsPage.results;
		if (results.event !== undefined) {
			res.send(results.event);
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
// https://api.songkick.com/api/3.0/search/venues.json?query={venue_name}&apikey=uVD27vJiXMdv5xMH
// https://api.songkick.com/api/3.0/venues/{venue_id}/calendar.json?apikey=uVD27vJiXMdv5xMH
// https://maps.googleapis.com/maps/api/geocode/json?address=University+of+Southern+California+CA&key=AIzaSyAHzFtoldQOPyMVNEEJZN8QE5Adj-SuW0Q
// AIzaSyAshBhvq4KJhOOj7Lw-vd19vOWDLDHV_KM
// "https://maps.googleapis.com/maps/api/js?key=AIzaSyAHzFtoldQOPyMVNEEJZN8QE5Adj-SuW0Q"
// "https://app.ticketmaster.com/discovery/v2/events.json?apikey=faDkniVNhw8P88x5ljxBPGxEUbtD5Ulb&keyword=" 
// https://app.ticketmaster.com/discovery/v2/suggest?apikey=faDkniVNhw8P88x5ljxBPGxEUbtD5Ulb&keyword=laker
app.listen(port, () => console.log(`Example app listening on port ${port}!`));