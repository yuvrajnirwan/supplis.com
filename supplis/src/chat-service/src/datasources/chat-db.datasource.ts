import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as dotenv from "dotenv";

dotenv.config();

const config = {
  name: 'chatDb',
  connector: 'postgresql',
  url: '',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  schema: process.env.DB_SCHEMA,
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class ChatDbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'chatDb';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.chatDb', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }

  async start(): Promise<void> {
    const schema = process.env.DB_SCHEMA ?? 'public';
    if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(schema)) {
      throw new Error('DB_SCHEMA must be a valid PostgreSQL schema name.');
    }

    await this.execute(
      `ALTER TABLE "${schema}"."messages" ALTER COLUMN "id" SET DEFAULT gen_random_uuid()::text`,
    );
  }
}
