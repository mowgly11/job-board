"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_json_1 = __importDefault(require("../config.json"));
function initialiseMongoDB() {
    mongoose_1.default.connect(config_json_1.default.mongoDbURL);
    mongoose_1.default.set('strictQuery', true);
    mongoose_1.default.connection.on('connected', () => console.log("DataBase Connected"));
    mongoose_1.default.connection.on('disconnected', () => console.log("DataBase Disconnected"));
    mongoose_1.default.connection.on('error', (err) => console.log("DataBase Error: " + err));
}
exports.default = initialiseMongoDB;
