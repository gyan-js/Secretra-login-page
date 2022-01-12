const firebaseConfig = {
  apiKey: "AIzaSyAOsTJteuguUF1r6TPRd4EgVfBnKrh-IZ4",
  authDomain: "secretra-edd9f.firebaseapp.com",
  projectId: "secretra-edd9f",
  storageBucket: "secretra-edd9f.appspot.com",
  messagingSenderId: "1020349909458",
  appId: "1:1020349909458:web:90fb533e279430280c600b",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth();
const database = firebase.database();
var user = auth.currentUser;

function SEND_EMAIL_VERIFICATION() {
    var auth = firebase.auth()
    var email = document.getElementById('forgotEmail').value;

    if (email != "") {
            user.sendPasswordResetEmail(email).then(function() {
                alert("Email has been sent to you, Please check and verify")
            })
            .cathch(function(error) {
                var error_code = error.code
                var error_message = error.message
            
                alert(error_message)
                console.log(error_code)
            });
    }
    else{
        alert("Enter your email")
    }
}

