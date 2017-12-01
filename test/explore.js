"use strict";
exports.__esModule = true;
var distributed_database_explorer_js_1 = require("../build/distributed-database-explorer.js");
/* const distributedDatabaseExplorer = require('../built/index.js')

const Entity = distributedDatabaseExplorer.Entity
 */
var a = new distributed_database_explorer_js_1.Entity("4", "database");
a.get()
    .then(function (database) {
    return database.findBySlug("nationalities");
})
    .then(function (nationalities) {
    return nationalities.findBySlug("italian");
})
    .then(function (italian) {
    return italian.findBySlug("tofur", false);
})
    .then(function (tofur) {
    return tofur.get("name");
})
    .then(function (name) {
    console.log(name);
});
