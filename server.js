// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// your first Timestamp API endpoint... 
app.get(["/api/:date","/api/"], function (req, res) {
  var date=req.params.date;
  if(date){
    if(isNaN(date)){
      if(isNaN(Date.parse(date))){
        res.json({error: 'Invalid date'});
      } else {
        var newDate=new Date(date);
        res.json({unix: newDate.getTime(),
        utc: newDate.toUTCString()});
      }
    } else {
      var long_date=new Date(Number(date));
      res.json({unix: long_date.getTime(),
        utc: long_date.toUTCString()});
    }
  } else {
    var new_date=new Date();
      res.json({unix: new_date.getTime(),
      utc: new_date.toUTCString()});
  }
});

// your first WhoAmI API endpoint... 
app.get("/api/whoami", function (req, res) {
  res.json({ipaddress: req.connection.remoteAddress,
  language: req.headers["accept-language"],
  software: req.headers["user-agent"]});
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
