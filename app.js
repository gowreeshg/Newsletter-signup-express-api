const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

// api key
// f71ed56f7310074fc104b1c49b84c438-us13

// endpoint
// https://us13.api.mailchimp.com/3.0/lists/6ee5f80022

// list id
// // 6ee5f80022

app.post("/", function(req,res){
  const firstName= req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;
  console.log(firstName, lastName, email);

  const data = {
    members : [
      {
        email_address : email,
        status : "subscribed",
        merge_fields : {
          FNAME : firstName,
          LNAME : lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us13.api.mailchimp.com/3.0/lists/6ee5f80022";

  const options = {
    method : "POST",
    auth : "Gowreesh:f71ed56f7310074fc104b1c49b84c438-us13"
  }

  const request = https.request(url,options, function(response){
    if(response.statusCode===200){
      res.sendFile(__dirname+"/success.html");
    }
    else{
      res.sendFile(__dirname+"/failure.html");
    }
    response.on("data" , function(data){
      console.log(JSON.parse(data));
    })
  })

  // request.write(jsonData);
  request.end();
})

app.post("/failure",function(req,res){
  res.redirect("/");
})

app.get("/", function(req,res){
  res.sendFile(__dirname + "/signup.html");
})

app.listen(process.env.PORT || 3000, function(){
  console.log("Server is up and running at port 3000");
})
