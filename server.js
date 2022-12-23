 const express = require("express");
 const cors = require("cors");
 const bodyParser = require("body-parser");
 const axios  = require("axios");

 const app = express();
 app.use(cors({}))

 app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

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

let  port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function () {
    console.log("server started")
})