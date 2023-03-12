 const express = require("express");
 const cors = require("cors");
 const bodyParser = require("body-parser");
 const axios  = require("axios");
 const { initializeApp } = require("firebase/app");
 const firebase = require("firebase/app");
 const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } = require("firebase/auth");


 const app = express();
 app.use(cors({}))
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



const firebaseConfig = {
  apiKey: "AIzaSyCqs9t2qvyKaGx8L5k6XIcIEnVc2f5jwys",
  authDomain: "rubenjungbluth-7e6ff.firebaseapp.com",
  projectId: "rubenjungbluth-7e6ff",
  storageBucket: "rubenjungbluth-7e6ff.appspot.com",
  messagingSenderId: "51598960522",
  appId: "1:51598960522:web:e62919e43d8fdba78b0a73"
};



// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);


const auth = getAuth(firebaseApp)


app.get("/user", async(req, res)=> {
    const options = {
        headers: {
          accept: 'application/json',
          //credentials: "include",
          //Access-Control-Allow-Origin: 'https://rubenjungbluth-test.webflow.io',
          authorization: 'Bearer 4b4571a475e3d062a875e4a7e7a53542696993f9cf2fd6176fa61a3a251d820c'
        }
      };
      
      const response = await axios.get('https://api.webflow.com/user', options)
        //.then(response => response.json())
        //.then(response => console.log("Auth USER", response))
        //.catch(err => console.error(err));
        console.log(response.data)
        res.json({user: response.data});
})


app.get("/username", function(req, res) {
    res.send("this is the username");
})


app.get("/orders", (req, res)=> {

const orderOptions = {
  method: 'GET',
  url: 'https://api.webflow.com/sites/639b91536a3b8af74e7360b2/orders',
  headers: {
    accept: 'application/json',
    authorization: 'Bearer 4b4571a475e3d062a875e4a7e7a53542696993f9cf2fd6176fa61a3a251d820c'
  }
};

axios
  .request(orderOptions)
  .then(function (response) {
    console.log(response.data);
    res.json({orders: response.data});
  })
  .catch(function (error) {
    console.error(error);
  });

})

app.post("/signup", (req, res)=>{
  console.log("In sign up loop")
  console.log(req.body)
  const data = JSON.stringify(req.body)

  const newData = JSON.parse(data)

    createUserWithEmailAndPassword(auth, newData.email, newData.password)
    .then((userCredential => {
        const user = userCredential.user;
        res.status(200).send({ user: user});
        console.log("user created.", user);
    })).catch((error => {
        res.status(400).send({ message: error.message});
      console.log("An error occured", error.code, error.message);
    }))

})



app.post("/signin", (req, res)=>{
  console.log("In sign IN loop")
  const email = req.body.email;
  const password = req.body.password;

  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user)
      res.status(200).send({ user: user});

      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      res.status(400).send({ message: errorMessage});

    });
  })




app.post("/logout", (req, res)=>{
    const email = req.body.email;
    
signOut(auth).then(() => {
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
});
})



let  port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function () {
    console.log("server started")
})