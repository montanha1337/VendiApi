 import nodemailer from "nodemailer"
 
module.exports = (email, nome, mensagem) => {
// async..await is not allowed in global scope, must use a wrapper
    async function main() {
      // Generate test SMTP service account from ethereal.email
      // Only needed if you don't have a real mail account for testing
      let testAccount = await nodemailer.createTestAccount();
    
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
      let info = await transporter.sendMail({
        from: '"Vendi" <vendi.api@gmail.com>', // sender address
        to: email, // list of receivers
        subject: nome, // Subject line
        text: mensagem, // plain text body
      });
      return info.messageId
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com
    }
    
    main().catch(console.error)}