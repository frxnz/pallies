'use strict';

exports.up = async (knex) => {

    await knex.schema.createTable('Users', (t) => {

        t.increments('id').primary();
        t.string('name');
        t.string('email').notNullable().unique();
        t.string('password');
    });
};

exports.down = async (knex) => {

    await knex.schema.dropTable('Users');
};
