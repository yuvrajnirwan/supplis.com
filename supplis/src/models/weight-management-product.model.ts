import { Entity, model, property, belongsTo} from '@loopback/repository';
import {Category} from './category.model';

@model({settings: {strict: true}})
export class WeightManagementProduct extends Entity {
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
    servingSizeMl?: number;
    servingSizeCapsules?: number;
    servingsPerContainer?: number;
    lCarnitineMg?: number;
    lCarnitineLTartrateMg?: number;
    pantothenicAcidMg?: number;
    safflowerSeedOilMg?: number;
    activeClaMg?: number;
    caffeineAnhydrousMg?: number;
    theobromineMg?: number;
    yohimbineHclMg?: number;
    rauwolscineMg?: number;
    vitaminB6mg?: number;
    calories?: number;
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

  @belongsTo(() => Category)
  categoryId: string;

  constructor(data?: Partial<WeightManagementProduct>) {
    super(data);
  }
}

export interface WeightManagementProductRelations {}

export type WeightManagementProductWithRelations = WeightManagementProduct & WeightManagementProductRelations;
