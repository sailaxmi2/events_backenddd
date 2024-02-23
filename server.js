const express = require('express');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const nodeMailer = require('nodemailer');
const app = express();

app.use(bodyParser.json());

// Middleware to handle CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://msvsmrsevent.in'); // Replace with your React.js app's URL
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

const sendEmail = (to, subject, text) => {
  const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sachieventsmarketing@gmail.com',
      pass: 'njadnczlsxcphdva',
    },
  });

  const mailOptions = {
    from: 'sachieventsmarketing@gmail.com',
    to: to,
    subject: subject,
    html: text, // Use HTML instead of plain text
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

app.post('/generateUniqueNumber', (req, res) => {
  const data = req.body;
  const uniqueNumber = crypto.randomBytes(3).toString('hex').toUpperCase();
  console.log(`Received Email: ${data.email}`);

  const emailMessage = `
    <html>
      <body>
        <p>Hi ${data.name},</p>
        <p>You have successfully registered for the Women's Day Event scheduled on ${data.Eventdate}.</p>
        <p>Your unique ID is<Strong> ${uniqueNumber}</Strong>. We look forward to having you at the event!</p>
        <p>Best Regards,<br/>Sachi Events</p>
      </body>
    </html>
  `;

  sendEmail(data.email, 'Sachi Events - Registration Confirmation', emailMessage);

  res.header('Access-Control-Allow-Origin', 'https://msvsmrsevent.in'); // Repeat CORS headers in the response
  res.header('Access-Control-Allow-Credentials', 'true');
  res.json({ uniqueNumber, email: data.email });
});

app.get('/', (req, res) => {
  res.send('Helloo, World!');
});

app.listen(4000, () => {
  console.log('Server started http://localhost:4000');
  console.log('Server Started!');
});
