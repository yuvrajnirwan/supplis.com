import {Entity, model, property, hasMany} from '@loopback/repository';
import {CartItem, CartItemWithRelations} from './cart-item.model';

@model({settings: {strict: true}})
export class Cart extends Entity {
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
  userId: string;

  @hasMany(() => CartItem)
  items: CartItem[];

  constructor(data?: Partial<Cart>) {
    super(data);
  }
}

// Add and export these missing interface definitions:
export interface CartRelations {
  items?: CartItemWithRelations[];
}

export type CartWithRelations = Cart & CartRelations;
