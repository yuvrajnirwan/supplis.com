import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDatasource} from '../datasources';
import {ProteinProduct, ProteinProductRelations} from '../models';

export class ProteinProductRepository extends DefaultCrudRepository<
  ProteinProduct,
  typeof ProteinProduct.prototype.id,
  ProteinProductRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDatasource,
  ) {
    super(ProteinProduct, dataSource);
  }
}
