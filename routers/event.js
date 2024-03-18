const express = require("express");
const { user } = require("../model/user");
const Event = require("../model/event.js");
const mongoose = require("mongoose");

const { isThisAdmin } = require("../middleware");
const router = express.Router();

//************* for event**********/
//index route
router.get("", async (req, res) => {
    let events = await Event.find({});
    res.send(events);
});

//rendering for creating new event
router.get("/new", isThisAdmin, (req, res) => {
    res.json({ staus: 500, message: "add new event" });
})

// saving new event
router.post("", isThisAdmin, async (req, res) => {
    let eventData = new Event(req.body.event)
    eventData.owner = req.user._id;
    await eventData.save();
    console.log("saving event");
});

// editing event
router.get("/:id/edit", isThisAdmin, async (req, res) => {
    const { id } = req.params;
    const eventData = await Event.findById(id);
    res.send("Page for editing", { eventData });
})

// updating
router.put("/:id", isThisAdmin, async (req, res) => {
    let { id } = req.params;
    let eventData = req.body.event;
    await Event.findByIdAndUpdate(id, { ...eventData });
    console.log("updated");
})

//deleting
router.delete("/:id/delete", isThisAdmin, async (req, res) => {
    const { id } = req.params;
    let data = await Event.findByIdAndDelete(id);
    res.send(data);
})

module.exports = router;