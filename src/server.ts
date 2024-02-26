import dotenv from "dotenv";
// ALLOWS ENVIRONMENT VARIABLES TO BE SET ON PROCESS.ENV SHOULD BE AT TOP
dotenv.config();
import cors from "cors";
import express from "express";

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json()); // parse json bodies in the request object

app.get("/", async (req, res) => {
  res.status(200).send("<h1>What's up world</h1>");
});

// Listen on pc port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
