// Our Twitter library
var Twit = require('twit');

// We need to include our configuration file
var T = new Twit(require('./config.js'));

// This is the URL of a search for the latest tweets on the '#mediaarts' hashtag.

var arraylist=['#MyVoteForIndia','#FirEkBaarModiSarkaar', '#Amethi', '#SmritiIrani', '#ModiForPM', '#NamoAgain2019','#BaarBaarModiSarkaar']
var arraylist1=['#VoteForBJP','#BJP','#Hinduism','#Hindus','#SanatanDharma']

var randomv=Math.floor(Math.random()*7);
var randomx=Math.floor(Math.random()*3);
var randomz=Math.floor(Math.random()*100);

console.log(randomv)

var mediaArtsSearch = {q: arraylist[randomv], count: randomz, result_type: "recent"}; 
var mediaArtsSearch1 = {q: arraylist1[randomx], count: randomz, result_type: "recent"}; 

//This function finds the latest tweet with the #mediaarts hashtag, and retweets it.
function favoriteLatest(){
	T.get('search/tweets', mediaArtsSearch1, (err, data, response) => {
		// If there is no error, proceed
		if(err){
		  return console.log(err);
		}
	  
		// Loop through the returned tweets
		const tweetsId = data.statuses
		  .map(tweet => ({ id: tweet.id_str }));
	  
		tweetsId.map(tweetId => {
		  T.post('favorites/create', tweetId, (err, response) => {
			if(err){
			  return console.log(err);
			}
	  
			const username = response.user.screen_name;
			const favoritedTweetId = response.id_str;
			console.log(`Favorited: https://twitter.com/${username}/status/${favoritedTweetId}`);
	  
		  });
		});
	  })
	

}
function retweetLatest() {
	T.get('search/tweets', mediaArtsSearch, function (error, data) {
	  // log out any errors and responses
	  console.log(error, data);
	  // If our search request to the server had no errors...
	  if (!error) {
	  	// ...then we grab the ID of the tweet we want to retweet...
		var retweetId = data.statuses[0].id_str;
		// ...and then we tell Twitter we want to retweet it!
		T.post('statuses/retweet/' + retweetId, { }, function (error, response) {
			if (response) {
				console.log('Success! Check your bot, it should have retweeted something.')
				var randomv=Math.floor(Math.random()*7);
			}
			// If there was an error with our Twitter call, we print it out here.
			if (error) {
				console.log('There was an error with Twitter:', error);
				var randomv=Math.floor(Math.random()*7);
			}
		})
	  }
	  // However, if our original search request had an error, we want to print it out here.
	  else {
	  	console.log('There was an error with your hashtag search:', error);
	  }
	});
} 

// Try to retweet something as soon as we run the program...
retweetLatest();
favoriteLatest();

// ...and then every hour after that. Time here is in milliseconds, so
// 1000 ms = 1 second, 1 sec * 60 = 1 min, 1 min * 60 = 1 hour --> 1000 * 60 * 60
setInterval(retweetLatest, 1000 * 10 * 1);
setInterval(favoriteLatest, 1000 * 10 * 1);
