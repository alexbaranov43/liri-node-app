require("dotenv").config();

var keys = require("./key.js")

var fs = require("fs")
var twitter = require("twitter");
var dotenv = require("dotenv");
var request = require("request");
var spotify = require("node-spotify-api");
var command = process.argv[2];
var search = process.argv[3];

//command prompt commands
if (command === "spotify-this-song") {
    spotifySong(search);
}
else if (command === "movie-this") {
    movieSearch(search)
}
else if (command === "do-what-it-says") {
    doWhatItSays()

}
else if (command === "my-tweets") {
    twitterTweets();

}



////functions 

//spotify function
function spotifySong(search) {
    var client = new spotify(keys.spotify)
    if (search) {
        client.search({ type: 'track', query: search, limit: '5' }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            console.log("----------------------");
            for (i = 0; i < data.tracks.items.length; i++) {
                var artists = [];
                console.log("*-------------------------------------*")
                for (i2 = 0; i2 < data.tracks.items[i].artists.length; i2++) {
                    artists.push(data.tracks.items[i].artists[i2].name)
                }
                console.log("Artists: " + artists.join(", "))
                console.log("Title: " + data.tracks.items[i].name)
                console.log("Album: " + data.tracks.items[i].album.name)
                console.log("Preview Link: " + data.tracks.items[i].preview_url)
                logData('\n*-------------------------------------*' +
                    '\r\nArtists: ' + artists.join(", ")
                    +'\r\nTitle: ' + data.tracks.items[i].name
                    +'\r\nAlbum: ' + data.tracks.items[i].album.name
                    +'\r\nPreview Link: ' + data.tracks.items[i].preview_url
                )
            }
        })
    }
    else {
        spotifySong("The Sign Ace of Base")
    }

}

//movie search function
function movieSearch(search) {
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
                logData('\n*-------------------------*' + '\r\n' + JSON.parse(body).Title
                    + '\r\nRelease Year: ' + JSON.parse(body).Year
                    + '\r\nIMDb Rating: ' + JSON.parse(body).imdbRating
                    + "\r\nRotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value
                    + "\r\nProduced In: " + JSON.parse(body).Country
                    + "\r\nLanguge[s] :" + JSON.parse(body).Language
                    + "\r\nPlot: " + JSON.parse(body).Plot
                    + "\r\nActors: " + JSON.parse(body).Actors
                )
            }
        });
    } else {
        movieSearch("Mr. Nobody")
    }

}

//twitter function
function twitterTweets() {
    var client = twitter(keys.twitter)
    client.get('statuses/user_timeline', { screen_name: 'alexbaranov43', count: 20 }, function (error, tweets, response) {
        if (error) {

            return console.log(error);
        }
        else {
            for (i = 0; i < tweets.length; i++) {
                console.log("*---------------------*")
                console.log(tweets[i].created_at)
                console.log(tweets[i].text);
                logData("\n*---------------------*" + '\r\n' + tweets[i].created_at + "\r\n" + tweets[i].text)
            }
        }
    });

}
function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err)
        }
        var dataArr = data.split(",");

        for (i = 0; i < dataArr.length; i += 2) {
            if (dataArr[i] === "spotify-this-song") {
                spotifySong(dataArr[1])
            }
        }
    })
}

function logData(dataLog) {
    fs.appendFile("./log.txt", dataLog, function (err) {
        if (err) throw err;
    })

}
