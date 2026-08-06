import { Entity, model, property } from '@loopback/repository';

@model({ settings: { strict: false } })
export class ProteinProduct extends Entity {
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
    calories?: number;
    proteinGrams?: number;
    carbsGrams?: number;
    fatGrams?: number;
    bcaaGrams?: number;
    eaaGrams?: number;
  };

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

  constructor(data?: Partial<ProteinProduct>) {
    super(data);
  }
}

export interface ProteinProductRelations {}

export type ProteinProductWithRelations = ProteinProduct & ProteinProductRelations;
