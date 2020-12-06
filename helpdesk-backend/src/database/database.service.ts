import { TypeOrmModule } from '@nestjs/typeorm';
//import { config } from './ormconfig';
import config = require('./ormconfig');

export const databaseProviders = [
  TypeOrmModule.forRootAsync({
    async useFactory() {
      return config;
    },
  }),
];
