import { ConnectionOptions } from 'typeorm';
import { Configuration } from 'src/config/config.keys';
import { ConfigService } from 'src/config/config.service';

const configService = new ConfigService();
const config: ConnectionOptions = {
  type: 'postgres' as 'postgres',
  host: configService.get(Configuration.HOST),
  username: configService.get(Configuration.USERNAME),
  password: configService.get(Configuration.PASSWORD),
  port: parseInt(configService.get(Configuration.DB_PORT)),
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],

  database: 'helpdesk',
  synchronize: false,

  // Run migrations automatically,
  // you can disable this if you prefer running migration manually.
  migrationsRun: false,
  logging: true,
  logger: 'file',

  // Allow both start:prod and start:dev to use migrations
  // __dirname is either dist or src folder, meaning either
  // the compiled js in prod or the ts in dev.
  migrationsTableName: 'migrations',
  cli: {
    // Location of migration should be inside src folder
    // to be compiled into dist/ folder.
    migrationsDir: 'src/database/migrations',
  },
};

export = config;
