const fs = require('fs');
const mapper = require('../utils/ObjectMapper');

const knex = require('knex');
const knexConfig = require("../knexfile");

module.exports = class Contenedor {

    constructor(knexConfig, table) {
        this.table = table;
        this.knex = knex(knexConfig)(this.table);
    }

    async save(product) {
        const result = await this.knex.insert(product);

        return result[0];
    }

    async getById(id) {
        const rowDataPacket = await this.knex.where({id});

        return (rowDataPacket.length > 0)
            ? JSON.parse(JSON.stringify(rowDataPacket))[0]
            : null;
    }

    async getAll() {
        return this.knex.select();
    }

    async deleteById(id) {
        return this.knex.where({id}).del();
    }

    async update(id, updatedProduct) {
       return this.knex.where('id', id).update(updatedProduct);
    }
}