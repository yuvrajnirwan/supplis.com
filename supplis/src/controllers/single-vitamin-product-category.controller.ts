import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  SingleVitaminProduct,
  Category,
} from '../models';
import {SingleVitaminProductRepository} from '../repositories';

export class SingleVitaminProductCategoryController {
  constructor(
    @repository(SingleVitaminProductRepository)
    public singleVitaminProductRepository: SingleVitaminProductRepository,
  ) { }

  @get('/single-vitamin-products/{id}/category', {
    responses: {
      '200': {
        description: 'Category belonging to SingleVitaminProduct',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Category),
          },
        },
      },
    },
  })
  async getCategory(
    @param.path.string('id') id: typeof SingleVitaminProduct.prototype.id,
  ): Promise<Category> {
    return this.singleVitaminProductRepository.category(id);
  }
}
