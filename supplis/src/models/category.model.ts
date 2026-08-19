import {Entity, model, property, hasMany} from '@loopback/repository';
import {AminoProduct} from './amino-product.model';
import {CreatineProduct} from './creatine-product.model';
import {MultivitaminProduct} from './multivitamin-product.model';
import {OmegaProduct} from './omega-product.model';
import {PreWorkoutProduct} from './pre-workout-product.model';
import {ProteinProduct} from './protein-product.model';
import {SaltProduct} from './salt-product.model';
import {SingleVitaminProduct} from './single-vitamin-product.model';
import {WeightManagementProduct} from './weight-management-product.model';

@model({settings: {strict: true}})
export class Category extends Entity {
  @property({
    type: 'string',
    id: true,
    defaultFn: 'uuid',
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @hasMany(() => AminoProduct)
  aminoProducts: AminoProduct[];

  @hasMany(() => CreatineProduct)
  creatineProducts: CreatineProduct[];

  @hasMany(() => MultivitaminProduct)
  multivitaminProducts: MultivitaminProduct[];

  @hasMany(() => OmegaProduct)
  omegaProducts: OmegaProduct[];

  @hasMany(() => PreWorkoutProduct)
  preWorkoutProducts: PreWorkoutProduct[];

  @hasMany(() => ProteinProduct)
  proteinProducts: ProteinProduct[];

  @hasMany(() => SaltProduct)
  saltProducts: SaltProduct[];

  @hasMany(() => SingleVitaminProduct)
  singleVitaminProducts: SingleVitaminProduct[];

  @hasMany(() => WeightManagementProduct)
  weightManagementProducts: WeightManagementProduct[];

  constructor(data?: Partial<Category>) {
    super(data);
  }
}

export interface CategoryRelations {}

export type CategoryWithRelations = Category & CategoryRelations;
