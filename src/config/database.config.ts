import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Pilot } from '../entities/Pilot';
import { Trip } from 'src/Entities/Trip';

/** Place confidential variables in .env and assign here using process.env.* */
// https://typeorm.io/data-source-options
const dataSourceOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'flights',
  schema: 'aocs',
  entities: [Pilot, Trip],
  migrations: [__dirname + '/../database/migration/*{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: true, // disable in production!
  logging: true,
};

export default registerAs('database', () => dataSourceOptions);

// datasource instance for migration
export const connectionSource = new DataSource(
  dataSourceOptions as DataSourceOptions,
);
