import { inject } from '@loopback/core';
import { DefaultCrudRepository } from '@loopback/repository';
import { DbDatasource } from '../datasources';
import { AminoProduct, AminoProductRelations } from '../models';

export class AminoProductRepository extends DefaultCrudRepository<
  AminoProduct,
  typeof AminoProduct.prototype.id,
  AminoProductRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDatasource,
  ) {
    super(AminoProduct, dataSource);
  }
}
