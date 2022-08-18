const mysql = require("../../mysql").pool;

exports.deleteImage = (req, res, next) => {
  if (req.body.image_id == null)
    return res.status(500).send({ erro: `Missing param image_id` });

  mysql.getConnection((error, conn) => {
    if (error) return res.status(500).send({ error: error });

    conn.query(
      "SELECT * FROM `imagens` WHERE image_id=?",
      [req.body.image_id],
      (erro, result, field) => {
        if (erro) {
          conn.release();
          return res.status(500).send({ error: erro });
        }
        if (result.length == 0) {
          conn.release();
          return res.status(500).send({ error: "Null object!" });
        }
        conn.query(
          "DELETE FROM `imagens` WHERE image_id=?",
          [req.body.image_id],
          (erro, result, field) => {
            conn.release();
            if (erro) return res.status(500).send({ error: erro });

            res.status(202).send({
              response: {
                mensagem: "Deleted sucess!",
              },
            });
          }
        );
      }
    );
  })
}
  