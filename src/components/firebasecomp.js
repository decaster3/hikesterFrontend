var firebase = require("firebase");
    var config = {
    apiKey: "AIzaSyBEyXqD8a6x9ltIzhEADgn0AjUvjvcDU54",
    authDomain: "hikester-81bcd.firebaseapp.com",
    databaseURL: "https://hikester-81bcd.firebaseio.com",
    storageBucket: "bucket.appspot.com"
    };
    firebase.initializeApp(config);
module.exports = function(){
	
    return firebase;
}



