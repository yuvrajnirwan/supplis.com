import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDatasource} from '../datasources';
import {MultivitaminProduct, MultivitaminProductRelations, Category} from '../models';
import {CategoryRepository} from './category.repository';

export class MultivitaminProductRepository extends DefaultCrudRepository<
  MultivitaminProduct,
  typeof MultivitaminProduct.prototype.id,
  MultivitaminProductRelations
> {

  public readonly category: BelongsToAccessor<Category, typeof MultivitaminProduct.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDatasource, @repository.getter('CategoryRepository') protected categoryRepositoryGetter: Getter<CategoryRepository>,
  ) {
    super(MultivitaminProduct, dataSource);
    this.category = this.createBelongsToAccessorFor('category', categoryRepositoryGetter,);
    this.registerInclusionResolver('category', this.category.inclusionResolver);
  }
}
