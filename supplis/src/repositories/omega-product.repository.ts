import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDatasource} from '../datasources';
import {OmegaProduct, OmegaProductRelations} from '../models';

export class OmegaProductRepository extends DefaultCrudRepository<
  OmegaProduct,
  typeof OmegaProduct.prototype.id,
  OmegaProductRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDatasource,
  ) {
    super(OmegaProduct, dataSource);
  }
}
