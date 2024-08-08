const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('user_schema', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

connectDB();

module.exports = sequelize;
