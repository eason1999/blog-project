/**
 * @description sequelize type 声明
 */

const Sequelize = require('sequelize')

module.exports = {
  STRING: Sequelize.STRING,
  TEXT: Sequelize.TEXT,
  BOOLEAN: Sequelize.BOOLEAN,
  DECIMAL: Sequelize.DECIMAL,
  INTEGER: Sequelize.INTEGER
}