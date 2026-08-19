import { Entity, model, property } from '@loopback/repository';

@model({ settings: { strict: false } })
export class CreatineProduct extends Entity {
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
    required: true,
  })
  category: string;

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
    servingSizeTablets?: number;
    servingsPerContainer?: number;
    creatineMonohydrateGrams?: number;
    calories?: number;
  };

  @property({
    type: 'array',
    itemType: 'object',
  })
  variants?: {
    id: string;
    sku: string;
    flavor: string;
    weightGrams?: number;
    count?: number;
    priceInr: number;
    mrpInr: number;
    stockQuantity: number;
    images: {
      url: string;
      isPrimary: boolean;
      altText: string;
    }[];
  }[];

  constructor(data?: Partial<CreatineProduct>) {
    super(data);
  }
}

export interface CreatineProductRelations {}

export type CreatineProductWithRelations = CreatineProduct & CreatineProductRelations;
