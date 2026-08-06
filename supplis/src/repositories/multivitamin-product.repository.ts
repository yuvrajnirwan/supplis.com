import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDatasource} from '../datasources';
import {MultivitaminProduct, MultivitaminProductRelations} from '../models';

export class MultivitaminProductRepository extends DefaultCrudRepository<
  MultivitaminProduct,
  typeof MultivitaminProduct.prototype.id,
  MultivitaminProductRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDatasource,
  ) {
    super(MultivitaminProduct, dataSource);
  }
}
