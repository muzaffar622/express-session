import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";

dotenv.config();
const app = express();

app.use(bodyParser.json());

const PORT = 3000;

app.get("/", (req, res, next) => {});

app.post("/", (req, res, next) => {});

app.delete("/", (req, resd, next) => {});

app.listen(PORT, () => {
  console.log(`sarver is running at localhost:${PORT}`);
});
