const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const ownerRoutes = require("./routes/ownerRoutes");
const veterinarianRoutes = require("./routes/veterinarianRoutes");
const petRoutes = require("./routes/petRoutes");

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/6-7";

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/owners", ownerRoutes);
app.use("/veterinarians", veterinarianRoutes);
app.use("/pets", petRoutes);

app.get("/", (req, res) => {
  res.redirect("/pets");
});

app.use((req, res) => {
  res.status(404).render("error", {
    title: "Page not found",
    message: "The page could not be found."
  });
});

mongoose
  .connect(MONGO_URI, {
    serverSelectionTimeoutMS: 5000
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Could not connect to MongoDB:", error.message);
  });
