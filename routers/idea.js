const express = require("express");
const router = express.Router();
const { isloggedin, validateIdea } = require("../middleware.js");
const Idea = require("../model/idea.js");


router.get("/",isloggedin, (req,res) =>{
    res.render("./user/ideaPage.ejs");
})

router.post("/",validateIdea, isloggedin, async (req,res) =>{
    console.log("hello");
    let { name, phoneNumber, email, description } = req.body;

    // let user =await User.findById(req.user._id);
    let newidea = new Idea({name, phoneNumber, email, description});
    await newidea.save();
    res.json({status : "200", message : "idea summited"})

})

module.exports = router;