const express = require("express");
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const ListingSchema = require("../schema.js");
const ExpressErr = require("../utils/ExpressErr.js");

const router = express.Router();

// Validation middleware
const validateListing = (req, res, next) => {
    console.log(ListingSchema);
    const { error } = ListingSchema.validate(req.body);
    if (error) {
        const errMsg = error.details.map(el => el.message).join(",");
        throw new ExpressErr(400, errMsg);
    } else {
        next();
    }
};



// INDEX ROUTE
router.get("/", wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
}));

// NEW ROUTE
router.get("/new", (req, res) => {
    res.render("listings/new.ejs");
});

// CREATE ROUTE ..
router.post("/",validateListing, wrapAsync(async (req, res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    req.flash("success" , "New Listing is created !");
    res.redirect("/listings");
}));

// SHOW ROUTE
router.get("/:id", wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    if(!listing){
        req.flash("error" , "Listing you requested for does not exist");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
}));

// EDIT ROUTE
router.get("/:id/edit", wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error" , "Listing you requested for does not exist");
        res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
}));

// UPDATE ROUTE ..
router.put("/:id",validateListing, wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success" , "Listiing is Updated");
    res.redirect(`/listings/${id}`);
}));

// DELETE ROUTE
router.delete("/:id", wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success" , " Listing Deleted!");
    res.redirect("/listings");
}));



//  module.exports = router;
module.exports = router;