import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDatasource} from '../datasources';
import {WeightManagementProduct, WeightManagementProductRelations, Category} from '../models';
import {CategoryRepository} from './category.repository';

export class WeightManagementProductRepository extends DefaultCrudRepository<
  WeightManagementProduct,
  typeof WeightManagementProduct.prototype.id,
  WeightManagementProductRelations
> {

  public readonly category: BelongsToAccessor<Category, typeof WeightManagementProduct.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDatasource, @repository.getter('CategoryRepository') protected categoryRepositoryGetter: Getter<CategoryRepository>,
  ) {
    super(WeightManagementProduct, dataSource);
    this.category = this.createBelongsToAccessorFor('category', categoryRepositoryGetter,);
    this.registerInclusionResolver('category', this.category.inclusionResolver);
  }
}
