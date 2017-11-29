var express = require('express');
var router = express.Router();
var nodemailer = require("nodemailer");
var config = require("../config/config");
// signing into our account
var transport = {
	host: 'smtp.gmail.com',
	auth: {
		user: config.USER,
		pass: config.pass
	}
}
// uses nodemailer to transport the object we created
var transporter = nodemailer.createTransport(transport);
// make sure the server is running
transporter.verify((error,success)=>{
	if(error){
		console.log(error)
	}else{
		console.log("server is ready to take messages");
	}
})

/* GET home page. */
router.get('/', function(req, res, next) {
	var message = '';
	if(req.query.msg != undefined){
		message = req.query.msg;
	}
  res.render('index', {message:message});
});


router.post("/send", (req, res, next)=>{
	var email = req.body.email
	var content = req.body.message,
		name = req.body.name,
		phone = req.body.phone,
		finalMessage = `${content} \n\n phone: ${phone} \n email: ${email}`;
	var mail = {
		from: email,
		to: 'yunf.li37@gmail.com',
		subject: name,
		text: finalMessage
	}

	transporter.sendMail(mail, (error, data)=>{
		if(error){
			console.log(error);
			res.redirect("/?msg=Fail");
		}else{
			console.log("success");
			res.redirect("/?msg=Success");
		}
	});
});
module.exports = router;