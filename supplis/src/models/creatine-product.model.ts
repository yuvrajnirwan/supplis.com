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
    servingSizeTablets?: number;
    servingsPerContainer?: number;
    creatineMonohydrateGrams?: number;
    calories?: number;
  };

  constructor(data?: Partial<CreatineProduct>) {
    super(data);
  }
}

export interface CreatineProductRelations {}

export type CreatineProductWithRelations = CreatineProduct & CreatineProductRelations;
