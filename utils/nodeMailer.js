const express = require("express");
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const sendMail = async (req, res) => {
    // Setup Nodemailer
    console.log("check pada hai yaha pe",req.body)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.GMAIL_PASSKEY
        }
    });
    // Generate confirmation code
    function generateConfirmationCode() {
        return crypto.randomBytes(2).toString('hex');
    }

    // Database to store confirmation codes
    const confirmations = {};

    // Route to send confirmation email

        const { email } = req.body;
        console.log(email);

        const confirmationCode = generateConfirmationCode();
        confirmations[email] = confirmationCode;

        let mailDetails = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Email-Verificaion',
            html: `Your confirmation code is: ${confirmationCode}`
        }
        transporter.sendMail(mailDetails, function (err, data) {
            if (err) {
                console.log('Error Occurs', err);
            } else {
                console.log('Email sent successfully');
            }
        });
        return confirmations;
}
module.exports = sendMail;