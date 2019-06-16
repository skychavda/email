const express = require('express');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');

const app = express();

app.use(cors());

sgMail.setApiKey('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');

app.get('/send-email', (req, res) => {
  const msg = {
    to: 'webcubetech.contact@gmail.com',
    from: req.query.sender,
    subject: req.query.subject,
    text: req.query.message,
  };
  sgMail.send(msg).then((msg)=>{
    console.log(msg);
  });
});
