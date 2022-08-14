const express = require('express');
const app = express();
const imagens_route = require("./routes/imagens")
const morgan = require("morgan")

app.use(morgan("dev"))
app.use(express.urlencoded({ extends: false }))
app.use(express.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Header',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});
    }
    next();
});

app.use("/pics", imagens_route);

app.use((req, res, next)=>{
	const error = new Error("Não encontrado")
	
	error.status = 404;
	next(error)
	
	})
	
app.use((error, req, res, next)=>{
	res.status(error.status || 500)
	res.send({
			"error":error.message
	
		})
	
	})

module.exports = app;
