const database = {
    0: { name: "Tofur", surname: "Asd", age: 21 },
    1: { name: "Pippo", surname: "Qwe", age: 14 },
    2: { name: "Pluto", surname: "Rat", age: 51 },
    3: { name: "Cupar", surname: "Pre", age: 23 },
    4: [
        {
            0: "tofur",
            1: "tofur",
            2: "pluto",
            3: "cupar",
            5: "nationalities"
        }
    ],
    5: [
        {
            6: "italian",
            7: "french"
        }
    ],
    6: [
        {
            0: "tofur",
            3: "cupar"
        }
    ],
    7: [
        {
            1: "pippo"
        }
    ]
}

class DatabaseConnector {
    constructor() {
        this.database = database
    }
    select(id){
        return this.database[id]
    }
}

class Database {
    constructor() {
        this.db = new DatabaseConnector()
        this.cache = {}
    }
    select(id) {
        if(this.cache[id] === undefined) {
            const data = this.db.select(id)
            if(data === undefined){
                return undefined
            }
            this.cache[id] = data
        }
        return this.cache[id]
    }
}

const db = new Database()

class EntityCollection {
    constructor(collection, slug) {
        this.collection = collection
        if (slug) {
            this.slug = slug
        }
    }
    fetch() {
        for (let hash in this.collection) {
            this.collection[hash].fetch()
        }
        return this
    }
    findBySlug(slug) {
        let x = {}
        for (let i in this.collection) {
            let obj = this.collection[i]
            if (x[obj.slug] === undefined) {
                x[obj.slug] = []
            }
            x[obj.slug].push(obj)
        }
        if (x[slug].length === 1) {
            return x[slug][0]
        } else {
            return new EntityCollection(x[slug], slug)
        }
    }
    each(callback) {
        for (let entity in this.collection) {
            callback(this.collection[entity], entity)
        }
    }
    get() {
        for (let hash in this.collection) {
            this.collection[hash].get()
        }
        return this.collection
    }
}

class Entity {
    constructor(hash, slug) {
        this.database = db
        this.hash = hash
        if (slug) {
            this.slug = slug
        }
        this.properties = {}
        if (database[this.hash] instanceof Array) {
            return this.get(0)
        }
    }
    fetch() {
        this.properties = this.database.select(this.hash)
        for (let key in this.properties) {
            let property = this.properties[key]
            if (typeof property == "object") {
                for (let hash in property)
                    this.properties[key][hash] = new Entity(hash, this.properties[key][hash])
            }
        }
        return this
    }
    get(property) {
        if (this.properties) {
            this.fetch()
        }
        if (property !== undefined) {
            if (typeof this.properties[property] == "object") {
                return new EntityCollection(this.properties[property], this.slug)
            } else {
                return this.properties[property]
            }
        } else {
            return this.properties
        }
    }
}

let a = new Entity(4, "database")
a.each((entity, hash) => {
    console.log(entity.get())
})