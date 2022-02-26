const { response, request } = require('express');
const HttpStatus = require('http-status-codes');

const Contenedor = require('../models/Contenedor');
const knexConfig = require("../knexfile");

const productRepository = new Contenedor(knexConfig[process.env.NODE_ENV], 'products');

class ProductController {

    async findAll(req = request, res = response) {
        const products = await productRepository.getAll();

        res.status(HttpStatus.OK).json(products);
    }

    async findOneById(req = request, res = response) {
        const { id } = req.params;

        const product = await productRepository.getById(id);

        const statusCode = product
            ? HttpStatus.OK
            : HttpStatus.NOT_FOUND;

        const result = product ? product : { error: 'Product not found' }

        return res.status(statusCode).json(result);
    }

    async save(req = request, res = response) {
        const { ...newProduct } = req.body;

        const id = await productRepository.save(newProduct);

        res.status(HttpStatus.CREATED).json({ id });
    }

    async update(req = request, res = response) {
        const { id } = req.params;
        const { ...newProduct } = req.body;

        const product = await productRepository.getById(id);

        if (!product) {
            return res.status(HttpStatus.NOT_FOUND).json({ error: 'Product not found' });
        }

        const updatedProduct = await productRepository.update(id, newProduct);

        return  res.status(HttpStatus.OK).json(updatedProduct);
    }

    async delete(req = request, res = response) {

        const { id } = req.params;

        const product = await productRepository.getById(id);

        if (!product) {
            return res.status(HttpStatus.NOT_FOUND).json({ error: 'Product not found' });
        }

        await productRepository.deleteById(id);

        res.status(HttpStatus.OK).json({ message: 'Product deleted' })
    }

}

module.exports = ProductController;