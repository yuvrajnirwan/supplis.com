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
    type: 'number',
    required: true,
  })
  priceInr: number;

  @property({
    type: 'string',
    required: true,
  })
  imageUrl: string;

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

  constructor(data?: Partial<ProteinProduct>) {
    super(data);
  }
}

export interface ProteinProductRelations {}

export type ProteinProductWithRelations =
  ProteinProduct & ProteinProductRelations;
