const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const blogs = require("./routes/blog");

const app = express();

mongoose
  .connect("mongodb://localhost/blog", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to MongoDB.."))
  .catch((err) => console.log("Clould not connect to mongodb"));

app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogs);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`App listening on PORT ${port}`));
