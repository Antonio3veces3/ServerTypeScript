"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// DBname, user password, config
const db = new sequelize_1.Sequelize('nodets', 'root', '#MysqlTony33', {
    host: 'localhost',
    dialect: 'mysql',
    //loggin: false,
});
exports.default = db;
//# sourceMappingURL=connection.js.map