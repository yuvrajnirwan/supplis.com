import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';
import {NotifAccessCacheSourceName} from '@sourceloop/notification-service';

const config = {
  name: NotifAccessCacheSourceName,
  connector: 'kv-memory',
};

@lifeCycleObserver('datasource')
export class NotificationAccessCacheDataSource
  extends juggler.DataSource
  implements LifeCycleObserver
{
  static dataSourceName = NotifAccessCacheSourceName;
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.notifAccessCache', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
