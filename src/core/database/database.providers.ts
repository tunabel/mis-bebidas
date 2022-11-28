// The core directory will contain all our core setups, configuration, shared modules, pipes, guards, and middlewares.

import { Sequelize } from 'sequelize-typescript';
import { User } from 'src/modules/users/user.entity';
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants/index';
import { databaseConfig } from './database.config';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development;
          break;
        case TEST:
          config = databaseConfig.test;
          break;
        case PRODUCTION:
          config = databaseConfig.production;
          break;
        default:
          config = databaseConfig.development;
      }
      const sequelize = new Sequelize(config);

      // const sequelize = new Sequelize({
      //   dialect: 'postgres',
      //   host: 'localhost',
      //   port: 5432,
      //   username: 'postgres',
      //   password: 'mysecretpassword',
      //   database: 'postgres',
      // });

      sequelize.addModels([User]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
