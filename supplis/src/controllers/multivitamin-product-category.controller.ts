import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  MultivitaminProduct,
  Category,
} from '../models';
import {MultivitaminProductRepository} from '../repositories';

export class MultivitaminProductCategoryController {
  constructor(
    @repository(MultivitaminProductRepository)
    public multivitaminProductRepository: MultivitaminProductRepository,
  ) { }

  @get('/multivitamin-products/{id}/category', {
    responses: {
      '200': {
        description: 'Category belonging to MultivitaminProduct',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Category),
          },
        },
      },
    },
  })
  async getCategory(
    @param.path.string('id') id: typeof MultivitaminProduct.prototype.id,
  ): Promise<Category> {
    return this.multivitaminProductRepository.category(id);
  }
}
