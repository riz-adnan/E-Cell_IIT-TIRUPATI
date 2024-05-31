const express = require("express");
const router = express.Router();
const User = require("../model/user.js");
const Event = require("../model/event.js");
const passport = require("passport");
const sendMail = require("../utils/nodeMailer.js");
const { isloggedin } = require("../middleware.js");

//*******User************/
router.get("/login", (req, res) => {
    console.log(req.user);
    if (!req.user) {
        res.render("./user/login.ejs");
    }
    else {
        res.json({ status: 200, message: "You are already loggedin!" })
    }
});

router.get("/signup", (req, res) => {
    if (!req.user) { res.render("./user/signup.ejs"); }
    else {
        res.json({ status: 200, message: "already signed up!" });
    }
})
router.post("/login", passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
}), async (req, res) => {
    res.json({ status: 200, message: "successfully logged in!" });
});


let confirmations = {};
router.post("/signup", async (req, res) => {
    console.log(req.body);
    try {
        await User.deleteMany({ verified: false });
        if (!req.user) {
            let { name, username, email, password } = req.body;
            const newuser = new User({ email, name, username });
            const registeredUser = await User.register(newuser, password);
            req.login(registeredUser, async (err) => {
                if (err) {
                    next(err);
                }

                console.log(registeredUser);
                req.session.confirmationEmail = email;
                confirmations = await sendMail(req, res);

                req.session.confirmationCode = confirmations[email];
                console.log(confirmations[email]);
                res.render("./user/verify.ejs");
                // res.json({ status: 500, message: "successfully code send!" });
            })
            // req.flash("success", "Welcome to E-Cell!");


        }
        else { res.json({ status: 200, message: "already signed up!" }); }
    }
    catch (e) {
        res.send(e.message);
    }
});


router.get("/logout", (req, res) => {
    if (req.user) {
        req.logout((e) => {
            if (e) {
                return next(e);
            }
            else {res.json({ status: 200, message: "logged out successfully!" })};
        });
    }
    else {
        res.json({ status: 200, message: "logged out already!" });
    }
})

// Route to verify confirmation code
router.post('/verify-confirmation-code', async (req, res) => {
    const { code } = req.body;
    const email = req.session.confirmationEmail;
    const confirmationCode = req.session.confirmationCode;
    console.log(email);
    console.log(confirmationCode);
    console.log(code);
    if (confirmationCode && confirmationCode === code) {
        // Confirmation code matches
        // Mark email as confirmed in your database
        console.log(req.user._id);
        await User.findByIdAndUpdate(req.user._id, { verified: true });
        console.log("Email confiremed successfully!");
        res.send('Email confirmed');
    } else {
        // Confirmation code does not match
        res.status(400).send('Invalid confirmation code');
    }
});

router.get("/event",isloggedin,async(req,res) =>{
    res.json({"status" : 200, "message" : "rendering all events for user"})
})

router.get("/event/:id", isloggedin, (req,res) =>{
    res.json({"status" : 200,"message" : "rendering particular event for user"})
})

router.post("/event/:eventid", isloggedin, (req,res) =>{
    let userid = req.user._id;
    let {eventid} = req.params;
    let user = User.findById(userid);
    let event = Event.findById(eventid);
    user.events.push(eventid);
    event.users.push(userid);
    res.json({"status" : 200,"message" : "rendering particular event for user"})
})

module.exports = router;