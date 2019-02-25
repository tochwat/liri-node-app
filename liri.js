var axios = require("axios");
require('dotenv').config();
var Spotify = require('node-spotify-api');

//verify the .env is working
// console.log(process.env);

var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);


var command = process.argv[2];

var nodeArgs = process.argv;
var media = "";
for (var i=3; i<nodeArgs.length; i++) {
  if (i>3 && i<nodeArgs.length){
    media = media + "+" + nodeArgs[i];
  } else {
    media += nodeArgs[i];
  }
}


if (command === "spotify-this-song") {
    spotify.search({ type: 'track', query: media, limit: 1 }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
    
    // console.log(data.tracks.items[0]); 

    console.log("Artist: " + data.tracks.items[0].artists[0].name); 
    console.log("Song title: " + data.tracks.items[0].name); 
    console.log("Preview link: " + data.tracks.items[0].external_urls.spotify); 
    console.log("Album: " + data.tracks.items[0].album.name); 

    });
} else if (command === "movie-this") {
  var queryUrl = "http://www.omdbapi.com/?t=" + media + "&y=&plot=short&apikey=trilogy";

  axios.get(queryUrl).then(
    function(response) {
      console.log("Release Year: " + response.data.Year);
      console.log(response.data);
    }
  );
}