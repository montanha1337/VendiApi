import nodemailer from "nodemailer"
import http from 'http'
import querystring from 'querystring'
 var MailParser = require("mailparser").MailParser; // https://github.com/andris9/mailparser
 
async function email(email, nome, mensagem){
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, //SSL/TLS
        auth: {
            user: 'vendi.api@gmail.com',
            pass: 'Vendi123456'
        }
      });
    
      // send mail with defined transport object
      const info = await transporter.sendMail({
        from: '"Vendi" <vendi.api@gmail.com>', // sender address
        to: email, // list of receivers
        subject: nome, // Subject line
        text: mensagem, // plain text body
      });
      return ('Message sent successfully as '+info.messageId)
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com
    }


var server = http.createServer();
server.addListener('request', function(req, res) {
  var chunks = [];
  req.on('data', chunks.push.bind(chunks));
  req.on('end', function() {
    var mailparser = new MailParser();
    mailparser.on("end", function(mail_object) {

      // API for https://github.com/andris9/mailparser
      mail_object.from; // [ { address: 'sender@example.com', name: 'Sender Name' } ]
      mail_object.to;   // [ { address: 'example@mail2webhook.com', name: '' } ]
      mail_object.subject; // "Testing 1 2 3"
      mail_object.html;
      mail_object.text;
      console.log(mail_object.from, mail_object.to, mail_object.subject);
      console.log(mail_object);

      res.writeHead(200, {'content-type': 'text/plain'});
      res.end();
    });
    var params = querystring.parse(chunks.join("").toString());
    mailparser.write(params['message']);
    mailparser.end();
  });
});
    module.exports={email}