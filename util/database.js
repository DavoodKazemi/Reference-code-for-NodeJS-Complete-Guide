const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("node-complete", "root", "MySQL2o24", { dialect: "mysql", host: "localhost" });

module.exports = sequelize;
