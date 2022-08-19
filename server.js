const http = require("http");
const express = require("express");
const app = express();
const imagens_route = require("./routes/imagens");
const morgan = require("morgan");
const mongoose = require("mongoose");
const username = process.env.mongo_username || "cookieukw"
const password = process.env.mongo_password || encodeURIComponent("72A7wpGU8lBcEyoF")
console.log('username '+username)
console.log('pass '+password)

const uri = `mongodb+srv://${username}:${password}@cookiedb.beyogzf.mongodb.net/?retryWrites=true&w=majority`
console.log(uri)
const port = process.env.port || 3000
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

mongoose.connect(uri)
.then(()=>{
	console.log("certissimo")
	app.listen(port)
	})
.catch((err)=>{
	console.log(err)
})
