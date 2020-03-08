import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import { ErrorHandler, error } from "./src/middlewares/errorHandlers";
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
    const encoded = await encodeToken(data, process.env.TOKEN_SECRET);
    sess[encoded] = true;
    res.status(200).json({ data: encoded });
  } catch (err) {
    console.log(`ERROR ${err}`);
    next();
  }
});

app.get("/api/decode", async (req, res, next) => {
  const { search } = req.query;
  var sess = req.session;
  try {
    var included = null;
    if (search in sess) included = search;
    else throw new ErrorHandler(404, `NOT FOUND`);
    const decoded = await decodeToken(included);
    res.json({ data: decoded });
  } catch (err) {
    console.log(`ERROR ${err}`);
    next();
  }
});

app.delete("/api/destroy", (req, res, next) => {
  const { data } = req.body;
  var sess = req.session;

  try {
    var included = null;
    if (data in sess) included = data;
    else throw new ErrorHandler(404, `NOT FOUND`);
    delete sess[included];
    console.log("ses", sess);
    res.json({ message: `SUCCESS` });
  } catch (err) {
    console.log(`ERROR ${err}`);
    next();
  }
});

app.use((req, res) => {
  throw new ErrorHandler(404, "NOT FOUND");
});

app.use((err, req, res, next) => {
  error(err, res);
});

app.listen(PORT, () => {
  console.log(`sarver is running at localhost:${PORT}`);
});
