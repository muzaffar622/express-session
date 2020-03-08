import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import { notFound, errorHandler } from "./src/middlewares/errorHandlers";
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
    res.status(200).json({ data: encode });
  } catch (err) {
    console.log(`ERROR ${err}`);
    next();
  }
});

app.get("/api/decode", async (req, res, next) => {
  const { search } = req.query;
  var sess = req.session;
  try {
    var newS = null;
    if (search in sess) newS = search;
    else throw new Error(`NOT FOUND`);
    const decode = await decodeToken(newS);
    res.json({ data: decode });
  } catch (err) {
    console.log(`ERROR ${err}`);
    next();
  }
});

app.delete("/api/destroy", (req, res, next) => {});

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`sarver is running at localhost:${PORT}`);
});
