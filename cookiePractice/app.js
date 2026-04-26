const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");

app.use(cookieParser("secretCode"));
app.use(flash());

const sessionOptions = {
  secret: "secretsession",
  resave: false,
  saveUninitialized: true,
};

app.use(session(sessionOptions));

// app.get("/", (req, res) => {
//   console.dir(req.signedCookies);
//   res.send("Hello");
// });

app.get("/session", (req, res) => {
  res.send("cookie");
});

app.listen("3000", (req, res) => {
  console.log(`app is listening on port 3000`);
});
