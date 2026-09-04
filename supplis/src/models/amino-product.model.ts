import { Entity, model, property, belongsTo } from '@loopback/repository';
import { Category } from './category.model';

@model({ settings: { strict: true } })
export class AminoProduct extends Entity {
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
    servingSizeGrams?: number;
    servingsPerContainer?: number;
    calories?: number;
    bcaaGrams?: number;
    lLeucineGrams?: number;
    lIsoleucineGrams?: number;
    lValineGrams?: number;
    lGlutamineGrams?: number;
    electrolytesMg?: number;
    sodiumMg?: number;
    potassiumMg?: number;
    magnesiumMg?: number;
    calciumMg?: number;
    vitaminCmg?: number;
    eaaGrams?: number;
    lHistidineMg?: number;
    lLysineMg?: number;
    lThreonineMg?: number;
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
    weightGrams: number;
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

  constructor(data?: Partial<AminoProduct>) {
    super(data);
  }
}

export interface AminoProductRelations {}

export type AminoProductWithRelations = AminoProduct & AminoProductRelations;
