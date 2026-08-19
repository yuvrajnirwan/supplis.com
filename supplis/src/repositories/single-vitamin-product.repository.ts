import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDatasource} from '../datasources';
import {SingleVitaminProduct, SingleVitaminProductRelations, Category} from '../models';
import {CategoryRepository} from './category.repository';

export class SingleVitaminProductRepository extends DefaultCrudRepository<
  SingleVitaminProduct,
  typeof SingleVitaminProduct.prototype.id,
  SingleVitaminProductRelations
> {

  public readonly category: BelongsToAccessor<Category, typeof SingleVitaminProduct.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDatasource, @repository.getter('CategoryRepository') protected categoryRepositoryGetter: Getter<CategoryRepository>,
  ) {
    super(SingleVitaminProduct, dataSource);
    this.category = this.createBelongsToAccessorFor('category', categoryRepositoryGetter,);
    this.registerInclusionResolver('category', this.category.inclusionResolver);
  }
}
