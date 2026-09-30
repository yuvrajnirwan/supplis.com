import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';
import {NotifDbSourceName} from '@sourceloop/notification-service';

const config = {
  name: NotifDbSourceName,
  connector: 'postgresql',
  url: '',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  schema: process.env.DB_SCHEMA,
};

@lifeCycleObserver('datasource')
export class NotificationDbDataSource
  extends juggler.DataSource
  implements LifeCycleObserver
{
  static dataSourceName = NotifDbSourceName;
  static readonly defaultConfig = config;

  constructor(
    // You need to set datasource configuration name as 'datasources.config.Notification' otherwise you might get Errors
    @inject('datasources.config.Notification', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
