import { inject, Getter} from '@loopback/core';
import { DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import { DbDatasource } from '../datasources';
import { AminoProduct, AminoProductRelations, Category} from '../models';
import {CategoryRepository} from './category.repository';

export class AminoProductRepository extends DefaultCrudRepository<
  AminoProduct,
  typeof AminoProduct.prototype.id,
  AminoProductRelations
> {

  public readonly category: BelongsToAccessor<Category, typeof AminoProduct.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDatasource, @repository.getter('CategoryRepository') protected categoryRepositoryGetter: Getter<CategoryRepository>,
  ) {
    super(AminoProduct, dataSource);
    this.category = this.createBelongsToAccessorFor('category', categoryRepositoryGetter,);
    this.registerInclusionResolver('category', this.category.inclusionResolver);
  }
}
