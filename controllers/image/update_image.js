const mysql = require("../../mysql").pool;

exports.updateImage = (req, res, next) => {
  if (req.body.image_url == null)
    return res.status(500).send({ erro: `Missing param image_url` });
  if (req.body.image_category == null)
    return res.status(500).send({ erro: `Missing param image_category` });
  if (req.body.image_id == null)
    return res.status(500).send({ erro: `Missing param image_id` });

  mysql.getConnection((error, conn) => {
    if (error) return res.status(500).send({ error: error });
    conn.query(
      `UPDATE imagens SET image_url = ?, image_category = ? WHERE image_id = ?`,
      [req.body.image_url, req.body.image_category, req.body.image_id],
      (erro, result, field) => {
        conn.release();
        if (erro) return res.status(500).send({ error: erro });

        res.status(202).send({
          response: {
            mensagem: "Updated sucess!",
          },
        });
      }
    );
  });
}