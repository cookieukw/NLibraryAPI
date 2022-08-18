const mysql = require("../../mysql").pool;
const { v4: uuidv4 } = require("uuid");

exports.postImage = (req, res) => {
  if (req.body.image_url == null)
    return res.status(500).send({ erro: `Missing param image_url` });
  if (req.body.image_category == null)
    return res.status(500).send({ erro: `Missing param image_category` });

  mysql.getConnection((error, conn) => {
    if (error) return res.status(500).send({ error: error });

    conn.query(
      `INSERT INTO imagens (image_id, image_url, image_category) VALUES(?, ?, ?)`,
      [uuidv4(), req.body.image_url, req.body.image_category],
      (erro, result, field) => {
        conn.release();
        if (erro) return res.status(502).send({ error: erro });
        console.log(result);
//*
        res.status(200).send({
          response: {
            mensagem: "Send sucess!",
            id: result.insertId,
          }
        });//*
      });
  });
}
  
