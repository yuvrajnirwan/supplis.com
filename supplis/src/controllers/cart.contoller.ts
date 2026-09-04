import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {get, post, del, param, requestBody} from '@loopback/rest';
import {
  authenticate,
  STRATEGY,
  AuthenticationBindings,
  IAuthUser,
} from 'loopback4-authentication';
import {authorize} from 'loopback4-authorization';
import {CartRepository, CartItemRepository} from '../repositories';
import {Cart, CartItem} from '../models';

export class CartController {
  constructor(
    @repository(CartRepository)
    public cartRepository: CartRepository,
    @repository(CartItemRepository)
    public cartItemRepository: CartItemRepository,
  ) {}

  // Fetch or create cart for current user
  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: ['*']})
  @get('/cart')
  async getMyCart(
    @inject(AuthenticationBindings.CURRENT_USER) user: IAuthUser,
  ): Promise<Cart> {
    const userId = String(user.id);

    let cart = await this.cartRepository.findOne({
      where: {userId: userId},
      include: ['items'],
    });

    if (!cart) {
      cart = await this.cartRepository.create({userId: userId});
      cart.items = [];
    }

    return cart;
  }

  // Add an item to the cart
  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: ['*']})
  @post('/cart/items')
  async addItem(
    @inject(AuthenticationBindings.CURRENT_USER) user: IAuthUser,
    @requestBody() item: Omit<CartItem, 'id' | 'cartId'>,
  ): Promise<CartItem> {
    const cart = await this.getMyCart(user);
    const cartId = String(cart.id);

    // Check if item already exists in user's cart
    const existingItem = await this.cartItemRepository.findOne({
      where: {
        cartId: cartId,
        productId: item.productId,
        variantId: item.variantId,
      },
    });

    if (existingItem && existingItem.id) {
      const updatedQuantity = existingItem.quantity + (item.quantity || 1);
      await this.cartItemRepository.updateById(existingItem.id, {
        quantity: updatedQuantity,
      });
      return this.cartItemRepository.findById(existingItem.id);
    }

    return this.cartRepository.items(cartId).create(item);
  }

  // Remove single item from cart
  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: ['*']})
  @del('/cart/items/{itemId}')
  async removeItem(
    @param.path.string('itemId') itemId: string,
  ): Promise<void> {
    await this.cartItemRepository.deleteById(itemId);
  }
}
