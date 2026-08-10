import { Entity, model, property } from '@loopback/repository';

@model({ settings: { strict: false } })
export class MultivitaminProduct extends Entity {
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
    servingSizeTablets?: number;
    servingsPerContainer?: number;
    vitaminA_mcg?: number;
    vitaminC_mg?: number;
    vitaminD3_IU?: number;
    vitaminB12_mcg?: number;
    zinc_mg?: number;
    iron_mg?: number;
    digestiveEnzymeBlend_mg?: number;
    aminoAcidBlend_mg?: number;
    omega3_mg?: number;
    ashwagandhaExtract_mg?: number;
    wholefoodBlend_mg?: number;
  };

  constructor(data?: Partial<MultivitaminProduct>) {
    super(data);
  }
}

export interface MultivitaminProductRelations {}

export type MultivitaminProductWithRelations =
  MultivitaminProduct & MultivitaminProductRelations;
