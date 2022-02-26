const Server = require('./core/Server');
const dotenv = require('dotenv');
dotenv.config();

const server = new Server();

server.listen();