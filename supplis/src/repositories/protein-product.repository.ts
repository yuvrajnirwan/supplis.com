import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDatasource} from '../datasources';
import {ProteinProduct, ProteinProductRelations, Category} from '../models';
import {CategoryRepository} from './category.repository';

export class ProteinProductRepository extends DefaultCrudRepository<
  ProteinProduct,
  typeof ProteinProduct.prototype.id,
  ProteinProductRelations
> {

  public readonly category: BelongsToAccessor<Category, typeof ProteinProduct.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDatasource, @repository.getter('CategoryRepository') protected categoryRepositoryGetter: Getter<CategoryRepository>,
  ) {
    super(ProteinProduct, dataSource);
    this.category = this.createBelongsToAccessorFor('category', categoryRepositoryGetter,);
    this.registerInclusionResolver('category', this.category.inclusionResolver);
  }
}
