const http = require("http");
const express = require("express");
const app = express();
const imagens_route = require("./routes/imagens");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();
const username = process.env.mongo_username
const password = process.env.mongo_password
const url = process.env.mongo_url
const auth = `mongodb+srv://${username}:${password}${url}`
const port = process.env.mongo_port

app.use(morgan("dev"));
app.use(express.urlencoded({ extends: true }));
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Header",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).send({});
  }
  next();
});

app.use("/pics", imagens_route);

app.use((req, res, next) => {
  const error = new Error("Não encontrado");

  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.send({
    error: error.message,
  });
});

mongoose.connect(auth)
.then(()=>{
	console.log("certissimo")
	app.listen(port, "0.0.0.0")
	})
.catch((err)=>{
	console.log(err)
})
