'use strict';

const Code = require('@hapi/code');
const Lab = require('@hapi/lab');
const Server = require('../../server');

const { describe, it, beforeEach, afterEach } = exports.lab = Lab.script();
const { expect } = Code;

const internals = {
    role: null
};

describe('Role Service', () => {

    beforeEach(async () => {

        internals.server = await Server.deployment();
        internals.role = await internals.server.services().roleService.create('Test Role');

    });

    it('create new role', () => {

        expect(internals.role).to.exist();
        expect(internals.role.name).to.equal('Test Role');
    });

    it('no duplicate roles', async () => {

        await expect(internals.server.services().roleService.create('Test Role')).to.reject();
    });

    it('get role by ID', async () => {

        const { roleService } = internals.server.services();

        const role = await roleService.getById(internals.role.id);

        expect(role).to.exist();
        expect(role.id).to.equal(internals.role.id);
        expect(role.name).to.equal('Test Role');
    });

    it('get role by name', async () => {

        const { roleService } = internals.server.services();

        const role = await roleService.getByName(internals.role.name);

        expect(role).to.exist();
        expect(role.id).to.equal(internals.role.id);
        expect(role.name).to.equal('Test Role');
    });

    it('update role', async () => {

        const { roleService } = internals.server.services();
        const role = await roleService.update({ id: internals.role.id, name: 'Updated Role' });

        expect(role).to.exist();
        expect(role.name).to.equal('Updated Role');
    });

    it('delete role', async () => {

        const { roleService } = internals.server.services();

        await roleService.delete(internals.role.id);

        const role = await roleService.getById(internals.role.id);

        expect(role).to.not.exist();
    });

    afterEach(async () => {

        await internals.server.services().roleService.delete(internals.role.id);
    });
});
