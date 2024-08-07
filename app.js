// const express = require("express");
// const mongoose = require("mongoose");
// const path = require("path");
// const methodOverride = require("method-override");
// const ejsmate = require("ejs-mate");
// const ExpressErr = require("./utils/ExpressErr.js");

// const app = express();
// const listingsRouter = require("./routes/listing.js");
// const reviewRouter = require("./routes/review.js");
// const userRouter = require("./routes/user.js");
 
// const session = require("express-session");
// const flash  = require("connect-flash");
// const passport = require("passport");
// const localStrategy = require("passport-local");
// const User = require("./models/user.js");
// // Middleware setup
// app.use(express.urlencoded({ extended: true }));
// app.use(methodOverride("_method"));
// app.engine("ejs", ejsmate);
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));
// app.use(express.static(path.join(__dirname, "/public")));



// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

//   const sessionOption = {
//      secret: "supersecretCode",
//     resave : false ,
//     saveUninitialized : true,
//     cookie : {
//         expires : Date.now() + 7*24*60*60*1000,
//         maxAge : 7*24*60*60*1000,
//         httpOnly : true
//     }
//   };

// // Database connection
// async function main() {
//     await mongoose.connect('mongodb://127.0.0.1:27017/wanderLust', {
//     });
//     console.log("DB is connected");
// }

// main().catch(err => console.log(err));

// // Define port
// const port = 8080;

// // Root route
// app.get("/", (req, res) => {
//     res.send("You are on the root directory");
// });

// app.use(session(sessionOption));
// app.use(flash());
// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new localStrategy(User.authenticate()));

//  app.use((req,res,next)=>{
//     res.locals.success  = req.flash("success");
//     res.locals.error = req.flash("error");

//     next();
//  });

//  app.get("/demoUser",async(req,res)=>{
//     let fakeUser = new User({
//         email :"student@gmail.com",
//         username : "student"
//     })
//     let registerUser =  await  User.register(fakeUser,"HelloWorld");
//     res.send(registerUser);
//  }) ;


// app.use("/listings",listingsRouter);
// app.use("/listings/:id/reviews" ,reviewRouter );
// app.use("/",userRouter);


// // 404 ROUTE
// app.all("*", (req, res, next) => {
//     next(new ExpressErr(404, "Page not found"));
// });

// // ERROR HANDLING MIDDLEWARE
// app.use((err, req, res, next) => {
//     const { statusCode = 500, message = "Some error" } = err;
//     res.status(statusCode).render("listings/error.ejs", { err });
// });


// // Start the server
// app.listen(port, () => {
//     console.log(`App is listening on port ${port}`);
// });



const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsmate = require("ejs-mate");
const ExpressErr = require("./utils/ExpressErr.js");
const app = express();
const listingsRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
 
const session = require("express-session");
const flash  = require("connect-flash");
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/user.js");

// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsmate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "/public")));

  const sessionOption = {
     secret: "supersecretCode",
    resave : false ,
    saveUninitialized : true,
    cookie : {
        expires : Date.now() + 72460601000,
        maxAge : 72460601000,
        httpOnly : true
    }
  };

// Database connection
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderLust', {
    });
    console.log("DB is connected");
}
main().catch(err => console.log(err));

// Define port
const port = 8080;

// Root route
app.get("/", (req, res) => {
    res.send("You are on the root directory");
});

app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

 app.use((req,res,next)=>{
    res.locals.success  = req.flash("success");
    res.locals.error = req.flash("error");

    next();
 });

 app.get("/demoUser",async(req,res)=>{
    let fakeUser = new User({
        email :"student@gmail.com",
        username : "student"
    })
    let registerUser =  await  User.register(fakeUser,"HelloWorld");
    res.send(registerUser);
 }) ;


app.use("/listings",listingsRouter);
app.use("/listings/:id/reviews" ,reviewRouter );
app.use("/",userRouter);


// 404 ROUTE
app.all("*", (req, res, next) => {
    next(new ExpressErr(404, "Page not found"));
});

// ERROR HANDLING MIDDLEWARE
app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Some error" } = err;
    res.status(statusCode).render("listings/error.ejs", { err });
});


// Start the server
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
