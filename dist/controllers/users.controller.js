"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.putUser = exports.postUser = exports.getUser = exports.getUsers = void 0;
const user_1 = __importDefault(require("../models/user"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.default.findAll({
        where: { status: 1 },
    });
    if (!users) {
        res.status(404).json({ msg: `There are not users on database` });
    }
    else {
        res.json(users);
    }
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield user_1.default.findByPk(id);
    if (!user) {
        res.status(404).json({ msg: `The user id ${id} does not exist` });
    }
    else {
        res.json(user);
    }
});
exports.getUser = getUser;
const postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const existMail = yield user_1.default.findOne({
            where: {
                mail: body.mail,
            },
        });
        if (existMail) {
            return res.status(400).json({
                msg: `The email ${body.mail} already exists`,
            });
        }
        const newUser = yield user_1.default.create(body);
        res.json({ newUser });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Contact to Admin`,
        });
    }
});
exports.postUser = postUser;
const putUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const user = yield user_1.default.findByPk(id);
        if (!user) {
            return res.status(400).json({
                msg: `User with id ${id} not found`,
            });
        }
        const existMail = yield user_1.default.findOne({
            where: {
                mail: body.mail,
            },
        });
        if (existMail) {
            return res.status(400).json({
                msg: `The email ${body.mail} already exists`,
            });
        }
        yield user.update(body);
        res.json(user);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Contact to Admin`,
        });
    }
});
exports.putUser = putUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield user_1.default.findByPk(id);
    if (!user) {
        return res.status(400).json({
            msg: `User with id ${id} not found`,
        });
    }
    yield user.update({ status: false });
    //await user.destroy();
    res.json({
        msg: `User deleted`,
    });
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=users.controller.js.map