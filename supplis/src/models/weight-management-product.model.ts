import { Entity, model, property } from '@loopback/repository';

@model({ settings: { strict: false } })
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

  constructor(data?: Partial<WeightManagementProduct>) {
    super(data);
  }
}

export interface WeightManagementProductRelations {}

export type WeightManagementProductWithRelations =
  WeightManagementProduct & WeightManagementProductRelations;
