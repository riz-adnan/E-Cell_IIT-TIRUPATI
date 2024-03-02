const express = require("express");
const app = express();
const mongoose = require("mongoose");

main()
    .then(res => {
        console.log("connection successful!");
    })
    .catch(err => {
        console.log(err)
    });

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
}
app.get("/", (req,res) =>{
    res.send("hello");
})
app.listen(8080, () => {
    console.log("server is listening at port 8080");
});
