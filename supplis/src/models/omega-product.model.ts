import { Entity, model, property, belongsTo} from '@loopback/repository';
import {Category} from './category.model';

@model({settings: {strict: false}})
export class OmegaProduct extends Entity {
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
  category: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'boolean',
    default: false,
  })
  isVegetarian?: boolean;

  @property({
    type: 'object',
  })
  nutritionFacts?: {
    servingSizeCapsules?: number;
    servingsPerContainer?: number;
    totalFishOilMg?: number;
    totalAlgalOilMg?: number;
    totalOmega3Mg?: number;
    epaMg?: number;
    dhaMg?: number;
    entericCoated?: boolean;
  };

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

  constructor(data?: Partial<OmegaProduct>) {
    super(data);
  }
}

export interface OmegaProductRelations {}

export type OmegaProductWithRelations = OmegaProduct & OmegaProductRelations;
