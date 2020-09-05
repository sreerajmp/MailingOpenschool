var express = require('express');
var app = express();
const path = require('path');
var nodemailer = require('nodemailer');
const bodyParser = require("body-parser") 
app.use(bodyParser.urlencoded({ 
  extended:false
}));
app.get('/', function (req, res) { 
  res.sendFile(path.join(__dirname+'/mailing.html'));
});
app.post("/mailThem",async function (req, res)
 {
  responses = {
     request:req.body
  };  
  console.log(req.body);
  let val= await sendMailTo(req.body.name_field,req.body.password,req.body.toMail,req.body.subject,req.body.body)
  res.end(`<h1>${val}</h1>`)  
})
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
 function sendMailTo(senderMail,senderPassword,toMail,mailSubject,mailText){
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: senderMail,
      pass: senderPassword
    }
  });
  var mailOptions = {
    from: senderMail,
    to: toMail,
    subject: mailSubject,
    text: mailText,
   html: `<h1>Welcome</h1><p>${mailText}</p>`
  };
  
  var x=transporter.sendMail(mailOptions,(error, info) => {
      if (error) {
        console.log(error);
        return error;
      } else {
        console.log('Email sent: ' + info.response);
        return info;
      }
    });
  console.log("x:",x)
  return x
}

