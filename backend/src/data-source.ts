import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import 'reflect-metadata';

dotenv.config();
const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_NAME,
  synchronize: true,
  logging: false,
  entities: ['src/entity/**/*.ts'],
  migrations: [],
  subscribers: []
});

export default AppDataSource;
