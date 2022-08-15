const http = require("http");
const app = require("./app");
const port = process.env.MYSQL_APP_PORT || 3000;
const server = http.createServer(app);
server.listen(port);
