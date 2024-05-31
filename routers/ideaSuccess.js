const express = require("express");
const router = express.Router();
const { isloggedin, validateIdea, isThisAdmin } = require("../middleware.js");
const Idea = require("../model/idea.js");
const IdeaSuccessfull = require("../model/ideaSuccess.js");


router.get("/", isloggedin,isThisAdmin, (req,res) =>{
    res.json({status : 200, message :"redering all ideas!"});
})

router.post("/:id",isloggedin, isThisAdmin,async (req,res) =>{
    let { id } = req.params;
    try {
        // Finding an Idea document by id
        let idea = await Idea.findById(id);
        // Logging the retrieved idea
        let successIdea = { 
            name : idea.name,
             phoneNumber: idea.phoneNumber,
             email : idea.email,
             description : idea.description
             } 
             console.log(successIdea);
        // Creating a new instance of IdeaSuccessfull using the retrieved idea data
        let newIdea = await new IdeaSuccessfull(successIdea);
        // Saving the new idea to the database
        await newIdea.save();
        // Sending a success response
        res.json({ status: "200", message: "Successful Idea saved" });
    } catch (error) {
        // If there's an error, sending an error response
        console.error("Error:", error);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }

})

module.exports = router;