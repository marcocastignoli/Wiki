import { Entity, EntityCollection, Database, DatabaseConnector } from "../build/distributed-database-explorer.js";

let a = new Entity("4", "database")
a.get()
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
    .then((name) => {
        console.log(name)
    })