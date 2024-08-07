const express = require("express");
const reviewSchema=require('../reviewSchema.js');
const ExpressErr = require("../utils/ExpressErr.js");
const wrapAsync = require("../utils/wrapAsync.js");
const router = express.Router( { mergeParams: true });
const Listing = require("../models/listing.js");
const Review  = require("../models/reviewing.js");
// Revewie Schema
const validateReview = (req,res,next)=>{
    const {error} = reviewSchema.validate(req.body);
    if(error){
        const errMsg = error.details.map(el => el.message).join(",");
        throw new ExpressErr(400 , errMsg);
    }
    else{
        next();
    }
}

// Post a review

router.post("/" ,validateReview, wrapAsync(async(req,res)=>{
    console.log(req.params.id,"........");
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);

    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success" , "New review is created!")
    res.redirect(`/listings/${listing._id}`);
} )
)  

// Delete Review Route

router.delete("/:reviewId" ,wrapAsync(async(req,res)=>{
       let {id , reviewId} = req.params ;
       await Listing.findByIdAndUpdate(id ,{$pull : {reviews :reviewId}});
       await Review.findByIdAndDelete(reviewId);
       req.flash("success" , "Review Deleted!")
       res.redirect(`/listings/${id}`);
 })
)

module.exports = router;