import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDatasource} from '../datasources';
import {WeightManagementProduct, WeightManagementProductRelations} from '../models';

export class WeightManagementProductRepository extends DefaultCrudRepository<
  WeightManagementProduct,
  typeof WeightManagementProduct.prototype.id,
  WeightManagementProductRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDatasource,
  ) {
    super(WeightManagementProduct, dataSource);
  }
}
