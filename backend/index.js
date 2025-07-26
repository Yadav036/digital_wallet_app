// backend/index.js
const express = require('express');
const cors = require("cors");
const rootRouter = require("./routes/index");

const app = express();

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:3000"], 
    credentials: true
}));
  
app.use(express.json());

app.use("/api/v1", rootRouter);

app.listen(3000, "0.0.0.0", () => {
    console.log("Server running at http://localhost:3000");
  });
  