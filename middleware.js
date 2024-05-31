const Expresserror = require("./utils/expressError.js")
const Review = require("./model/idea.js");
const Idea = require("./model/idea.js");
const { ideaSchema } = require("./schema.js");

module.exports.isThisAdmin = async(req,res,next) =>{
    let email = req.user.email;
    let adminSecret =process.env.ADMIN_SECRET;
    console.log(email);
    console.log(adminSecret);
    console.log(process.env.ADMIN_SECRET);
    
    if(!(email && email===adminSecret)){
        req.logout((e) => {
            if (e) {
                return next(e);
            }
            else {res.json({ status: 200, message: "try again as admin login credentials!" })};
        });
    } else{
        next();
    }
    
}

module.exports.isloggedin = async (req,res,next) =>{
    // console.log(req.path, "mm" ,req.originalUrl );
    if(!req.isAuthenticated()){
        req.session.redirectUrl= req.originalUrl;
        req.flash("error","You must be logged in to required task");
        res.redirect("/login");
    }else{
         // console.log("YES");
    // req.session.curUser = req.user._id;
        next();
    }
   
    
}

module.exports.validateIdea = async (req, res, next) => {
    let { error } = ideaSchema.validate(req.body);
    if (!error) {
        console.log(error);
        res.json({status : 500, message : "Provide all required answer to summit your idea!"});
    }
    else {
        next();
    }
};