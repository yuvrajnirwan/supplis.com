import { inject } from '@loopback/core';
import { DefaultCrudRepository } from '@loopback/repository';
import { DbDatasource } from '../datasources';
import { CreatineProduct, CreatineProductRelations } from '../models';

export class CreatineProductRepository extends DefaultCrudRepository<
  CreatineProduct,
  typeof CreatineProduct.prototype.id,
  CreatineProductRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDatasource,
  ) {
    super(CreatineProduct, dataSource);
  }
}
