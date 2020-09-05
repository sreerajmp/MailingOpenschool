var express = require('express');
var app = express();
const path = require('path');
var nodemailer = require('nodemailer');
const bodyParser = require("body-parser") 
app.use(bodyParser.urlencoded({ 
  extended:false
}));
// View engine setup 
app.set('view engine', 'ejs'); 

app.get('/', function (req, res) { 
  res.sendFile(path.join(__dirname+'/mailing.html'));
});
app.post("/mailThem",function (req, res)
 {
  responses = {
     request:req.body
  };  
  console.log(req.body);
  sendMailTo(req,res)
  // res.end(`<h1>${sendMailTo(req,res)}</h1>`)  
})
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
 var sendMailTo=function(req,res){
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: req.body.name_field,
      pass: req.body.password
    }
  });
  var mailOptions = {
    from: req.body.name_field,
    bcc: req.body.toMail,
    subject: req.body.subject,
    // text: mailText,
   html: `<h1>Welcome</h1><p>${req.body.body}</p>`
  };
  
  transporter.sendMail(mailOptions,async function(error, info){
      if (error) {
        console.log(error);
        // res.sendFile(path.join(__dirname+'/mailing.html'),{info:error});
        res.render('result',{info:error});
      } else {
        console.log('Email sent: ',info);
        // res.sendFile(path.join(__dirname+'/mailing.html'),{info:info});
        res.render('result',{info:info});
      }
    });
}

