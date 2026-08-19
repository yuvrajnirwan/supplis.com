import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDatasource} from '../datasources';
import {PreWorkoutProduct, PreWorkoutProductRelations, Category} from '../models';
import {CategoryRepository} from './category.repository';

export class PreWorkoutProductRepository extends DefaultCrudRepository<
  PreWorkoutProduct,
  typeof PreWorkoutProduct.prototype.id,
  PreWorkoutProductRelations
> {

  public readonly category: BelongsToAccessor<Category, typeof PreWorkoutProduct.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDatasource, @repository.getter('CategoryRepository') protected categoryRepositoryGetter: Getter<CategoryRepository>,
  ) {
    super(PreWorkoutProduct, dataSource);
    this.category = this.createBelongsToAccessorFor('category', categoryRepositoryGetter,);
    this.registerInclusionResolver('category', this.category.inclusionResolver);
  }
}
