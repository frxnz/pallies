'use strict';

const Code = require('@hapi/code');
const Lab = require('@hapi/lab');
const Server = require('../../server');
const Model = require('../../lib/models');
const User = require('../../lib/models/user');
const RefreshToken = require('../../lib/models/refreshToken');
const Role = require('../../lib/models/role');

const { describe, it, before, after } = exports.lab = Lab.script();
const { expect } = Code;

const internals = {};

describe('Model Entry', () => {

    before(async () => {

        internals.server = await Server.deployment();
    });

    it('uses defaults', () => {

        const entry = Model();

        expect(entry).to.be.an.array();
        expect(new entry[0]()).to.be.an.instanceof(User);
        expect(new entry[1]()).to.be.an.instanceof(RefreshToken);
        expect(new entry[2]()).to.be.an.instanceof(Role);
    });

    it('uses passed options', () => {

        const entry = Model(null, {
            User: 'USER',
            RefreshToken: 'REFRESH_TOKEN',
            Role: 'ROLE'
        });

        expect(entry).to.be.an.array();
        expect(entry).to.include('USER');
        expect(entry).to.include('REFRESH_TOKEN');
        expect(entry).to.include('ROLE');
    });

    after(async () => {

    });
});
