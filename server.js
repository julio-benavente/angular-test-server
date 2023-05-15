const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

// Middlewares
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));
app.use(cors());

// Routes
// const auth = require("./routes/auth/auth");
// const products = require("./routes/api/products");

// app.use("/api/products", products);
// app.use("/auth", auth);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Database connection
const db = process.env.LOCAL_MONGO_DB;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((e) => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const port = process.env.PORT || 4423;

// App connection
app.listen(port, () => {
  console.log(`Server running on port ${port} `);
});
