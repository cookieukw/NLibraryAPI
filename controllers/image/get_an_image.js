const mysql = require("../../mysql").pool;

exports.getAnImage = (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) return res.status(500).send({ error: error });
    conn.query(
      `SELECT * FROM imagens WHERE image_id= ?`,
      [req.params.image_id],
      (erro, result, field) => {
        conn.release();
        if (erro) return res.status(500).send({ error: erro });

        res.status(202).send({
          response: result,
        });
      }
    );
  });
}