import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDatasource} from '../datasources';
import {Cart, CartRelations, CartItem} from '../models';
import {CartItemRepository} from './cart-item.repository';

export class CartRepository extends DefaultCrudRepository<
  Cart,
  typeof Cart.prototype.id,
  CartRelations
> {
  public readonly items: HasManyRepositoryFactory<CartItem, typeof Cart.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDatasource,
    @repository.getter('CartItemRepository')
    protected cartItemRepositoryGetter: Getter<CartItemRepository>,
  ) {
    super(Cart, dataSource);
    this.items = this.createHasManyRepositoryFactoryFor('items', cartItemRepositoryGetter);
    this.registerInclusionResolver('items', this.items.inclusionResolver);
  }
}
