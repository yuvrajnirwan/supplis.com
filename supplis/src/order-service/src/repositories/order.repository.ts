import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDatasource} from '../datasources';
import {Order} from '../models';

export class OrderRepository extends DefaultCrudRepository<
  Order,
  typeof Order.prototype.id
> {
  constructor(
    @inject('datasources.db') dataSource: DbDatasource,
  ) {
    super(Order, dataSource);
  }
}
