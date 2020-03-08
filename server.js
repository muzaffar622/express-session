import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import { decodeToken, encodeToken } from "./src/decodeEncode";

const PORT = 3000;
dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 60000 }
  })
);

app.post("/api/encode", async (req, res, next) => {
  const { data } = req.body;
  var sess = req.session;
  try {
    const encode = await encodeToken(data, process.env.TOKEN_SECRET);
    sess[encode] = true;
    res.status(200).json(encode);
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/decode", async (req, res, next) => {});

app.delete("/api/destroy", (req, resd, next) => {});

app.listen(PORT, () => {
  console.log(`sarver is running at localhost:${PORT}`);
});
