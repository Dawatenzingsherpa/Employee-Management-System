"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelize = new sequelize_typescript_1.Sequelize({
    database: process.env.DB_NAME,
    dialect: 'mysql',
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    models: ['_dirname' + "/models"]
});
sequelize.authenticate()
    .then(() => {
    console.log('connected');
}).catch((error) => {
    console.log(error);
});
sequelize.sync({ force: true }).then(() => {
    console.log("Synced");
});
exports.default = sequelize;
//# sourceMappingURL=connection.js.map