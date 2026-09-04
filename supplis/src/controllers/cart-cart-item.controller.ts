import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Cart,
  CartItem,
} from '../models';
import {CartRepository} from '../repositories';

export class CartCartItemController {
  constructor(
    @repository(CartRepository) protected cartRepository: CartRepository,
  ) { }

  @get('/carts/{id}/cart-items', {
    responses: {
      '200': {
        description: 'Array of Cart has many CartItem',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(CartItem)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<CartItem>,
  ): Promise<CartItem[]> {
    return this.cartRepository.items(id).find(filter);
  }

  @post('/carts/{id}/cart-items', {
    responses: {
      '200': {
        description: 'Cart model instance',
        content: {'application/json': {schema: getModelSchemaRef(CartItem)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Cart.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CartItem, {
            title: 'NewCartItemInCart',
            exclude: ['id'],
            optional: ['cartId']
          }),
        },
      },
    }) cartItem: Omit<CartItem, 'id'>,
  ): Promise<CartItem> {
    return this.cartRepository.items(id).create(cartItem);
  }

  @patch('/carts/{id}/cart-items', {
    responses: {
      '200': {
        description: 'Cart.CartItem PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CartItem, {partial: true}),
        },
      },
    })
    cartItem: Partial<CartItem>,
    @param.query.object('where', getWhereSchemaFor(CartItem)) where?: Where<CartItem>,
  ): Promise<Count> {
    return this.cartRepository.items(id).patch(cartItem, where);
  }

  @del('/carts/{id}/cart-items', {
    responses: {
      '200': {
        description: 'Cart.CartItem DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(CartItem)) where?: Where<CartItem>,
  ): Promise<Count> {
    return this.cartRepository.items(id).delete(where);
  }
}
