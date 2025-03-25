const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const authRoutes = require('./models/auth');

const MONGO_URL = "mongodb://127.0.0.1:27017/RoyalBites";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));
app.use('/auth',authRoutes),
app.use(express.json());

app.get("/", (req, res) => {
  res.render("listings/index.ejs");
});

app.get('/login', (req, res) => {
  res.render("login");  
});

app.get('/signup', (req, res) => {
  res.render("signup"); 
});


app.get("/listings", async (req, res) => {
  try {
    const listings = await Listing.find(); // Fetch all listings from the database
    res.render("listings/index", { listings });
  } catch (err) {
    console.log(err);
    res.send("Error fetching listings");
  }
});


// Route to handle "Book a Table" click
app.get('/listings/book-a-table', (req, res) => {
  res.render("listings/book-a-table.ejs");
});

app.post("/book-a-table", (req, res) => {
  const { name, phone, date } = req.body;
  // Here, you can process the data (e.g., store it in the database)
  console.log("Booking Details:", name, phone, date);
  res.send("Your table has been booked!");
});



app.listen(8000, () => {
  console.log("server is listening to port 8000");
});