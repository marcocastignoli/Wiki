"use strict";

var Entity = require("../build/distributed-database-explorer.js").Entity;
var expect = require("chai").expect;


describe('distributed-database-explorer', function () {

    it('resolves', (done) => {
        let a = new Entity("4", "database")
        const result = a.get()
            .then((database) => {
                return database.findBySlug("nationalities")
            })
            .then((nationalities) => {
                return nationalities.findBySlug("italian")
            })
            .then((italian) => {
                return italian.findBySlug("tofur", false)
            })
            .then((tofur) => {
                return tofur.get("name")
            })
            
        result.then((name) => {
            expect(name).to.equal('Tofur');
        }).then(done, done);
    });
});