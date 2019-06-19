const express = require('express');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');
const PORT = process.env.PORT || 3000;
const nodemailer = require("nodemailer");

const app = express();

app.use(cors());

sgMail.setApiKey('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');

app.get('/', (req, res) => {
  res.send('Server is running');
})

app.get('/send-email', async (req, res) => {
  const msg = {
    to: 'webcubetech.contact@gmail.com',
    from: req.query.sender,
    subject: req.query.subject,
    text: req.query.message,
  };
  sgMail.send(msg).then((msg) => {
    console.log(msg);
  });

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'skychavda9@gmail.com',
      pass: 'bqcm2059KS'
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: req.query.sender, // sender address
    to: 'skychavda9@gmail.com', // list of receivers
    subject: req.query.subject, // Subject line
    text: req.query.message, // plain text body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

});

app.listen(PORT, () => console.log(`running on port ${PORT}`));
