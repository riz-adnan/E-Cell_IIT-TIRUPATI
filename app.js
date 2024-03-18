const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path= require("path");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User= require("./model/user.js");
const session = require("express-session");
const flash = require("connect-flash");
const Expresserror = require("./utils/expressErr.js");
const Event = require("./model/event.js")

const event = require("./routers/event.js");
const user = require("./routers/user.js");
const forgot = require("./routers/fr-password.js")

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));
app.use(express.urlencoded({ extended: true }));
// app.use(methodOverride("_method"));
// app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));
main()
    .then(res => {
        console.log("connection successful!");
    })
    .catch(err => {
        console.log(err)
    });
// session data storing in atlasdb
// const store = MongoStore.create({
//     mongoUrl : 'mongodb://127.0.0.1:27017/E-Cell',
//     crypto : {
//         secret : process.env.SECRET,
//     },
//     touchAfter : 24*3600,
// })

// store.on("error", () =>{
//     console.log("error in mongo session store", err);
// })

    const sessionOption ={
        // store,
        secret : "mysecret",
        resave : false,
        saveUninitialized  : true,
        cookie : {
            expires : Date.now() + 10*24*60*60*1000,
            maxAge : 10*24*60*60*1000,
            httpOnly : true
        }
    }
app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));//for sighin and sighup

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next) =>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    // res.locals.islogged = req.user;
    // res.locals.curUser = req.user;
    next();
});
// app.get("/demouser", async(req,res) =>{
//     let user1= new User({
//         name : "prakash",
//         email : "abc@iit.ac.in",
//         username : "abcdadsfg",
//     });
//     let regi_user= await User.register(user1, "password");
//     res.send(regi_user);
// })

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/E-Cell');
}
app.get("", (req,res) =>{
    res.send("home page");
})


app.use("/event", event);
app.use("/reset", forgot);
app.use("/", user);



app.all("*",(req,res,next) =>{
    next(new Expresserror(404,"Page Not Found!"));
});
app.use((err,req,res,next)=>{
    let {statusCode = 500, message = "something went wrong"} = err;
    res.status(statusCode).render("error.ejs",{err});
    // res.status(statusCode).send(message);
})

app.listen(8080, () => {
    console.log("server is listening at port 8080");
});
