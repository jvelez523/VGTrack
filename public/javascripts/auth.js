var googleProvider = new firebase.auth.GoogleAuthProvider();
var facebookProvider = new firebase.auth.FacebookAuthProvider();

//Initialize Firebase Auth
const firebaseconfig = {
  apiKey: "AIzaSyDCAEgf8Yx1CMWZvnD3b8ycnmkllg8hF0g",
  authDomain: "vgtrack-b9f8f.firebaseapp.com",
  databaseURL: "https://vgtrack-b9f8f.firebaseio.com",
  projectId: "vgtrack-b9f8f",
  storageBucket: "vgtrack-b9f8f.appspot.com",
  messagingSenderId: "270951071368"
};
firebase.initializeApp(firebaseconfig);

//<---------Sign-Up Code----------->

//Email
document.querySelector("#emailsignin").addEventListener("click", () => {
  let email = document.querySelector("#email").value;
  let password = document.querySelector("#pass").value;
  let name = document.querySelector("#username").value;
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(result => {
      var user = firebase.auth().currentUser;

      if (result.additionalUserInfo.isNewUser) {
        user.updateProfile({
          displayName: name
        });
        axios
          .post("/signup", result)
          .then(user => {
            console.log(user);
          })
          .catch(err => {
            console.log(err);
          });
      }
      //location.reload();
      console.log("User has logged in", user);
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
});

// Google Signin
document.querySelector("#googlesignin").addEventListener("click", () => {
  firebase
    .auth()
    .signInWithPopup(googleProvider)
    .then(result => {

      if(result.additionalUserInfo.isNewUser){
      axios
        .post("/signup", result)
        .then(user => {
          console.log(user);
          axios
          .post("/user", { user: result.user })
          .then(res => console.log(res))
          .catch(err => console.error(err));
        })
        .catch(err => {
          console.log(err);
        });
      }
      else {
        axios
          .post("/user", { user: result.user })
          .then(res => console.log(res))
          .catch(err => console.error(err));
      }
      console.log("user has logged in", result);
    });
});

document.querySelector("#facebooksignin").addEventListener("click", () => {
  firebase
    .auth()
    .signInWithPopup(facebookProvider)
    .then(result => {
      if (result.additionalUserInfo.isNewUser) {
        axios
          .post("/signup", result)
          .then(user => {
            console.log(user);
            axios
          .post("/user", { user: result.user })
          .then(res => console.log(res))
          .catch(err => console.error(err));
          })
          .catch(err => {
            console.log(err);
          });
      }
      else {
        axios
          .post("/user", { user: result.user })
          .then(res => console.log(res))
          .catch(err => console.error(err));
      }
      console.log("user has logged in", result);
    });
});

//When Logged in Functions
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var uid = user.uid;
    var providerData = user.providerData;
    console.log(email, displayName);

    $(".modal").modal("close");

    let userloggedin = document.querySelector(".rightnav");
    userloggedin.innerHTML = `<li><a class="dropdown-trigger" href="#!" data-target="dropdown">Hi, ${displayName}<i class="material-icons right">arrow_drop_down</i></a></li>`;
    $(".dropdown-trigger").dropdown();

    //document.querySelector(".logbutton").style.display = "none"
    let sidenavloggedin = document.querySelector(".sidenav")
    sidenavloggedin.innerHTML = `  
    <li><a href="/"><i class="small material-icons">home</i>Home</a></li>
    <li><a href="/explore"><i class="small material-icons">explore</i>Explore</a></li>
    <li><a href="/dashboard"><i class="small material-icons">dashboard</i>Dashboard</a></li>
  `
    // <li><form class="logform" action="logout" method="POST"><button onclick="this.parentNode.submit()" href="#!" id="logoutmob" class="logoutmobile btn-small platbut logbut">Log Out</button></form></li>
  } else {
    console.log("User is signed out");
    // User is signed out.
    // ...
  }
});

//Logout Function
if (document.querySelector("#logout")) {
  document.querySelector("#logout").addEventListener("click", () => {
    firebase
      .auth()
      .signOut()
      .then(result => {
        console.log("User has been signed out");
        location.reload();
        window.location.href = "/";
      })
      .catch(err => {
        console.log("There was an error:", err);
      });
  });
}

if (document.querySelector("#logoutmob")) {
  document.querySelector("#logoutmob").addEventListener("click", () => {
    firebase
      .auth()
      .signOut()
      .then(result => {
        console.log("User has been signed out");
        location.reload();
        window.location.href = "/";
      })
      .catch(err => {
        console.log("There was an error:", err);
      });
  });
}
