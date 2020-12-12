import { ConnectionOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config'

const configService = new ConfigService();

const config: ConnectionOptions = {
  type: 'postgres' as 'postgres',
  host: configService.get('DATABASE_HOST'),
  username: configService.get('DATABASE_USERNAME'),
  password: configService.get('DATABASE_PASSWORD'),
  port: parseInt(configService.get('DATABASE_PORT')),
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],

  database: configService.get<string>('DATABASE_NAME'),
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
