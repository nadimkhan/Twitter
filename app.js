console.log('The bot is starting');
var Twit = require('twit');
require('dotenv').config();
const fs = require('fs');
const path = require('path');
//const dataDirPath = path.resolve(__dirname, "data");
const mediaDirPath = path.resolve(__dirname, "images");
//var dataFile = fs.readFileSync(dataDirPath + `/merged.json`);
var medias = fs.readdirSync(mediaDirPath);
var accounts = ['@Bamboomatic2cr', '@Sajidar67444051', '@ImranSa00070946', '@Muhamma20384480', '@CryptoG83056006', '@cryptoassa0511'];
var hashTags = ['#crypto', '#cryptogiveaway', '#NFT', '#cryptocurrency', '#metaverse', '#giveaway', '#NFTs', '#NFTGiveaways', '#NFTCollector', '#DeFi', '#IDO', '#GameFi', '#LaunchPad']

var texts = ['Cryptocurrency just got even better. Join the daily biggest giveaways.', 'Just simply amazing. Interested in daily upto $1000 giveaways?...','Converts well, receive more. Join to participate in $1000 Daily Giveway.', 'The most amazing thing you can get. Participate in upto $1000 Daily Giveaway.', 'Think Cryptocurrency?... Join us to participate in $1000 daily giveaway.', 'Next To The Breast, Cryptocurrency’s The Best. Participate in our $1000 daily giveaway.', 'Easy, Breezy, Beautiful Cryptocurrency. Participate in our $1000 daily giveway.', 'Have A Break. Have A Cryptocurrency. Join to particiapte in $1000 daily giveaway.', 'A Cryptocurrency A Day Helps You Work, Rest And Play. Participate in our $1000 daily giveaway.', 'Cryptocurrency Is Everything You Need. Join us for $1000 daily giveaway.', 'You Too Can Have A Money Like Mine. $1000 daily giveways just for you.', 'Cryptocurrency Comes To Those Who Wait. Join us for a $1000 daily giveaway.', 'Cryptocurrency – It’s Like Heaven! Join to be a part of $1000 daily giveway.', 'Cryptocurrency For Everyone. Join to participate in $1000 daily giveaway.'];


var T = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_TOKEN,
  access_token: process.env.ACC_TOKEN,
  access_token_secret: process.env.ACC_SECRET,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL:            true,     // optional - requires SSL certificates to be valid.
});

function fsReadFileSynchToArray (filePath) {
  var data = JSON.parse(fs.readFileSync(filePath));
 // console.log(data);
  return data;
}

//console.log(dataFile);

//tweetIt();

function getRandomImage(){
  var image = medias[Math.floor(Math.random()*medias.length)];
    var fullPathToImage = mediaDirPath + '/' +image;
    var base64image = new Buffer.from(fullPathToImage).toString('base64');
    return base64image;
}
function randomFromArray(name){
  return name[Math.floor( Math.random() * name.length )];
}
function getMultipleRandom(arr, num) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
  
    return shuffled.slice(0, num);
  }
async function tweetRandomImage(){
 
  fs.readdir( __dirname + '/images', function( err, files ) {
    if ( err ){
      console.log( 'error:', err );
    }
    else{
      let images = [];
      files.forEach( function( f ) {
        images.push( f );
      } );

      console.log( 'opening an image...' );

      const imagePath = path.join( __dirname, '/images/' + randomFromArray( medias ) ),
            b64content = fs.readFileSync( imagePath, { encoding: 'base64' } );
      var account = randomFromArray(accounts);
      var hashTag = getMultipleRandom(hashTags, 3);
      var hashTagString = hashTag.toString();
      var spacedString = hashTagString.replace(/,/g, ' ');
      
      var message = "\r\n ---------------------- \r\n" + spacedString + "\r\n";

      console.log( 'uploading an image...' );

      T.post( 'media/upload', { media_data: b64content }, function ( err, data, response ) {
        if ( err ){
          console.log( 'error:', err );
        }
        else{
          const image = data;
          console.log( 'image uploaded, adding description...' );

          T.post( 'media/metadata/create', {
            media_id: image.media_id_string,
            alt_text: {
              text: 'Crypto / NFT Giveaways'
            }            
          }, function( err, data, response ){
            console.log( 'tweeting the image...' );

            T.post( 'statuses/update', {
              status: message,
              media_ids: [image.media_id_string]
            },
              function( err, data, response) {
                if (err){
                  console.log( 'error:', err );
                } else {                  
                  console.log( 'posted an image!' );
                }
              }
            );
          } );
        }
      } );      
    }
  } );
}


//tweetIt();

async function readConsole(){  
    var image = medias[Math.floor(Math.random()*medias.length)];
    var fullPathToImage = fs.readFileSync(mediaDirPath + '/' + image);
    var base64image = new Buffer.from(fullPathToImage).toString('base64');
    console.log('Testing Time', base64image);
}

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}


var i = 1;                  //  set your counter to 1

function myLoop() {  
    tweetRandomImage();
  var rndInt = randomIntFromInterval(600, 900);       //  create a loop function
  setTimeout(function() {   //  call a 3s setTimeout when the loop is called
    //console.log('hello');   //  your code here
    i++;                    //  increment the counter
    if (i < 18747) {           //  if the counter < 10, call the loop function
      myLoop(); 
      console.log('mins', i)            //  ..  again which will trigger another 
    }                       //  ..  setTimeout()
  }, rndInt * 1000)
}

myLoop();
//console.log(getMultipleRandom(hastTags, 3));         

//readConsole()