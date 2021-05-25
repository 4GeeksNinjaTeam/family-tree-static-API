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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
exports.__esModule = true;
exports.getMemberId = exports.createTree = exports.findTrees = exports.getUsers = exports.createUser = void 0;
var typeorm_1 = require("typeorm"); // getRepository"  traer una tabla de la base de datos asociada al objeto
var Users_1 = require("./entities/Users");
var Family_1 = require("./entities/Family");
var utils_1 = require("./utils");
var createUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userRepo, user, newUser, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // important validations to avoid ambiguos errors, the client needs to understand what went wrong
                if (!req.body.first_name)
                    throw new utils_1.Exception("Please provide a first_name");
                if (!req.body.last_name)
                    throw new utils_1.Exception("Please provide a last_name");
                if (!req.body.email)
                    throw new utils_1.Exception("Please provide an email");
                if (!req.body.password)
                    throw new utils_1.Exception("Please provide a password");
                userRepo = typeorm_1.getRepository(Users_1.Users);
                return [4 /*yield*/, userRepo.findOne({ where: { email: req.body.email } })];
            case 1:
                user = _a.sent();
                if (user)
                    throw new utils_1.Exception("Users already exists with this email");
                newUser = typeorm_1.getRepository(Users_1.Users).create(req.body);
                return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).save(newUser)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.createUser = createUser;
var getUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).find()];
            case 1:
                users = _a.sent();
                return [2 /*return*/, res.json(users)];
        }
    });
}); };
exports.getUsers = getUsers;
var findTrees = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var manager, trees;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                manager = typeorm_1.getManager();
                return [4 /*yield*/, manager.getTreeRepository(Family_1.Family).findTrees()];
            case 1:
                trees = _a.sent();
                return [2 /*return*/, res.json(trees)];
        }
    });
}); };
exports.findTrees = findTrees;
var createTree = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var manager, a1, a11, a12, a111, a112, trees;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                manager = typeorm_1.getManager();
                a1 = new Family_1.Family();
                a1.name = "GrandParent";
                return [4 /*yield*/, manager.save(a1)];
            case 1:
                _a.sent();
                a11 = new Family_1.Family();
                a11.name = "Parent1";
                a11.parent = a1;
                return [4 /*yield*/, manager.save(a11)];
            case 2:
                _a.sent();
                a12 = new Family_1.Family();
                a12.name = "Parent2";
                a12.parent = a1;
                return [4 /*yield*/, manager.save(a12)];
            case 3:
                _a.sent();
                a111 = new Family_1.Family();
                a111.name = "Current1";
                a111.parent = a11;
                return [4 /*yield*/, manager.save(a111)];
            case 4:
                _a.sent();
                a112 = new Family_1.Family();
                a112.name = "Current2";
                a112.parent = a11;
                return [4 /*yield*/, manager.save(a112)];
            case 5:
                _a.sent();
                return [4 /*yield*/, manager.getTreeRepository(Family_1.Family).findTrees()];
            case 6:
                trees = _a.sent();
                return [2 /*return*/, res.json(trees)];
        }
    });
}); };
exports.createTree = createTree;
var getMemberId = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var manager, trees;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                manager = typeorm_1.getManager();
                return [4 /*yield*/, manager.getTreeRepository(Family_1.Family).findTrees()];
            case 1:
                trees = _a.sent();
                return [2 /*return*/, res.json(trees)];
        }
    });
}); };
exports.getMemberId = getMemberId;
