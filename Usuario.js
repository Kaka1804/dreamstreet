const Sequelize = require('sequelize');
const connection = require('./database');

const Usuario = connection.define('usuarios', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  primeiro_nome: {
    type: Sequelize.STRING,
    allowNull: false
  },
  sobrenome: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  celular: {
    type: Sequelize.STRING,
    allowNull: false
  },
  senha: {
    type: Sequelize.STRING,
    allowNull: false
  },
  genero: {
    type: Sequelize.STRING,
    allowNull: true
  }
});

module.exports = Usuario;