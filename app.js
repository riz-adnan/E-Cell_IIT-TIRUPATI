if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}
console.log('NODE_ENV:', process.env.NODE_ENV);  // Should log the current NODE_ENV value
console.log('ADMIN_SECRET:', process.env.ADMIN_SECRET);  // Should log the admin secret

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path= require("path");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User= require("./model/user.js");
const session = require("express-session");
const Expresserror = require("./utils/expressError.js");
const bodyParser = require('body-parser');

const event = require("./routers/event.js");
const user = require("./routers/user.js");
const forgot = require("./routers/for_password.js")
const admin = require("./routers/admin.js")
const idea = require("./routers/idea.js")
const ideaSuccessFull = require("./routers/ideaSuccess.js")

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
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

app.use(passport.initialize());
app.use(passport.session());
// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));//for sighin and sighup

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/E-Cell');
}
app.get("", (req,res) =>{
    res.send("home page");
})


app.use("/event", event);
app.use("/reset", forgot);
app.use("/admin", admin);
app.use("/user/idea", idea);
app.use("/ideas", ideaSuccessFull);
app.use("/", user);

// ReactDOM.render(<Loginuser/>, document.getElementById('react-root'));
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
