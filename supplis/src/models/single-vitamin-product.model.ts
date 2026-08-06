import { Entity, model, property } from '@loopback/repository';

@model({ settings: { strict: false } })
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
    servingSizeCapsules?: number;
    servingSizeTablets?: number;
    servingsPerContainer?: number;
    vitaminD3_IU?: number;
    vitaminD3_mcg?: number;
    vitaminC_mg?: number;
    zinc_mg?: number;
    amlaExtract_mg?: number;
    vitaminB12_mcg?: number;
    activeForm?: string;
    vitaminE_IU?: number;
    vitaminE_mg?: number;
    vitaminK2_MK7_mcg?: number;
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

  constructor(data?: Partial<SingleVitaminProduct>) {
    super(data);
  }
}

export interface SingleVitaminProductRelations {}

export type SingleVitaminProductWithRelations = SingleVitaminProduct & SingleVitaminProductRelations;
