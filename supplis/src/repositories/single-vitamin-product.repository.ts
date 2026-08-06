import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDatasource} from '../datasources';
import {SingleVitaminProduct, SingleVitaminProductRelations} from '../models';

export class SingleVitaminProductRepository extends DefaultCrudRepository<
  SingleVitaminProduct,
  typeof SingleVitaminProduct.prototype.id,
  SingleVitaminProductRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDatasource,
  ) {
    super(SingleVitaminProduct, dataSource);
  }
}
