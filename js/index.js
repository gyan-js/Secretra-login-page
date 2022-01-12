// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAOsTJteuguUF1r6TPRd4EgVfBnKrh-IZ4",
    authDomain: "secretra-edd9f.firebaseapp.com",
    projectId: "secretra-edd9f",
    storageBucket: "secretra-edd9f.appspot.com",
    messagingSenderId: "1020349909458",
    appId: "1:1020349909458:web:90fb533e279430280c600b"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // Initialize variables
  const auth = firebase.auth()
  const database = firebase.database()
  
  // Set up our register function
  function register () {
    // Get all our input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value
    var fName =  document.getElementById('fullName').value;
  

  
    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Email or Password is Outta Line!!')
      return
      // Don't continue running the code
    }
  
   
    // Move on with Auth
    auth.createUserWithEmailAndPassword(email, password)
    .then(function() {

   
      // Declare user variable
      var user = auth.currentUser
  
      // Add this user to Firebase Database
      var database_ref = database.ref()
  
      // Create User data
      var user_data = {
        email : email,
        fullName: fName,

        last_login : Date.now()
      }
  
      // Push to Firebase Database
      database_ref.child('users/' + user.uid).set(user_data)
  
      // DOne
     
    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
      console.log(error_code)
    })
    alert("User Created")
  }
  
  // Set up our login function
  function login () {
    // Get all our input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value
  
    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Email or Password is Outta Line!!')
      return
      // Don't continue running the code
    }
  
    auth.signInWithEmailAndPassword(email, password)
    .then(function() {
      // Declare user variable
      var user = auth.currentUser
  
      // Add this user to Firebase Database
      var database_ref = database.ref()
  
      // Create User data
      var user_data = {
        last_login : Date.now()
      }
  
      // Push to Firebase Database
      database_ref.child('users/' + user.uid).update(user_data)
  
      // DOne
      alert('User Logged In!!')
  
    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
    })

    ///window.open('account_info.html')
  }
  
  
  
  
  // Validate Functions
  function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
      // Email is good
      return true
    } else {
      // Email is not good
      return false
    }
  }
  
  function validate_password(password) {
    // Firebase only accepts lengths greater than 6
    if (password < 6) {
      return false
    } else {
      return true
    }
  }
  
  function validate_field(field) {
    if (field == null) {
      return false
    }
  
    if (field.length <= 0) {
      return false
    } else {
      return true
    }
  }

  




function submit() {
  var phone =  document.getElementById('phone').value;
  var address = document.getElementById('address').value;
  var bio = document.getElementById('bio').value;

  var country = document.getElementById('country').value;
  var gender = document.getElementById('gender').value;

 

  var rootRef = firebase.database().ref().child("Users");
  var userID = firebase.auth().currentUser.uid;
  var usersRef =  rootRef.child(userID)

  console.log(rootRef)
  console.log(userID)
  console.log(rootRef)
  console.log(bio)
  console.log(gender)

  if(phone != "" && gender != "" && country != "" && address != "" && bio != "" ) 
  {
        var userData = 
        {
          "phone": phone,
          "address": address,
          "bio": bio,
        
          "country": country,
          "gender": gender
        };

      usersRef.set(userData, function()
      {
        if(error) {
          var errorCode = errro.code;
          var errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
          window.alert("Message : " + errorMessage)
        }
        else{
          var userID = firebase.auth().currentUser.uid;
          firebase.database().ref('Users/ ' + userID).once('value').then(function(snapshot) {

            if(snapshot.val()){
              window.location.href = "index.html"; 
            }

          })

          
        }
      });
  }
  else{
    alert("Form is incomplete.")
  }
}


//animation of login page

const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});