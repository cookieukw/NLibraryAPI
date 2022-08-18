const mysql = require("../../mysql").pool;

exports.getImages = (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) return res.status(500).send({ error: error });

    conn.query("SELECT * FROM `imagens`", (erro, result, field) => {
      conn.release();
      if (erro) return res.status(500).send({ error: erro });

      res.status(200).send({
        size: result.length,
        response: result,
      });
    });
  });
}