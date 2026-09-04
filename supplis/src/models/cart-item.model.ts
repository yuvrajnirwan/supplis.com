import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Cart} from './cart.model';

@model({settings: {strict: true}})
export class CartItem extends Entity {
  @property({
    type: 'string',
    id: true,
    defaultFn: 'uuid',
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  productId: string;

  @property({
    type: 'string',
    required: true,
  })
  variantId: string;

  @property({
    type: 'number',
    required: true,
    default: 1,
  })
  quantity: number;

  @property({
    type: 'number',
    required: true,
  })
  priceInr: number;

  @belongsTo(() => Cart)
  cartId: string;

  constructor(data?: Partial<CartItem>) {
    super(data);
  }
}

export interface CartItemRelations {}
export type CartItemWithRelations = CartItem & CartItemRelations;
