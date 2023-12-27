const express = require("express");
const app = express();
const path = require('path');
const mongoose = require('mongoose');

// Ensure you replace the MongoDB connection string with the correct one
mongoose.connect('mongodb://0.0.0.0/rph', { useNewUrlParser: true, useUnifiedTopology: true });

var conn = mongoose.connection;

conn.on('connected', function() {
    console.log('Database is connected successfully');
});

conn.on('disconnected', function() {
    console.log('Database is disconnected');
});

var bodyParser = require('body-parser');

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Added for URL-encoded data

const reviewSchema = new mongoose.Schema({
    name: String,
    contact: String,
    email: String,
    city: String,
    thana: String,
    rating : String,
    feedback : String,
    issue: String,
    // date: Date.now
});

// Renamed the model for clarity
const Review = mongoose.model('Review', reviewSchema);

app.get("/", (req, res) => {
    res.sendFile(__dirname+ "/views/form.html"); // Using the direct view name
});

app.post("/post", (req, res) => {
    var myData = new Review(req.body);
    console.log(req.body);
    myData.save()
        .then(() => {
            res.sendFile(__dirname+"/views/uploaded.html");
        })
        .catch((err) => {
            console.error(err);
            res.send("Failed to save the data. Please try again.");
        });
});

app.get("/feed",async(req,res)=>{
    const items = await Review.find();
    res.render("feed",{items:items});
})

app.get("/chatbot",(req,res)=>{
    res.render("chatbog");
})

app.listen(3000, () => {
    console.log("Server started on http://localhost:3000");
});
