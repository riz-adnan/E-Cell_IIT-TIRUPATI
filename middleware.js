

module.exports.isThisAdmin = async(req,res,next) =>{

    // let { id } = req.params;
    // let listingDetail = await Listing.findById(id);
    // console.log(listingDetail.owner);
    // if (!listingDetail.owner.equals(res.locals.curUser._id)) {
    //     req.flash("error","You don't have permission");
    //     return res.redirect(`/listings/${id}`);
    // }
    next();
}