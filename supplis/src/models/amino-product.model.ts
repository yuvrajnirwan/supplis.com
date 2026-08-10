import { Entity, model, property } from '@loopback/repository';

@model({ settings: { strict: false } })
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
    bcaaGrams?: number;
    lLeucineGrams?: number;
    lIsoleucineGrams?: number;
    lValineGrams?: number;
    lGlutamineGrams?: number;
    electrolytesMg?: number;
    eaaGrams?: number;
    lHistidineMg?: number;
    lLysineMg?: number;
    lThreonineMg?: number;
  };

  constructor(data?: Partial<AminoProduct>) {
    super(data);
  }
}

export interface AminoProductRelations {}

export type AminoProductWithRelations = AminoProduct & AminoProductRelations;
