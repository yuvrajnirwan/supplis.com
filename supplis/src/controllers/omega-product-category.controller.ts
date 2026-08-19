import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  OmegaProduct,
  Category,
} from '../models';
import {OmegaProductRepository} from '../repositories';

export class OmegaProductCategoryController {
  constructor(
    @repository(OmegaProductRepository)
    public omegaProductRepository: OmegaProductRepository,
  ) { }

  @get('/omega-products/{id}/category', {
    responses: {
      '200': {
        description: 'Category belonging to OmegaProduct',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Category),
          },
        },
      },
    },
  })
  async getCategory(
    @param.path.string('id') id: typeof OmegaProduct.prototype.id,
  ): Promise<Category> {
    return this.omegaProductRepository.category(id);
  }
}
