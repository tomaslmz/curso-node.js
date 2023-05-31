const Sequelize = require('sequelize');

const sequelize = new Sequelize('Twitter2', 'root', 'root', {
    host: "localhost",
    dialect: "mysql",
}); //Rotas

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}