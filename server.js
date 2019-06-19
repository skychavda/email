const express = require('express');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');
const PORT = process.env.PORT || 3000;
const nodemailer = require('nodemailer');

const app = express();

app.use(cors());

sgMail.setApiKey('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');

app.get('/', (req, res) => {
  res.send('Server is running');
})

app.get('/send-email', (req, res) => {
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
  var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'skychavda9@gmail.com',
    pass: 'bqcm2059KS'
  }
});

var mailOptions = {
  from: req.query.sender,
  to: 'skychavda9@gmail.com',
  subject: req.query.subject,
  text: req.query.message
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
});

app.listen(PORT, () => console.log(`running on port ${PORT}`));
