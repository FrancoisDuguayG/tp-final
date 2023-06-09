var createError = require("http-errors");
var express = require("express");
var mongoose = require("mongoose");
var path = require("path");
var cookieParser = require("cookie-parser");
const cors = require('cors')

var indexRouter = require("./routes/index");
var loginRouter = require("./routes/login");
var itemsRouter = require("./routes/items");
var logoutRouter = require("./routes/logout");
var favoriteRouter = require("./routes/favorites");

// connect to mongo Atlas
const mongoUser = "francoisduguayg";
const mongoPassword = "lCQRFbyTXAsquWcv";

const url =
"mongodb+srv://francoisduguayg:lCQRFbyTXAsquWcv@cluster0.bgsxhqy.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(url, { useNewUrlParser: true });
const con = mongoose.connection;
try {
  con.on("open", () => {
    console.log("connected to mongo");
  });
} catch (error) {
  console.log("Error: " + error);
}

var app = express();
const corsOptions = {
  origin: '*',
  methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'UPDATE'],
  credentials: true
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors(corsOptions))


app.use("/", indexRouter);
app.use("/", loginRouter);
app.use("/items", itemsRouter);

app.use(function(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).json({ error: 'No credentials sent!' });
  }
  next();
});

app.use("/", logoutRouter);
app.use("/favorites", favoriteRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : err;

  res.status(err.status || 500);
  res.send();
});

// let PORT = 8080;
// app.listen(process.env.PORT || PORT, () => {
//   console.log(`Running on port ${PORT}`);
// });

module.exports = app;