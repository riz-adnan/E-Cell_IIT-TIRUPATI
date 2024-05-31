const express = require("express");
const Event = require("../model/event.js");

const { isThisAdmin, isloggedin } = require("../middleware");
const router = express.Router();

//************* for event**********/
//index route
router.get("", async (req, res) => {
    let events = await Event.find({});
    res.json({"status" : 200, "message" : "rendering all events"})
});

//rendering for creating new event
router.get("/new",isloggedin ,isThisAdmin, async (req, res) => {
    res.json({ "staus": 500, "message": "add new event" });
})

// saving new event
router.post("", isloggedin, isThisAdmin, async (req, res) => {
    let eventData = new Event(req.body.event)
    eventData.owner = req.user._id;
    await eventData.save();
    console.log("saving event");
    res.json({ "staus": 500, "message": "added new event" });
});

// editing event
router.get("/:id/edit", isloggedin, isThisAdmin, async (req, res) => {
    try{
        const { id } = req.params;
        const eventData = await Event.findById(id);
        res.send(`Page for editing for ${eventData} `);
    }
    catch(e){
        res.json({status : 500, message : e});
    }
})

// updating
router.put("/:id",isloggedin, isThisAdmin, async (req, res) => {
    try{
        let { id } = req.params;
        let eventData = req.body.event;
        await Event.findByIdAndUpdate(id, { ...eventData });
        console.log("updated");
        res.json({ "staus": 500, "message": "event is updated" });
    }
    catch(e){
        res.json({status : 500, message : e});
    }
    
})

//deleting
router.delete("/:id/delete", isloggedin, isThisAdmin, async (req, res) => {
    const { id } = req.params;
    let data = await Event.findByIdAndDelete(id);
    res.json({"status" : 200, "message" : "event has been deleted by admin"})
})

module.exports = router;