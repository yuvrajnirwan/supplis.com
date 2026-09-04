import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Category} from './category.model';

@model({settings: {strict: true}})
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
    servingSizeTablets?: number;
    servingsPerContainer?: number;
    vitaminAMcg?: number;
    vitaminCMg?: number;
    vitaminD3IU?: number;
    vitaminB12Mcg?: number;
    zincMg?: number;
    ironMg?: number;
    digestiveEnzymeBlendMg?: number;
    aminoAcidBlendMg?: number;
    omega3Mg?: number;
    ashwagandhaExtractMg?: number;
    wholefoodBlendMg?: number;
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
