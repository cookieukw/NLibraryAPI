const express = require("express");
const rot = express.Router();
const mysql = require("../mysql").pool;
const { v4: uuidv4 } = require("uuid")

rot.get("/",(req, res, next)=>{
	mysql.getConnection((error, conn)=>{
		if (error) return res.status(500).send({erro: error})
					
		conn.query(
			"SELECT * FROM `imagens`",
			(erro, result, field)=>{
				conn.release();
				if (erro) return res.status(500).send({erro: erro})
				
						res.status(200).send({
							size: result.length,
							response:result
		      })

					})
		})
	})
	
	
	
	
	rot.post("/",(req, res, next)=>{
	console.log(req.params)
	mysql.getConnection((error, conn)=>{
//		if (error) return res.status(500).send({erro: error})
					
		conn.query(
			`INSERT INTO\`imagens\`(\`image_id\`, \`image_url\`, \`image_category\`) VALUES('${uuidv4()}', ${req.body.image_url}, ${req.body.image_category})`,
			(erro, result, field)=>{
				conn.release();
				if (erro) return res.status(502).send({erro: erro})
						
		res.status(200).send({
		response:{
			mensagem:"enviado com sucesso",
			id: result.insertId
			}
			
	   	})
			})
		})
	})
	
	rot.delete("/",(req, res, next)=>{
		
	mysql.getConnection((error, conn)=>{
		if (error) return res.status(500).send({erro: error})
					
		conn.query(
			"DELETE FROM `imagens` WHERE image_id=?",
					[req.body.image_id],
			(erro, result, field)=>{
				conn.release();
				if (erro) return res.status(500).send({erro: erro})
					
		res.status(202).send({
		response:{
			mensagem:"deletado com sucesso",
			}
			
	   	})
			})
		})
	})
	module.exports = rot;
