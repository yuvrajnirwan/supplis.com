import { Entity, model, property, belongsTo} from '@loopback/repository';
import {Category} from './category.model';

@model({settings: {strict: false}})
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
    required: false,
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

  constructor(data?: Partial<MultivitaminProduct>) {
    super(data);
  }
}

export interface MultivitaminProductRelations {}

export type MultivitaminProductWithRelations = MultivitaminProduct & MultivitaminProductRelations;
