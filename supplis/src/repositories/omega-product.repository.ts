import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDatasource} from '../datasources';
import {OmegaProduct, OmegaProductRelations, Category} from '../models';
import {CategoryRepository} from './category.repository';

export class OmegaProductRepository extends DefaultCrudRepository<
  OmegaProduct,
  typeof OmegaProduct.prototype.id,
  OmegaProductRelations
> {

  public readonly category: BelongsToAccessor<Category, typeof OmegaProduct.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDatasource, @repository.getter('CategoryRepository') protected categoryRepositoryGetter: Getter<CategoryRepository>,
  ) {
    super(OmegaProduct, dataSource);
    this.category = this.createBelongsToAccessorFor('category', categoryRepositoryGetter,);
    this.registerInclusionResolver('category', this.category.inclusionResolver);
  }
}
