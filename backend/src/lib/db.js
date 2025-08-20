import dotenv from 'dotenv';
import { Sequelize } from 'sequelize'

dotenv.config();

const sequelize = new Sequelize(
  process.env.PSQL_DB_NAME,
  process.env.PSQL_DB_USER,
  process.env.PSQL_DB_PASSW,
  {
    host: process.env.PSQL_DB_HOST,
    port: process.env.PSQL_DB_PORT,
    dialect: 'postgres',
    logging: false,
  }
);

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Succesfully connnected to PostgreSQL database')

    await sequelize.sync({ alter: true });
    console.log('Succesfully syncronize the tabels');
  } catch (e) {
    console.error(e);
  }
}
