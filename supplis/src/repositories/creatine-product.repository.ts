import { inject, Getter} from '@loopback/core';
import { DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import { DbDatasource } from '../datasources';
import { CreatineProduct, CreatineProductRelations, Category} from '../models';
import {CategoryRepository} from './category.repository';

export class CreatineProductRepository extends DefaultCrudRepository<
  CreatineProduct,
  typeof CreatineProduct.prototype.id,
  CreatineProductRelations
> {

  public readonly category: BelongsToAccessor<Category, typeof CreatineProduct.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDatasource, @repository.getter('CategoryRepository') protected categoryRepositoryGetter: Getter<CategoryRepository>,
  ) {
    super(CreatineProduct, dataSource);
    this.category = this.createBelongsToAccessorFor('category', categoryRepositoryGetter,);
    this.registerInclusionResolver('category', this.category.inclusionResolver);
  }
}
