const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./reviewing.js");

  

  const ListingSchema = new Schema({
    title: {
        type:String ,
        required : true
    } ,
    description: {
        type : String ,
        default : "https://unsplash.com/photos/a-woman-with-an-umbrella-walking-in-front-of-a-tall-building-r_B-PH38vis ",
        set: (v) => v=== ""? "https://media.istockphoto.com/id/1065511492/photo/…20&c=0bfRsw5q3NqyY0ugjj3h1OAAmI4Nw4dLCX23cK2zpUU=" : v 
    } ,
    image : String ,
    price : Number ,
    location: String ,
    country : String ,

    reviews : [
       {type : Schema.Types.ObjectId ,
       ref : "Review"}
    ]
  })
  
  ListingSchema.post("findOneAndDelete" , async(listing)=>{
    if(listing){
      await Review.deleteMany({_id: {$in: listing.reviews}});
    }
    
  })

  const Listing = mongoose.model("Listing" , ListingSchema);
   module.exports = Listing;