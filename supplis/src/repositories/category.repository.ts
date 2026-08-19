import { inject, Getter} from '@loopback/core';
import { DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import { DbDatasource } from '../datasources';
import { Category, CategoryRelations, AminoProduct, CreatineProduct, MultivitaminProduct, OmegaProduct, PreWorkoutProduct, ProteinProduct, SaltProduct, SingleVitaminProduct, WeightManagementProduct} from '../models';
import {AminoProductRepository} from './amino-product.repository';
import {CreatineProductRepository} from './creatine-product.repository';
import {MultivitaminProductRepository} from './multivitamin-product.repository';
import {OmegaProductRepository} from './omega-product.repository';
import {PreWorkoutProductRepository} from './pre-workout-product.repository';
import {ProteinProductRepository} from './protein-product.repository';
import {SaltProductRepository} from './salt-product.repository';
import {SingleVitaminProductRepository} from './single-vitamin-product.repository';
import {WeightManagementProductRepository} from './weight-management-product.repository';

export class CategoryRepository extends DefaultCrudRepository<
  Category,
  typeof Category.prototype.id,
  CategoryRelations
> {

  public readonly aminoProducts: HasManyRepositoryFactory<AminoProduct, typeof Category.prototype.id>;
  public readonly creatineProducts: HasManyRepositoryFactory<CreatineProduct, typeof Category.prototype.id>;
  public readonly multivitaminProducts: HasManyRepositoryFactory<MultivitaminProduct, typeof Category.prototype.id>;
  public readonly omegaProducts: HasManyRepositoryFactory<OmegaProduct, typeof Category.prototype.id>;
  public readonly preWorkoutProducts: HasManyRepositoryFactory<PreWorkoutProduct, typeof Category.prototype.id>;
  public readonly proteinProducts: HasManyRepositoryFactory<ProteinProduct, typeof Category.prototype.id>;
  public readonly saltProducts: HasManyRepositoryFactory<SaltProduct, typeof Category.prototype.id>;
  public readonly singleVitaminProducts: HasManyRepositoryFactory<SingleVitaminProduct, typeof Category.prototype.id>;
  public readonly weightManagementProducts: HasManyRepositoryFactory<WeightManagementProduct, typeof Category.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDatasource,
    @repository.getter('AminoProductRepository') protected aminoProductRepositoryGetter: Getter<AminoProductRepository>,
    @repository.getter('CreatineProductRepository') protected creatineProductRepositoryGetter: Getter<CreatineProductRepository>,
    @repository.getter('MultivitaminProductRepository') protected multivitaminProductRepositoryGetter: Getter<MultivitaminProductRepository>,
    @repository.getter('OmegaProductRepository') protected omegaProductRepositoryGetter: Getter<OmegaProductRepository>,
    @repository.getter('PreWorkoutProductRepository') protected preWorkoutProductRepositoryGetter: Getter<PreWorkoutProductRepository>,
    @repository.getter('ProteinProductRepository') protected proteinProductRepositoryGetter: Getter<ProteinProductRepository>,
    @repository.getter('SaltProductRepository') protected saltProductRepositoryGetter: Getter<SaltProductRepository>,
    @repository.getter('SingleVitaminProductRepository') protected singleVitaminProductRepositoryGetter: Getter<SingleVitaminProductRepository>,
    @repository.getter('WeightManagementProductRepository') protected weightManagementProductRepositoryGetter: Getter<WeightManagementProductRepository>,
  ) {
    super(Category, dataSource);

    this.weightManagementProducts = this.createHasManyRepositoryFactoryFor('weightManagementProducts', weightManagementProductRepositoryGetter,);
    this.registerInclusionResolver('weightManagementProducts', this.weightManagementProducts.inclusionResolver);

    this.singleVitaminProducts = this.createHasManyRepositoryFactoryFor('singleVitaminProducts', singleVitaminProductRepositoryGetter,);
    this.registerInclusionResolver('singleVitaminProducts', this.singleVitaminProducts.inclusionResolver);

    this.saltProducts = this.createHasManyRepositoryFactoryFor('saltProducts', saltProductRepositoryGetter,);
    this.registerInclusionResolver('saltProducts', this.saltProducts.inclusionResolver);

    this.proteinProducts = this.createHasManyRepositoryFactoryFor('proteinProducts', proteinProductRepositoryGetter,);
    this.registerInclusionResolver('proteinProducts', this.proteinProducts.inclusionResolver);

    this.preWorkoutProducts = this.createHasManyRepositoryFactoryFor('preWorkoutProducts', preWorkoutProductRepositoryGetter,);
    this.registerInclusionResolver('preWorkoutProducts', this.preWorkoutProducts.inclusionResolver);

    this.omegaProducts = this.createHasManyRepositoryFactoryFor('omegaProducts', omegaProductRepositoryGetter,);
    this.registerInclusionResolver('omegaProducts', this.omegaProducts.inclusionResolver);

    this.multivitaminProducts = this.createHasManyRepositoryFactoryFor('multivitaminProducts', multivitaminProductRepositoryGetter,);
    this.registerInclusionResolver('multivitaminProducts', this.multivitaminProducts.inclusionResolver);

    this.creatineProducts = this.createHasManyRepositoryFactoryFor('creatineProducts', creatineProductRepositoryGetter,);
    this.registerInclusionResolver('creatineProducts', this.creatineProducts.inclusionResolver);

    this.aminoProducts = this.createHasManyRepositoryFactoryFor('aminoProducts', aminoProductRepositoryGetter,);
    this.registerInclusionResolver('aminoProducts', this.aminoProducts.inclusionResolver);
  }
}
