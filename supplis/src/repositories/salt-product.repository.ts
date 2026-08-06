import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDatasource} from '../datasources';
import {SaltProduct, SaltProductRelations} from '../models';

export class SaltProductRepository extends DefaultCrudRepository<
  SaltProduct,
  typeof SaltProduct.prototype.id,
  SaltProductRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDatasource,
  ) {
    super(SaltProduct, dataSource);
  }
}
