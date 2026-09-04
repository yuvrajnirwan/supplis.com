import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Category} from './category.model';

@model({settings: {strict: true}})
export class SingleVitaminProduct extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  brand: string;

  @property({
    type: 'string',
    required: false,
  })
  category?: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'boolean',
    default: true,
  })
  isVegetarian?: boolean;

  @property({
    type: 'object',
  })
  nutritionFacts?: {
    servingSizeCapsules?: number;
    servingSizeTablets?: number;
    servingsPerContainer?: number;
    vitaminD3Iu?: number;
    vitaminD3Mcg?: number;
    vitaminCMg?: number;
    zincMg?: number;
    amlaExtractMg?: number;
    vitaminB12Mcg?: number;
    activeForm?: string;
    vitaminEIu?: number;
    vitaminEMg?: number;
    vitaminK2Mk7Mcg?: number;
  };

  @property({
    type: 'string',
  })
  imageUrl?: string;

  @property({
    type: 'number',
  })
  priceInr?: number;

  @property({
    type: 'number',
  })
  mrpInr?: number;

  @property({
    type: 'array',
    itemType: 'object',
  })
  variants?: {
    id: string;
    sku: string;
    flavor: string;
    count: number;
    priceInr: number;
    mrpInr: number;
    stockQuantity: number;
    images: {
      url: string;
      isPrimary: boolean;
      altText: string;
    }[];
  }[];

  @belongsTo(() => Category)
  categoryId: string;

  constructor(data?: Partial<SingleVitaminProduct>) {
    super(data);
  }
}

export interface SingleVitaminProductRelations {}

export type SingleVitaminProductWithRelations =
  SingleVitaminProduct & SingleVitaminProductRelations;
