const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const catRouter = require("./routes/cat-router");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use("/api/v1", catRouter);

const uri = process.env.MONGODB_URI;

const clientOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

async function connectDb() {
  try {
    await mongoose.connect(uri, clientOptions);
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
  }
}

app.listen(PORT, async () => {
  await connectDb();
  console.log(`Server running on http://localhost:${PORT}`);
});
