var firebaseConfig = {
    apiKey: "AIzaSyBMvOsnodHHyOD9cuHmWe7tLZNdLR3FkV8",
    authDomain: "positivemessageboard.firebaseapp.com",
    databaseURL: "https://positivemessageboard.firebaseio.com",
    projectId: "positivemessageboard",
    storageBucket: "positivemessageboard.appspot.com",
    messagingSenderId: "460024181673",
    appId: "1:460024181673:web:76ad3b33ee6c9c7b6d4ab8",
    measurementId: "G-HNVV5M327B"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var db = firebase.firestore();


var sendPage = document.getElementsByClassName('sendPage')[0]
var receivePage = document.getElementsByClassName('receivePage')[0]

function send() {
    console.log(sendPage)
    console.log("Send!")
    sendPage.style.visibility = "visible";
    receivePage.style.visibility = "hidden";
}

function receive() {
    var allMessages = []
    console.log("receive!")
    sendPage.style.visibility = "hidden";
    receivePage.style.visibility = "visible";
    db.collection("posts").get().then(function(snapshot) {
        snapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            post = [doc.data().name, doc.data().message];
            allMessages.push(post)
        });
    })
    setTimeout(function() {
        console.log(allMessages)
        console.log(allMessages.length)
        // var num = Math.random()
        var num = Math.floor((Math.random() * allMessages.length) + 0)
        console.log(num)
        console.log(allMessages[num])
        document.getElementById("displayMessage").innerHTML = allMessages[num][1]
        document.getElementById("displayName").innerHTML = "- " + allMessages[num][0]
    }, 1000)

}

function submit() {
    var message = document.getElementById("message").value
    var name = document.getElementById("name").value
    db.collection("posts").doc(message).set({
            name: name,
            message: message
        })
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });

}
