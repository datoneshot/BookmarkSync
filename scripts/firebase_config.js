var config = {
    apiKey: "AIzaSyA5et_rPQQuKkMIuS0XG7D6UFs4qr5uKC8",
    authDomain: "bookmarksync-950a3.firebaseapp.com",
    databaseURL: "https://bookmarksync-950a3.firebaseio.com",
    projectId: "bookmarksync-950a3",
    storageBucket: "",
    messagingSenderId: "370140090237"
};
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();