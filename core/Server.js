const express = require('express');
const env = process.env;

module.exports = class Server {
    constructor() {
        this.app = express();
        this.port = env.APP_PORT;
        this.url = env.APP_URL;
        this.table = 'products';
        this.productsRoute = '/api/products';

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.productsRoute, require('../routes/product.routes'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Listen on: ${ this.url }:${ this.port }`);
        })

        this.app.on('error', error => console.log(`Server error ${ error }`))
    }
}