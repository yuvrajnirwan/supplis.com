import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';
import {AuthCacheSourceName} from '@sourceloop/authentication-service';

const config = {
  name: AuthCacheSourceName,
  connector: 'kv-memory',
};

@lifeCycleObserver('datasource')
export class AuthCacheDataSource extends juggler.DataSource implements LifeCycleObserver {
  static dataSourceName = AuthCacheSourceName;
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.authCache', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
