const express = require("express");
const rot = express.Router();
const mysql = require("../mysql").pool;
const { v4: uuidv4 } = require("uuid")

rot.get("/",(req, res, next)=>{
	mysql.getConnection((error, conn)=>{
		if (error) return res.status(500).send({"error": error})
					
		conn.query(
			"SELECT * FROM `imagens`",
			(erro, result, field)=>{
				conn.release();
				if (erro) return res.status(500).send({"error": erro})
				
						res.status(200).send({
							size: result.length,
							response:result
		      })

					})
		})
	})
	
	
	
	
	rot.post("/",(req, res)=>{
	
	if (req.body.image_url == null)  return res.status(500).send({erro: `Missin param "image_url"`})
	if(req.body.image_category == null) return res.status(500).send({erro: `Missin param "image_category"`})
	
	
	mysql.getConnection((error, conn)=>{

if (error) return res.status(500).send({"error": error})
					
		conn.query(
			`INSERT INTO imagens (image_id, image_url, image_category) VALUES(?, ?, ?)`,
			[uuidv4(), req.body.image_url, req.body.image_category],
			(erro, result, field)=>{
				conn.release();
				if (erro) return res.status(502).send({"error": erro})
						
		res.status(200).send({
		response:{
			mensagem:"Send sucess!",
			id: result.insertId
			}
			
	   	})
			})
		})
	})
	
	rot.delete("/",(req, res, next)=>{
		if (req.body.image_id == null) return res.status(500).send({erro: `Missin param "image_id"`})
	
	mysql.getConnection((error, conn)=>{
		if (error) return res.status(500).send({"error": error})
		conn.query(
			"DELETE FROM `imagens` WHERE image_id=?",
					[req.body.image_id],
			(erro, result, field)=>{
				conn.release();
				if (erro) return res.status(500).send({"error": erro})
					
		res.status(202).send({
		response:{
			mensagem:"Deleted sucess!",
			}
			 })
			})
		})
	})
	
	rot.patch("/",(req, res, next)=>{
		if (req.body.image_url == null)  return res.status(500).send({erro: `Missin param image_url`})
  	if(req.body.image_category == null) return res.status(500).send({erro: `Missin param image_category`})
	 if(req.body.image_id == null) return res.status(500).send({erro: `Missin param image_id`})
	
	mysql.getConnection((error, conn)=>{
		if (error) return res.status(500).send({"error": error})
		conn.query(
			`UPDATE imagens SET image_url = ?, image_category = ? WHERE image_id = ?`,
					[req.body.image_url,
					req.body.image_category,
					req.body.image_id
					],
			(erro, result, field)=>{
				conn.release();
				if (erro) return res.status(500).send({"error": erro})
					
		res.status(202).send({
		response:{
			mensagem:"Updated sucess!",
			}
			 })
			})
		})
	})
	
	rot.get("/:image_id",(req, res, next)=>{
	
	mysql.getConnection((error, conn)=>{
		if (error) return res.status(500).send({"error": error})
		conn.query(
			`SELECT * FROM imagens WHERE image_id= ?`,
					[req.params.image_id],
			(erro, result, field)=>{
				conn.release();
				if (erro) return res.status(500).send({"error": erro})
					
		res.status(202).send({
		response: result
			 })
			})
		})
	})
	module.exports = rot;
