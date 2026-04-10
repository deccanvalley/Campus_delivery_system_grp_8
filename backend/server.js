require("dotenv").config();   // ✅ MUST BE FIRST

const express = require("express");
const connectDB = require("./config/db");

const app = express();

// connect database
connectDB();

// test route
app.get("/", (req, res) => {
  res.send("API is working 🚀");
});

// debug (optional)
console.log("URI:", process.env.MONGO_URI);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});