require("dotenv").config();

var keys = require("./key.js")


var twitter = require("twitter");
var dotenv = require("dotenv");
var request = require("request");
var spotify = require("node-spotify-api");
var command = process.argv[2];
var search = process.argv[3];


if (command === "spotify-this-song") {
    var client = new spotify(keys.spotify);
    var artists = [];

    if (search) {
        spotify
        client.search({ type: 'track', query: search, limit: 1 }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            // function artist() {
            // for (i = 0; i < data.tracks.items.length; i++) {
            // for (i = 0; i < data.tracks.items[i].album.artists.length; i++) {
            // artists.push(data.tracks.items[i].album.artists[i].name)
            // console.log("Artist[s]: " + artists.join(", "));
            // }
            // }
            // }
            for (i = 0; i < data.tracks.items.length; i++) {

                for (i = 0; i < data.tracks.items[i].album.artists.length; i++) {
                    artists.push(data.tracks.items[i].album.artists[i].name)
                }

                console.log("Song Name: " + data.tracks.items[i].name)
                console.log("Artist[s]: " + artists.join((", ")))

            }
        })



        // for (i = 0; i < data.tracks.items.length; i++) {
        // function artist() {
        // for (i = 0; i < data.tracks.items.length; i++) { 
        // for (i = 0; i < data.tracks.items[i].album.artists.length; i++) {
        // artists.push(data.tracks.items[i].album.artists[i].name)
        // console.log("Artist[s]: " + artists.join(", "));
        // }}
        // }
        // console.log("Song Name: " + data.tracks.items[i].name)
        // artist();
        // console.log(data.tracks.items[i].album)



        // }
        // });
    }
}

else if (command === "movie-this") {
    if (search) {
        request("http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log(JSON.parse(body).Title);
                console.log("Release Year :" + JSON.parse(body).Year);
                console.log("IMDb Rating: " + JSON.parse(body).imdbRating);
                console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
                console.log("Produced In: " + JSON.parse(body).Country);
                console.log("Languge[s] :" + JSON.parse(body).Language);
                console.log("Plot: " + JSON.parse(body).Plot);
                console.log("Actors: " + JSON.parse(body).Actors)
            }
        });
    } else {
        request("http://www.omdbapi.com/?t=Mr.+Nobody&y=&plot=short&apikey=trilogy", function (error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log(JSON.parse(body).Title);
                console.log("Release Year :" + JSON.parse(body).Year);
                console.log("IMDb Rating: " + JSON.parse(body).imdbRating);
                console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
                console.log("Produced In: " + JSON.parse(body).Country);
                console.log("Languge[s] :" + JSON.parse(body).Language);
                console.log("Plot: " + JSON.parse(body).Plot);
                console.log("Actors: " + JSON.parse(body).Actors)
            }
        })
    }
}
else if (command === "do-what-it-says") {

}
else if (command === "my-tweets") {
    var client = twitter(keys.twitter)
    client.get('statuses/user_timeline', { screen_name: 'alexbaranov43', count: 20 }, function (error, tweets, response) {
        if (error) throw error;
        for (i = 0; i < tweets.length; i++) {
            console.log("*---------------------*")
            console.log(tweets[i].created_at)
            console.log(tweets[i].text);

        }
    });


};
