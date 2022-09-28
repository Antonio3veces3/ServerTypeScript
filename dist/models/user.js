"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const User = connection_1.default.define('User', {
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    mail: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.TINYINT,
        defaultValue: 1,
    },
    createdAt: {
        type: sequelize_1.DataTypes.TIME,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.TIME,
    }
});
exports.default = User;
//# sourceMappingURL=user.js.map