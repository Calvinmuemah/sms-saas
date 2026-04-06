const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(`${process.env.POSTGRES_URI}&uselibpqcompat=true`, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Adjust based on your security requirements
    },
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000, // Increased timeout to 30 seconds
    idle: 10000,
  },
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("PostgreSQL connected");
  } catch (err) {
    console.error("Unable to connect to PostgreSQL:", err);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };