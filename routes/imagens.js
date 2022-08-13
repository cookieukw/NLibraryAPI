const express = require("express");
const rot = express.Router();

rot.get("/",(req, res, next)=>{
	res.status(200).send({
		mensagem:"uh ha ha ha"
		})
	})
	
	rot.post("/",(req, res, next)=>{
	res.status(200).send({
		mensagem:"uh hu hu hu"
		})
	})
	
	module.exports = rot;
