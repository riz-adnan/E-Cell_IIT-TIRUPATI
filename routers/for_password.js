const express = require("express");
const frSendMail = require("../utils/forgot_nodeMailer");
const User = require("../model/user");
const router = express.Router();

router.get("", (req, res) => {
    res.render("./user/forgot.ejs");
})

router.post("", async (req, res) => {
    let { email } = req.body;
    console.log(email);
    req.session.useremail = email;
    console.log(req.session.useremail);
    let temp = await User.find({ email: email });
    console.log(temp);
    console.log("hello");
    if (temp.length > 0) {
        let code = await frSendMail(req, res);
        req.session.code = code;
        res.json({ status: 200, message: "Email-send" });
    }
    else {
        res.json({ message: "user does not exist" });
    }

})
router.get("/username-password/:id", (req, res) => {
    let { id } = req.params;
    req.session.conformationcode = id;
    try {
        if (id == req.session.code) {
            res.render("./user/credentials.ejs")
        }
        else {
            res.json({ message: "Invalid url" });
        }
    }
    catch (e) {
        res.send(e);
    }

})
router.post("/username-password", async (req, res) => {
    let { username, password } = req.body;
    console.log(username);
    console.log(password);
    console.log(req.session.useremail);
    console.log(req.session.code);
    if (req.session.conformationcode && req.session.code === req.session.conformationcode) {
        res.json({ status: 200, message: "username and password has been reset!" });
    }
    else {
        res.json({ message: "invalid access" });
    }
})
module.exports = router;