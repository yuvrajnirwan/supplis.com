import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDatasource} from '../datasources';
import {SaltProduct, SaltProductRelations, Category} from '../models';
import {CategoryRepository} from './category.repository';

export class SaltProductRepository extends DefaultCrudRepository<
  SaltProduct,
  typeof SaltProduct.prototype.id,
  SaltProductRelations
> {

  public readonly category: BelongsToAccessor<Category, typeof SaltProduct.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDatasource, @repository.getter('CategoryRepository') protected categoryRepositoryGetter: Getter<CategoryRepository>,
  ) {
    super(SaltProduct, dataSource);
    this.category = this.createBelongsToAccessorFor('category', categoryRepositoryGetter,);
    this.registerInclusionResolver('category', this.category.inclusionResolver);
  }
}
