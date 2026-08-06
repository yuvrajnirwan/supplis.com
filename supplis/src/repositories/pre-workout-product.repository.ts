import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDatasource} from '../datasources';
import {PreWorkoutProduct, PreWorkoutProductRelations} from '../models';

export class PreWorkoutProductRepository extends DefaultCrudRepository<
  PreWorkoutProduct,
  typeof PreWorkoutProduct.prototype.id,
  PreWorkoutProductRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDatasource,
  ) {
    super(PreWorkoutProduct, dataSource);
  }
}
