var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var database = {
        "0": { name: "Tofur", surname: "Asd", age: 21 },
        "1": { name: "Pippo", surname: "Qwe", age: 14 },
        "2": { name: "Pluto", surname: "Rat", age: 51 },
        "3": { name: "Cupar", surname: "Pre", age: 23 },
        "4": [
            {
                "0": "tofur",
                "1": "tofur",
                "2": "pluto",
                "3": "cupar",
                "5": "nationalities"
            }
        ],
        "5": [
            {
                "6": "italian",
                "7": "french"
            }
        ],
        "6": [
            {
                "0": "tofur",
                "3": "cupar"
            }
        ],
        "7": [
            {
                "1": "pippo"
            }
        ]
    };
    var DatabaseConnector = /** @class */ (function () {
        function DatabaseConnector() {
            this.database = database;
        }
        DatabaseConnector.prototype.select = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            if (_this.database[id]) {
                                resolve(_this.database[id]);
                            }
                            else {
                                reject();
                            }
                        })];
                });
            });
        };
        return DatabaseConnector;
    }());
    exports.DatabaseConnector = DatabaseConnector;
    var Database = /** @class */ (function () {
        function Database() {
            this.db = new DatabaseConnector();
            this.cache = {};
        }
        Database.prototype.select = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(this.cache[id] === undefined)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.db.select(id)];
                        case 1:
                            data = _a.sent();
                            if (data === undefined) {
                                return [2 /*return*/, undefined];
                            }
                            this.cache[id] = data;
                            _a.label = 2;
                        case 2: return [2 /*return*/, this.cache[id]];
                    }
                });
            });
        };
        return Database;
    }());
    exports.Database = Database;
    var db = new Database();
    var EntityCollection = /** @class */ (function () {
        function EntityCollection(collection, slug) {
            this.collection = collection;
            if (slug) {
                this.slug = slug;
            }
        }
        EntityCollection.prototype.findBySlug = function (slug, autoGet) {
            if (typeof (autoGet) === 'undefined')
                autoGet = true;
            var x = {};
            for (var i in this.collection) {
                var obj = this.collection[i];
                if (x[obj.slug] === undefined) {
                    x[obj.slug] = [];
                }
                x[obj.slug].push(obj);
            }
            if (x[slug] && x[slug].length === 1) {
                if (autoGet) {
                    return x[slug][0].get();
                }
                else {
                    return x[slug][0];
                }
            }
            else {
                return new EntityCollection(x[slug], slug);
            }
        };
        EntityCollection.prototype.each = function (callback) {
            for (var entity in this.collection) {
                callback(this.collection[entity], entity);
            }
        };
        EntityCollection.prototype.get = function () {
            for (var hash in this.collection) {
                this.collection[hash].get();
            }
            return this.collection;
        };
        return EntityCollection;
    }());
    exports.EntityCollection = EntityCollection;
    var Entity = /** @class */ (function () {
        function Entity(hash, slug) {
            this.database = db;
            this.hash = hash;
            if (slug) {
                this.slug = slug;
            }
            this.properties = {};
        }
        Entity.prototype.fetch = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, key, property, hash;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = this;
                            return [4 /*yield*/, this.database.select(this.hash)];
                        case 1:
                            _a.properties = _b.sent();
                            for (key in this.properties) {
                                property = this.properties[key];
                                if (typeof property == "object") {
                                    for (hash in property)
                                        this.properties[key][hash] = new Entity(hash, this.properties[key][hash]);
                                }
                            }
                            return [2 /*return*/, this];
                    }
                });
            });
        };
        Entity.prototype.get = function (property) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.properties) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.fetch()];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2:
                            console.log(this);
                            if (property !== undefined) {
                                if (typeof this.properties[property] == "object") {
                                    return [2 /*return*/, new EntityCollection(this.properties[property], this.slug)];
                                }
                                else {
                                    return [2 /*return*/, this.properties[property]];
                                }
                            }
                            else if (typeof this.properties === "object" && typeof this.properties[0] == "object") {
                                return [2 /*return*/, new EntityCollection(this.properties[0], this.slug)];
                            }
                            else {
                                return [2 /*return*/, this.properties];
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        return Entity;
    }());
    exports.Entity = Entity;
});
