const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

app.post('/api/send-emailsignup', (req, res) => {
    const { userEmail, userName } = req.body;

    const additionalRecipients = 'nihalsarandasd@gmail.com,dei.shikhar@gmail.com,sajalsatsangi2004@gmail.com,anshprasad01@gmail.com';

    const emailRecipients = Array.isArray(userEmail) ? userEmail.join(',') : userEmail;
    const allRecipients = emailRecipients ? `${emailRecipients},${additionalRecipients}` : additionalRecipients;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: allRecipients,
        subject: 'SignUP Email',
        html: `<h1>Welcome to Seekho Buddy,${userName}!</h1>
               <p>Thank you for signing up. We're excited to have you on board!</p>
               <p>Kindly wait for the verification to complete </p>
               <p>You will be notified whenever the verification is done</p>
               <p>If you have any questions, please contact us at seekhobuddy@gmail.com </p>
               <p>Best regards,</p>
               <p>The Seekho Buddy Team</p>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Failed to send email');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully');
        }
    });
});

app.post('/api/send-emailverification', (req, res) => {
    const { userEmail, userName } = req.body;

    const additionalRecipients = 'nihalsarandasd@gmail.com,sajalsatsangi2004@gmail.com,anshprasad01@gmail.com,dei.shikhar@gmail.com';

    const emailRecipients = Array.isArray(userEmail) ? userEmail.join(',') : userEmail;
    const allRecipients = emailRecipients ? `${emailRecipients},${additionalRecipients}` : additionalRecipients;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: allRecipients,
        subject: 'Verification Email',
        html: `<p><span style="font-size: 18pt;">Hey, ${userName}!</span></p>
               <p><span style="font-size: 18pt;">Welcome to SeekhoBuddy!</span></p>
               <p>Your verification request has been approved. <span style="font-size: 14pt;"><strong>Congratulations!</strong></span></p>
               <p>Thank you for joining with us!.</p>
               <p>Best regards,<br>SeekhoBuddy Team</p>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Failed to send email');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully');
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
