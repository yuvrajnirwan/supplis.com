import { Entity, model, property } from '@loopback/repository';

@model({ settings: { strict: false } })
export class PreWorkoutProduct extends Entity {
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
    servingsPerContainer?: number;
    calories?: number;
    caffeineMg?: number;
    lCitrullineMg?: number;
    betaAlanineMg?: number;
    lArginineMg?: number;
    tyrosineMg?: number;
  };

  constructor(data?: Partial<PreWorkoutProduct>) {
    super(data);
  }
}

export interface PreWorkoutProductRelations {}

export type PreWorkoutProductWithRelations =
  PreWorkoutProduct & PreWorkoutProductRelations;
