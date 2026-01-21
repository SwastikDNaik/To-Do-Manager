const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");


dotenv.config({ quiet: true });



const connectDB = require("./db");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));





app.get("/", (req, res) => {
  res.send("Backend is running");
});

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();

