const express = require("express");
const router = express.Router();
const passport = require("passport");
// const sendMail = require("../utils/nodeMailer.js");
const { isThisAdmin } = require("../middleware.js");

router.get("/login", (req, res) => {
    if (!req.user) {
        res.render("./user/adminLogin.ejs");
    }
    else {
        res.json({ status: 200, message: "You are already loggedin!" })
    }
});

router.post("/login", passport.authenticate("local", {
    // failureFlash: true,
    failureRedirect: "login",
}), isThisAdmin, async (req, res) => {
    
    res.json({ status: 200, message: "successfully logged in Adminbhai!" });
});

router.get("/logout", (req, res) => {
    if (req.user) {
        req.logout((e) => {
            if (e) {
                return next(e);
            }
            else {res.json({ status: 200, message: "admin logged out successfully!" })};
        });
    }
    else {
        res.json({ status: 200, message: "logged out already!" });
    }
})

module.exports = router;